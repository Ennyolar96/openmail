"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.app = exports.createApp = void 0;
require("reflect-metadata");
const middleware_1 = require("@/global/middleware");
const app_module_1 = require("@/app.module");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config({ quiet: true });
const createApp = () => {
    const app = (0, express_1.default)();
    (0, app_module_1.applicationMiddlewares)(app);
    app.use(middleware_1.appErrorHandler);
    const PORT = process.env.PORT || 5001;
    return { app, PORT };
};
exports.createApp = createApp;
_a = (0, exports.createApp)(), exports.app = _a.app, exports.PORT = _a.PORT;
exports.default = exports.app;
module.exports = exports.app;
async function bootstrap() {
    exports.app.listen(exports.PORT, () => {
        console.log(`http://localhost:${exports.PORT}`);
    });
    const gracefulShutdown = async () => {
        console.log("Shutting down gracefully...");
        process.exit(0);
    };
    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
    process.on("unhandledRejection", gracefulShutdown);
    process.on("uncaughtException", gracefulShutdown);
}
if (require.main === module) {
    void bootstrap();
}
//# sourceMappingURL=main.js.map