import AppError from "../util/error.js";

function error (err, req, res, next){
    // Log the error for debugging purposes
    console.error('An error occurred:', err);

    // Initialize status code and status string
    // Use the error's existing statusCode/status, or default to 500/error
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let message = err.message; // Start with the original message

    // Handle specific types of errors for more user-friendly messages
    if (err.name === 'CastError') {
        // Mongoose CastError (e.g., invalid ID format when finding by ID)
        message = `Invalid ${err.path}: ${err.value}.`;
        err.statusCode = 400; // Bad Request
        err.status = 'fail'; // Using 'fail' for client-side errors
    }

    if (err.code === 11000) {
        // MongoDB duplicate key error (E11000)
        // This typically occurs when a unique field (like email) is duplicated
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; // Extract the duplicated value
        message = `Duplicate field value: ${value}. Please use another value!`;
        err.statusCode = 400;
        err.status = 'fail';
    }

    if (err.name === 'ValidationError') {
        // Mongoose validation error (e.g., missing required fields, invalid format)
        const errors = Object.values(err.errors).map(el => el.message);
        message = `Invalid input data: ${errors.join('. ')}`;
        err.statusCode = 400;
        err.status = 'fail';
    }

    // If it's not an instance of AppError, wrap it to provide a consistent structure
    // This ensures that all errors sent to the client follow the AppError format
    // This part is crucial if you're throwing generic Errors or other exceptions
    // and want them to be formatted consistently.
    if (!(err instanceof AppError)) {
        // If it's a generic error, create a new AppError with the determined status and message
        err = new AppError(message, err.statusCode);
        err.status = err.status; // Preserve the status determined above
    }


    // Send the error response
    // For operational errors (client-side errors like 4xx), send detailed message
    // For programming errors (server-side errors like 5xx), send a generic message in production
    res.status(err.statusCode).json({
        status: err.status,
        message: message, // Use the potentially modified message
        // In development, you might want to send the stack trace for debugging
        // In production, avoid sending stack traces to clients for security
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
}

export default error