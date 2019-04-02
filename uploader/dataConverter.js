var csv2json = require('csv2json');
var fs = require('fs');
const stream = require('stream');

const fuelData = require('./fuels');
const municipalityData = require('./municipalities');
const vehicleClassData = require('./vehicleClass');

const indexName = 'vehicles';
const allowedValues = ['M1', 'M1G', 'N1'];
const saveableFields = [
	'ajoneuvoluokka', 'ensirekisterointipvm', 'kayttovoima', 'iskutilavuus',
	'suurinNettoteho', 'merkkiSelvakielinen', 'mallimerkinta', 'kaupallinenNimi',
	'kunta', 'matkamittarilukema'
];

const fieldsToRename = new Map([
	['ajoneuvoluokka', 'vehicleclass'],
	['ensirekisterointipvm', 'registrationdate'],
	['kayttovoima', 'fuel'],
	['iskutilavuus', 'cylindercapacity'],
	['suurinNettoteho', 'power'],
	['merkkiSelvakielinen', 'carbrand'],
	['mallimerkinta', 'model'],
	['kaupallinenNimi', 'simplemodel'],
	['kunta', 'municipality'],
	['matkamittarilukema', 'mileage']
]);

const lang = 'en';
const numberFields = ['iskutilavuus', 'suurinNettoteho', 'matkamittarilukema'];
const convertFields = new Map([
	['kayttovoima', fuelData],
	['kunta', municipalityData],
	['ajoneuvoluokka', vehicleClassData]
]);

const pick = (obj, props) => props.reduce((a, e) => (a[e] = obj[e], a), {});

const convertCode2Word = (code, lang, values) => {
	try {
		const index = values.findIndex(item => item.lang === lang && item.code.toString() === code.toString());
		return (values[index]).name;
	} catch (e) {
		console.log(e);
		console.log('values', values);
		console.log('lang', lang);
		console.log('code', code);
		return null;
	}
};

const convertFields2Values = obj => {
	convertFields.forEach((data, key) => {
		obj[key] = convertCode2Word(obj[key], lang, data);
	});
};

const renameFields = obj => {
	const newObj = {};
	fieldsToRename.forEach((newKey, oldKey) => {
		newObj[newKey] = obj[oldKey];
  });
  return newObj;
};

const numberifyValues = obj => {
	numberFields.forEach(key => {
		obj[key] = obj[key] !== null ? Number(obj[key]) : null;
	});
};

//Fix the irregularly marked Volkswagen name
const fixVW = obj => {
	if (obj.merkkiSelvakielinen === 'Volkswagen, VW') {
		obj.merkkiSelvakielinen = 'Volkswagen';
	}
}

const start = Date.now();
let count = 0;

const createFilterStream = () => {
	return new stream.Transform({
		writableObjectMode: true,
		transform: (chunk, encoding, callback) => {
			let err = null;
			let data = null
			try {
				if (chunk.length < 4) {
					data = new Buffer.alloc(0);
				} else {
					const obj = JSON.parse(chunk.toString());
					if (allowedValues.includes(obj.ajoneuvoluokka)) {
						count++;

						const smallerObj = pick(obj, saveableFields);

						Object.keys(smallerObj).forEach((key) => (smallerObj[key] == "") && (smallerObj[key] = null));
						numberifyValues(smallerObj);
						convertFields2Values(smallerObj);
            fixVW(smallerObj);
            const newOb = renameFields(smallerObj);
						const strObj = JSON.stringify(newOb);
						const idStr = '{"index":{"_index" : "' + indexName + '", "_type" : "_doc", "_id":' + count + '}}\n';
						data = new Buffer.from(idStr + strObj + '\n');
					} else {
						data = new Buffer.alloc(0);
					}
				}
			} catch (e) {
				err = e;
			} finally {
				callback(err, data);
			}
		}
	});
};

const filterStream = createFilterStream()
	.on('error', e => {
		console.error(e);
	});

const jsonStream = fs.createReadStream('vehicledata.csv')
//const jsonStream = fs.createReadStream('testdata.csv')
	.pipe(csv2json({
		separator: ';',
		parseDynamic: true
	}));

jsonStream
	.pipe(filterStream)
	.pipe(fs.createWriteStream('vehicledata.json'))
	//.pipe(fs.createWriteStream('test.json'))
	.on('finish', () => {
		const end = Date.now();
		console.log('Time spent in seconds ', (end - start) / 1000);
		console.log('Items added to JSON:', count);
	});