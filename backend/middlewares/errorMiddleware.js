// errorHandler.js

// Middleware to handle "not found" errors
export const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);  // Set the status code to 404 for "Not Found"
    next(error);  // Pass the error to the next middleware (error handler)
  };
  
  // Middleware to handle all other errors
  export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;  // Default to 500 if not set
    res.status(statusCode);
    res.json({
      error: {
        message: err.message,  // Send the error message
        stack: process.env.NODE_ENV === "production" ? err.stack : null,  // Include stack trace in development
      },
    });
  };