const asyncWrapper = (callbackfn) => {
    return async (req, res, next) => {
        try {
            await callbackfn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper