# Carsearch
This is a small react + redux + ElasticSearch project, which visualises data about finnish vehicles. The data is got from Finnish Transport Agency by https://www.avoindata.fi.

## Prerequisite
* You should have an Elasticsearch v6.6 instance running locally at the port 9200.
* Nodejs minimum version v10.15.1
* ~1 GiB free disc space
* Kibana (optional)

## Initialization
Run `npm install` in the root folder, and in the _carsearch-client_ and _uploader_ -folders.

Update the server URL in _carsearch-client/src/configs.js_ -file.

Start up ElasticSearch and run the mapping there to the _vehicles_ -index by using _Kibana_ or _curl_. ( https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html#_example_mapping ) The mapping data is located to _uploader/mapping.json_.

You should get the newest "Open data for vehicles" ( https://www.avoindata.fi/data/fi/dataset/ajoneuvojen-avoin-data ) saved as _vehicledata.csv_ into the _uploader_ folder. Then you can run `node dataConverter.js` and `node --max-old-space-size=4096 uploader.js` - commands (please notice the ugly memory hack; the uploader needs recoding), which transforms the csv data to JSON format and sends it to the elasticsearch creating an index named as _vehicles_. Running these might take couple of minutes.

After it run `npm run build` in the _carsearch-client_ -folder.

Eventually run `node index.js` in the root folder to start up server on the port 8080.

## TODO
* Initialization script
* Create a synchronized uploader which doesn't fill the buffer

## License

Unlicense

## Disclaimer

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>

## Data Sources

Vehicle data:
https://www.avoindata.fi/data/fi/dataset/ajoneuvojen-avoin-data

Field explanations:
http://www.trafi.fi/filebank/a/1425029094/1ecab74bc4e9fef24caee5a38577fa90/16968-Koodisto_2015.xlsx

Former and existing Finnish municipalities:
https://www.avoindata.fi/data/fi/dataset/kunnat