module.exports = (app) => {
    app.use("/auth", require("./auth.route"));
    app.use("/request", require("./request.route"));
    app.use("/user", require("./user.route"));
    app.use("/chat", require("./chat.route"));
    app.use("/message", require("./message.route"));
    app.use("/profile", require("./profile.route"));
    app.use("/group", require("./group.route"));
    app.use("/groupMessage", require("./groupMessage.route"));
};