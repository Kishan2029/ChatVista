const logger = (req, res, next) => {
    const url = decodeURI(req.url);

    res.on("finish", function () {
        console.log(`[log]: ${req.method} --- ${url} --- ${res.statusCode} ${res.statusMessage}`);
    });
    next();
};

module.exports = { logger };