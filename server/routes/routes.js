module.exports = (app) => {
    app.use("/auth", require("./auth.route"));
    app.use("/request", require("./request.route"));
};