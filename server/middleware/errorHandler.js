const { STATUS_CODES } = require("http");
const { ZodError } = require('zod');
const { fromZodError } = require('zod-validation-error');


// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {

    if (process.env.NODE_ENV !== "production") {
        // logic for your production
    }


    // Error logger
    if (process.env.NODE_ENV === "development") {
        if (err instanceof ZodError) {
            const validation = fromZodError(err)
            console.log(validation)
            return res
                .status(403)
                .send({
                    message: validation.message
                });
        }
        else {
            console.log("[error] API error", { error: err });
        }


    }

    return res
        .status(err.status || 500)
        .send({
            message: err.message || STATUS_CODES[err.status]
        });
};

module.exports = { errorHandler };
