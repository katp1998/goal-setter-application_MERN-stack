const errorHandler = (err, rq, rs, nextTick) => {
  const statusCode = rs.statusCode ? rs.statusCode : 500;
  rs.status(statusCode);

  rs.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
