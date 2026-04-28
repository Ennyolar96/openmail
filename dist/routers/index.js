"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouters = void 0;
const middleware_1 = require("../global/middleware");
const nodemailer = __importStar(require("nodemailer"));
const p_limit_1 = __importDefault(require("p-limit"));
const input_1 = require("../app/email/input");
const config = (config) => {
    const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: config.auth,
        pool: true,
        maxConnections: 5,
    });
    return transporter;
};
const applicationRouters = (app) => {
    app.post("/send-mail", (0, middleware_1.validateBody)(input_1.SendMailRequest), async (req, res, next) => {
        const payload = req.body;
        const limit = (0, p_limit_1.default)(5);
        const mail = config(payload.config);
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
            mail.close();
        }
    });
};
exports.applicationRouters = applicationRouters;
//# sourceMappingURL=index.js.map