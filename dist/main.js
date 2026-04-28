"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("reflect-metadata");
const middleware_1 = require("./global/middleware");
const app_module_1 = require("./app.module");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
dotenv_1.default.config({ quiet: true });
const app = (0, express_1.default)();
(0, app_module_1.applicationMiddlewares)(app);
app.use(middleware_1.appErrorHandler);
const PORT = process.env.PORT || 5001;
exports.handler = (0, serverless_http_1.default)(app);
//# sourceMappingURL=main.js.map