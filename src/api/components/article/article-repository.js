const { title } = require('process');
const { articles } = require('../../../core/database/models')
const { Op } = require('sequelize');
/**
 * Handle Get Articles
 * @returns
 */
async function getAll() {
    return await articles.findAll();
}


/**
 * Handle Get By Name Articles
 * @param {string} name
 * @returns {Promise}
 */
async function getBySlug(slug) {
    return await articles.findOne({
        where: {
            slug
        }
    });
}

/**
 * Handle Store Article
 * @param {object} body Body
 * @returns
 */
async function store(body) {
    return await articles.create(body)
}

/**
 * Handle Find By Id Article
 * @param {string} id article ID
 * @returns
 */
async function getOne(option) {
    return await articles.findOne({
        where:
            option

    }
    )
}
/**
 * Handle Update Article
 * @param {string} id article ID
 * @param {object} body Body
 * @returns
 */
async function update(id, body) {
    return await articles.update(body, { where: { id } })
}


/**
 * Handle Delete Article
 * @returns
 */
async function deleteArticle(id) {
    return await articles.destroy({
        where: {
            id
        }
    })
}


module.exports = {
    getOne,
    store,
    update,
    getAll,
    deleteArticle
}