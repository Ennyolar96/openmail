"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouters = void 0;
const input_1 = require("../app/email/input");
const middleware_1 = require("../global/middleware");
const p_limit_1 = __importDefault(require("p-limit"));
const applicationRouters = (app) => {
    app.post("/send-mail", (0, middleware_1.validateBody)(input_1.SendMailRequest), async (req, res, next) => {
        const payload = req.body;
        const limit = (0, p_limit_1.default)(5);
        try {
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to send email please try again",
                data: {
                    accepted: [],
                    rejected: [],
                    response: ["Failed to send email please try again"],
                },
            });
        }
        finally {
        }
    });
};
exports.applicationRouters = applicationRouters;
//# sourceMappingURL=index.js.map