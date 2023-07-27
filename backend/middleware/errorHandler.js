
const { customAPIError } = require('../Errors/customerror')

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof customAPIError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }
    return res.status(500).json({
        message: `Something went Wrong`
        // message: err.message
    })
}
module.exports = errorHandlerMiddleware