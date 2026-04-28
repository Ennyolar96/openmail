"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationMiddlewares = void 0;
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const compression_1 = __importDefault(require("compression"));
const os_1 = __importDefault(require("os"));
const routers_1 = require("./routers");
const applicationMiddlewares = (app) => {
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
            },
        },
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
    }));
    app.use(express_1.default.json({ limit: "50mb" }));
    app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
    app.use((0, cors_1.default)());
    app.set("trust proxy", 1);
    app.use((0, hpp_1.default)());
    app.use((0, compression_1.default)());
    app.disable("x-powered-by");
    app.use((req, res, next) => {
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "SAMEORIGIN");
        res.setHeader("X-XSS-Protection", "1; mode=block");
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
        next();
    });
    app.use((req, res, next) => {
        const isDev = process.env.NODE_ENV === "development";
        console.log(`Incoming Request: ${req.method} ${req.url} ${os_1.default.platform()} ${req.ip}`);
        if (!isDev) {
            const xfProto = (req.headers["x-forwarded-proto"] || "");
            const isForwardedSecure = xfProto.split(",")[0]?.trim() === "https";
            const isSecure = req.secure || isForwardedSecure;
            const host = req.hostname;
            const approve = ["localhost", "127.0.0.1", "::1"];
            const isLocal = approve.includes(host);
            if (!isSecure && !isLocal) {
                return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
            }
        }
        next();
    });
    app.get("/health", (req, res) => {
        res.status(200).json({
            status: "OK",
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
        });
    });
    app.get("/", (req, res) => {
        res.send("Hello, Welcome");
    });
    (0, routers_1.applicationRouters)(app);
};
exports.applicationMiddlewares = applicationMiddlewares;
//# sourceMappingURL=app.module.js.map