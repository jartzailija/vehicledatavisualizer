const executeQuery = (field, value) => {
  return new Promise((resolve, reject) => {
    resolve({
      success: true,
      field,
      value
    });
  });
};

const getSummary = queryObj => {
  return new Promise((resolve, reject) => {
    resolve({...queryObj});
  });
};

const getOptions = (field, suggestion) => {
  return new Promise((resolve, reject) => {
    resolve({field, suggestion});
  });
};

module.exports = {
  getOptions,
  executeQuery,
  getSummary
};