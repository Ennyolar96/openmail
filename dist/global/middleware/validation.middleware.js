"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appErrorHandler = exports.validateBody = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class RequestValidationError extends Error {
    constructor(errors) {
        super("Validation failed");
        this.errors = errors;
        this.statusCode = 422;
        this.name = "RequestValidationError";
    }
}
const defaultValidatorOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
    validationError: { target: false, value: false },
};
const validateBody = (dto, options) => {
    return async (req, _res, next) => {
        try {
            const body = req.body && typeof req.body === "object" && !Array.isArray(req.body)
                ? req.body
                : {};
            const payload = (0, class_transformer_1.plainToInstance)(dto, body);
            const errors = await (0, class_validator_1.validate)(payload, {
                ...defaultValidatorOptions,
                ...options,
            });
            if (errors.length > 0) {
                return next(new RequestValidationError(errors));
            }
            req.body = payload;
            return next();
        }
        catch (error) {
            return next(error);
        }
    };
};
exports.validateBody = validateBody;
const formatValidationErrors = (errors) => {
    return errors.map((error) => {
        if (error.children?.length) {
            return {
                field: error.property,
                children: formatValidationErrors(error.children),
            };
        }
        return {
            field: error.property,
            messages: Object.values(error.constraints ?? {}),
        };
    });
};
const appErrorHandler = (error, _req, res, next) => {
    if (res.headersSent) {
        next(error);
        return;
    }
    const env = process.env.NODE_ENV === "development";
    if (error instanceof RequestValidationError) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            success: false,
            message: error.message,
            errors: formatValidationErrors(error.errors),
        });
        return;
    }
    if (error instanceof Error) {
        res.status(400).json({
            success: false,
            status: 400,
            message: error.message,
            ...(env && { stack: error.stack }),
            errors: error.name,
        });
        return;
    }
    res.status(500).json({
        success: false,
        status: 500,
        message: "Something went wrong",
        errors: "Internal server error",
    });
};
exports.appErrorHandler = appErrorHandler;
//# sourceMappingURL=validation.middleware.js.map