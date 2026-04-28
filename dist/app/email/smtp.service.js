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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmtpService = void 0;
const nodemailer = __importStar(require("nodemailer"));
class SmtpService {
    async sendMail(payload) {
        const limit = 5;
        const mail = this.config(payload.config);
        try {
            const task = payload.mail.to.map(async (to) => {
                try {
                    const result = await mail.sendMail({ ...payload.mail, to });
                    return { to, response: result.response };
                }
                catch (error) {
                    return Promise.reject({
                        to,
                        reason: error?.message || "Unknown error",
                    });
                }
            });
            const data = await Promise.allSettled(task);
            const rejected = data.filter((item) => item.status === "rejected");
            const accepted = data.filter((item) => item.status === "fulfilled");
            return {
                success: true,
                message: "Email send successfully",
                data: {
                    accepted: accepted.map((item) => item.value.to),
                    rejected: rejected.map((item) => item.reason.to),
                    response: accepted.map((item) => item.value.response),
                },
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Failed to send email please try again",
                data: {
                    accepted: [],
                    rejected: [],
                    response: ["Failed to send email please try again"],
                },
            };
        }
        finally {
            mail.close();
        }
    }
    config(config) {
        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: config.auth,
            pool: true,
            maxConnections: 5,
        });
        return transporter;
    }
}
exports.SmtpService = SmtpService;
//# sourceMappingURL=smtp.service.js.map