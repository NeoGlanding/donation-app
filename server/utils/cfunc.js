const cfunc = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next({code: err.code, message: err.message}))
    }
}

module.exports = cfunc;