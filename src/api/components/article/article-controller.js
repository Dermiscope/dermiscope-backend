const { errorResponder, errorTypes } = require('../../../core/errors');
const ArticleService = require('./article-service')

/**
 * Handle Get Article
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function getAll(request, response, next) {
    try {
        const { slug } = request.query
        if (!slug) {
            const result = await ArticleService.getAll()
            return response.status(200).json({
                status: 'OK',
                data: result
            })
        } else {
            const result = await ArticleService.getOne({ slug })
            return response.status(200).json({
                status: 'OK',
                data: result
            })
        }
    } catch (error) {
        next(errorResponder(error.errorType || errorTypes.SERVER, error.message));
    }
}

/**
 * Handle Get Article
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function getOne(request, response, next) {
    try {

        const result = await ArticleService.getOne({ id: request.params.id })

        return response.status(200).json({
            status: 'OK',
            data: result
        })
    } catch (error) {
        next(errorResponder(error.errorType || errorTypes.SERVER, error.message));
    }
}



/**
 * Handle Store Article
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function store(request, response, next) {
    try {
        const result = await ArticleService.store(request.body)
        return response.status(200).json({
            status: "Created",
            data: result
        })
    } catch (error) {
        next(
            errorResponder(
                error.errorType || errorTypes.SERVER,
                error.message,
                error.validationErrors
            )
        );
    }
}

/**
 * Handle Update Article
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function update(request, response, next) {
    try {
        const result = await ArticleService.update(request.params.id, request.body);
        const newData = result !== 0 ? request.body : null;
        return response.status(200).json({
            status: 'OK',
            data: result,
        });
    } catch (error) {
        next(
            errorResponder(
                error.errorType || errorTypes.SERVER,
                error.message,
                error.validationErrors
            )
        );
    }
}

/**
 * Handle Delete Article
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function deleteArticle(request, response, next) {
    try {
        const result = await ArticleService.deleteArticle(request.params.id)
        const deleted = result !== 0 ? request.params.id : null;
        return response.status(200).json({
            status: 'OK',
            data: deleted,
        });
    } catch (error) {
        next(
            errorResponder(
                error.errorType || errorTypes.SERVER,
                error.message,
                error.validationErrors
            )
        );
    }
}


module.exports = {
    getOne,
    getAll,
    store,
    deleteArticle,
    update
}