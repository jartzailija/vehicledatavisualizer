const SearchHelper = require('./SearchHelper');

const apiRouter = require('express').Router();

const queryRouter = require('express').Router();

queryRouter.get('/all', (req, res, next) => {
  SearchHelper.executeQuery()
    .then(result => res.send(result))
    .catch(e => res.send(e));
});

queryRouter.get('/:field/:value', (req, res, next) => {
  SearchHelper.executeQuery(req.params.field, req.params.value)
    .then(result => res.send(result))
    .catch(e => res.send(e));
});

queryRouter.get('/summary/municipality/:municipality/carbrand/:carBrand', (req, res, next) => {
  const query = {
    municipality: req.params.municipality,
    carbrand: req.params.carBrand
  };
  SearchHelper.getSummary(query)
    .then(result => res.send(result))
    .catch(e => res.send(e));
});

queryRouter.get('/summary/carbrand/:carBrand', (req, res, next) => {
  const query = {
    carbrand: req.params.carBrand
  };
  SearchHelper.getSummary(query)
    .then(result => res.send(result))
    .catch(e => res.send(e));
});

const valueRouter = require('express').Router();
valueRouter.get('/:field/:suggestion', (req, res, next) => {
  SearchHelper.getOptions(req.params.field, req.params.suggestion)
    .then(result => res.send(result))
    .catch(e => res.send(e));
});

apiRouter.use('/values', valueRouter);
apiRouter.use('/query', queryRouter);

module.exports = apiRouter;