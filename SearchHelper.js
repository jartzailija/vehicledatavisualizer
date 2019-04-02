const fetch = require('node-fetch');
const DateDiff = require('date-diff');
const esUrl = 'http://localhost:9200/vehicles/';
const searchUrl = esUrl + '_search';

const calculateAge = origDate => (new DateDiff((new Date(Date.now())), (new Date(origDate)))).years();

const getOptions = (field, suggestion) => {
  const requestBody = {
    size: 0,
    _source: false,
    query: {
      query_string: {
        fields: [field],
        query: suggestion + '*'
      }
    },
    aggs : {
      byField : {
        terms : {
          field : field,
          order : { "_count" : "desc" },
          size: 4000000
        }
      }
    }
  };

  return new Promise((resolve, reject) => {
    fetch(searchUrl, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })
      .then(res => res.json())
      .then(json => {
        resolve(json.aggregations.byField.buckets);
      })
      .catch(e => reject(e));
    });
};


const executeQuery = (field, suggestion) => {

  if(field === undefined && suggestion === undefined) {
    var query = {
      match_all: {}
    };
  }
  else {
    var query = {
      query_string: {
        fields: [field],
        query: suggestion
      }
    };
  }

  const requestBody = {
    size: 0,
    _source: false,
    query: query,
    aggs: {
      byCarBrand: {
        terms: {
          field : "carbrand",
          order : { "_count" : "desc" },
          size: 4000000
        }
      }
    }
  };

  return new Promise((resolve, reject) => {
    fetch(searchUrl, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })
      .then(res => res.json())
      .then(json => {
        const obj = {
          carBrands: json.aggregations.byCarBrand.buckets.map(item => ({name: item.key, count: item.doc_count})),
          count: json.hits.total
        };
        resolve(obj);
      })
      .catch(e => reject(e));
    });
};

const averageQuery = {
  "size": 0,
  "_source": false,
  "aggs" : {
    "avg_size" : {
      "avg" : {
        "field" : "cylindercapacity"
      }
    },
    "avg_mileage" : {
      "avg" : {
        "field" : "mileage"
      }
    },
    "avg_hp" : {
      "avg" : {
        "field" : "power"
      }
    },
    "avg_age" : {
      "avg" : {
        "format" : "yyyy-MM-dd",
        "field" : "registrationdate"
      }
    }
  }
};

const getSummary = (queryObj) => {
  const must = Object.keys(queryObj).map(key => {
    return {
      terms: {
        [key]: [ queryObj[key] ]
      }
    };
  });
  const requestBody = {
    query: {
      bool: {
        must: must,
      }
    },
    ...averageQuery
  };

  return new Promise((resolve, reject) => {
    fetch(searchUrl, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })
      .then(res => res.json())
      .then(json => {
        resolve({
          count: json.hits.total,
          motorSize: Math.round(json.aggregations.avg_size.value),
          mileage: Math.round(json.aggregations.avg_mileage.value),
          power: Math.round(json.aggregations.avg_hp.value),
          age: calculateAge(json.aggregations.avg_age.value_as_string) || 0
        });
      })
      .catch(e => reject(e));
    });
};

module.exports = {
  getOptions,
  executeQuery,
  getSummary
};
