const errorHandler = (err, req, res, next) => {
    res.status(err.code || 500).json({
        message: 'ERROR! ' + err.message || 'Internal Server Error'
    })
}

module.exports = errorHandler