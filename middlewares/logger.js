const logger = (req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });

  res.on("error", (error) => {
    console.log("Response error: ", err);
  });

  next();
};

module.exports = logger;
