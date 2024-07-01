const errorHandler = (err, req, res, next) => {
    err.message = err.message || 'Internal Server Error';
    console.log(err.stack.red);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
}

export default errorHandler;    