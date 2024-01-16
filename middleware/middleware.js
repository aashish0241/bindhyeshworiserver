const errorHandler = (err, req, res, next) => {
                  // Normalize Content-Type if needed
                  if (req.headers['content-type'] === 'application/json;') {
                    req.headers['content-type'] = 'application/json';
                  }
                
                  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
                
                  // Set the status code
                  res.status(statusCode);
                
                  // Add custom error header
                  res.setHeader('X-Error-Message', err.message);
                
                  // Log the error for debugging
                  console.error(err.stack);
                
                  // Send a JSON response with error details
                  res.json({
                    success: false,
                    error: {
                      message: err.message,
                      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
                    },
                  });
                };
                
                module.exports = errorHandler;
                