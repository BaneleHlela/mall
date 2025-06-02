//not Found

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);

    next(error);
};


export const errorHandler = (err, req, res, next) => {
    // Determine the status code: if the current status is 200, set it to 500, else keep the current status
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    
    res.status(statusCode).json({
        message: err?.message, // Default message if none provided
        stack: err?.stack // Include stack trace in development only
    });

    next();
};







