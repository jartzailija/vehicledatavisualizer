const executeQueryWithNoParams = {
  "took": 28,
  "timed_out": false,
  "_shards": {
      "total": 5,
      "successful": 5,
      "skipped": 0,
      "failed": 0
  },
  "hits": {
      "total": 2986843,
      "max_score": 0,
      "hits": []
  },
  "aggregations": {
      "byCarBrand": {
          "doc_count_error_upper_bound": 0,
          "sum_other_doc_count": 0,
          "buckets": [
              {
                  "key": "Toyota",
                  "doc_count": 410713
              },
              {
                  "key": "Volkswagen",
                  "doc_count": 365586
              },
              {
                  "key": "Ford",
                  "doc_count": 237661
              },
              {
                  "key": "Volvo",
                  "doc_count": 223506
              },
              {
                  "key": "Mercedes-Benz",
                  "doc_count": 197251
              },
              {
                  "key": "Nissan",
                  "doc_count": 172270
              },
              {
                  "key": "Opel",
                  "doc_count": 156185
              },
              {
                  "key": "Skoda",
                  "doc_count": 132288
              },
              {
                  "key": "Audi",
                  "doc_count": 124506
              }
            ]
        }
    }
};

const executeQueryWithNoParamsResult = { carBrands:
  [ { name: 'Toyota', count: 410713 },
    { name: 'Volkswagen', count: 365586 },
    { name: 'Ford', count: 237661 },
    { name: 'Volvo', count: 223506 },
    { name: 'Mercedes-Benz', count: 197251 },
    { name: 'Nissan', count: 172270 },
    { name: 'Opel', count: 156185 },
    { name: 'Skoda', count: 132288 },
    { name: 'Audi', count: 124506 } ],
 count: 2986843 };


const executeQueryWithParams = {
  "took": 10,
  "timed_out": false,
  "_shards": {
      "total": 5,
      "successful": 5,
      "skipped": 0,
      "failed": 0
  },
  "hits": {
      "total": 40009,
      "max_score": 0,
      "hits": []
  },
  "aggregations": {
      "byCarBrand": {
          "doc_count_error_upper_bound": 0,
          "sum_other_doc_count": 0,
          "buckets": [
              {
                  "key": "Volkswagen",
                  "doc_count": 5700
              },
              {
                  "key": "Toyota",
                  "doc_count": 5011
              },
              {
                  "key": "Ford",
                  "doc_count": 3135
              }
          ]
      }
  }
};

const executeQueryWithParamsResult = { carBrands:
  [ { name: 'Volkswagen', count: 5700 },
    { name: 'Toyota', count: 5011 },
    { name: 'Ford', count: 3135 } ],
 count: 40009 };

const getSummaryWithCarBrand = {
    "took": 10,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": 410713,
        "max_score": 0,
        "hits": []
    },
    "aggregations": {
        "avg_hp": {
            "value": 82.20220900594732
        },
        "avg_age": {
            "value": 1126566540278.313,
            "value_as_string": "2005-09-12"
        },
        "avg_mileage": {
            "value": 204758.90016045692
        },
        "avg_size": {
            "value": 1730.3505796526224
        }
    }
};

const getSummaryWithCarBrandResult = { count: 410713,
    motorSize: 1730,
    mileage: 204759,
    power: 82,
    age: 14
};

const getSummaryWithCarBrandAndMunicipality = {
    "took": 40,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": 5025,
        "max_score": 0,
        "hits": []
    },
    "aggregations": {
        "avg_hp": {
            "value": 82.95576882954309
        },
        "avg_age": {
            "value": 1099354271368.7986,
            "value_as_string": "2004-11-02"
        },
        "avg_mileage": {
            "value": 198469.36612903225
        },
        "avg_size": {
            "value": 1695.8889331210191
        }
    }
};

const getSummaryWithCarBrandAndMunicipalityResult = { count: 5025,
    motorSize: 1696,
    mileage: 198469,
    power: 83,
    age: 14.9
};

module.exports = {
  executeQueryWithNoParams,
  executeQueryWithNoParamsResult,
  executeQueryWithParams,
  executeQueryWithParamsResult,
  getSummaryWithCarBrand,
  getSummaryWithCarBrandResult,
  getSummaryWithCarBrandAndMunicipality,
  getSummaryWithCarBrandAndMunicipalityResult
}