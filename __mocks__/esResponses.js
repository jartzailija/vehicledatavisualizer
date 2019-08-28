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

module.exports = {
  executeQueryWithNoParams,
  executeQueryWithNoParamsResult,
  executeQueryWithParams,
  executeQueryWithParamsResult
}