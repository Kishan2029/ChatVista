const AuthService = require("../services/auth.service")
exports.login = async function (req, res, next) {
    const body = req.body;

    // const response = await AuthService.createUser(body);

    res.send(response);

}