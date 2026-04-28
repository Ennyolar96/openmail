"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouters = void 0;
const input_1 = require("../app/email/input");
const middleware_1 = require("../global/middleware");
const applicationRouters = (app) => {
    app.post("/send-mail", (0, middleware_1.validateBody)(input_1.SendMailRequest), async (req, res, next) => {
        const payload = req.body;
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