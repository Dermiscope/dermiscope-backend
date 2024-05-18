const { Router } = require('express')
const ArticleController = require('./article-controller')
const celebrateWrappers = require('../../../core/celebrate-wrappers');
const { createArticle, updateArticle } = require('../article/article-validator')
const route = Router()

module.exports = (app) => {
    app.use('/Articles', route)

    route.get('/', ArticleController.getAll);
    route.get('/:id', ArticleController.getOne)
    route.post('/', celebrateWrappers(createArticle), ArticleController.store);
    route.put('/:id', celebrateWrappers(updateArticle), ArticleController.update);
    route.delete('/:id', ArticleController.deleteArticle);
}