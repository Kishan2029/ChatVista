const { z } = require("zod")
const AuthService = require("../services/auth.service")
exports.login = async function (req, res, next) {
    try {
        const user = z.object({
            email: z.string({ required_error: "Email is required" }).email({ message: "Not a email formate" }),
            password: z.string({ required_error: "Password is required" })
        });
        const { email, password } = user.parse(req.body);

        const { response, statusCode } = await AuthService.loginUser(email, password);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}

exports.register = async function (req, res, next) {
    try {
        const user = z.object({
            firstName: z.string({ required_error: "First name is required" }),
            lastName: z.string({ required_error: "Last name is required" }),
            email: z.string({ required_error: "Email is required", }).email({ message: "Not a email formate" }),
            password: z.string({ required_error: "Password is required", })
        });

        const { firstName, lastName, email, password } = user.parse(req.body);

        const { statusCode, response } = await AuthService.registerUser(firstName, lastName, email, password);
        res.status(statusCode).send(response);
    } catch (error) {
        next(error)
    }
}

exports.verify = async function (req, res, next) {
    console.log("verify")
    try {
        const user = z.object({
            firstName: z.string({ required_error: "First name is required" }),
            lastName: z.string({ required_error: "Last name is required" }),
            email: z.string({ required_error: "Email is required", }).email({ message: "Not a email formate" }),
            password: z.string({ required_error: "Password is required" }),
            otp: z.string({ required_error: "Otp is required" }).length(6),
        });

        const { firstName, lastName, email, password, otp } = user.parse(req.body);

        const { statusCode, response } = await AuthService.verifyUser(firstName, lastName, email, password, otp);
        res.status(statusCode).send(response);
    } catch (error) {
        next(error)
    }
}