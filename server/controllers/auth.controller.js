const { z } = require("zod")
const AuthService = require("../services/auth.service")
exports.login = async function (req, res, next) {
    try {


        const user = z.object({
            email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email(),
            password: z.string({ required_error: "Password is required", })
        });
        const { email, password } = user.parse(req.body);
        console.log("data", email, password);
        // const response = await AuthService.createUser(body);
        res.send("login")
        // res.send(response);
    } catch (error) {
        // console.log("error", error)
        next(error)
    }

}