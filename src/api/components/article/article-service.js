const { Sequelize } = require('sequelize')
const { sequelizeValidationError } = require('../../../core/errors');
const GenerateID = require('../../../utils/uuid');
const ArticleRepository = require('../article/article-repository');
const generateSlug = require('../../../utils/slug')


/**
 * Handle Get Article
 * @returns []
 */
async function getAll() {
    try {
        return await ArticleRepository.getAll();
    } catch (error) {
        throw error;
    }
}

/**
 * Handle Get Article By Name
 * @param {string} Name string
 * @returns {}
 */
async function getBySlug(slug) {
    try {
        return await ArticleRepository.getBySlug(slug);
    } catch (error) {
        throw error;
    }
}

/**
 * Handle Get Article By Id
 * @param {string} id string
 * @returns {}
 */
async function getOne(option) {
    try {
        return await ArticleRepository.getOne(option);
    } catch (error) {
        throw error;
    }
}


/**
 * Handle Store Article
 * @param {object} body Body
 * @returns {}
 */
async function store(body) {
    try {
        const id = GenerateID();
        const slug = generateSlug(body.title)
        const data = { id, ...body, slug }
        return await ArticleRepository.store(data);
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            throw sequelizeValidationError(error);
        }
        throw error;
    }
}

/**
 * Handle Update Article
 * @param {string} id Article ID
 * @param {object} body Body
 * @returns {}
 */
async function update(id, body) {
    try {
        const slug = generateSlug(body.title)
        const data = { ...body, slug }
        return await ArticleRepository.update(id, data);
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            throw sequelizeValidationError(error);
        }
        throw error;
    }
}

/**
 * Handle Delete Article
 * @param {string} id Article ID
 * @returns {}
 */
async function deleteArticle(id) {
    try {
        return await ArticleRepository.deleteArticle(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getOne,
    getAll,
    store,
    update,
    deleteArticle
}