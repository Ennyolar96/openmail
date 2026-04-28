"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMailRequest = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class MailAuth {
}
__decorate([
    (0, class_validator_1.IsString)({ message: "Mail User should be string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Mail User is required" }),
    __metadata("design:type", String)
], MailAuth.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Mail Pass should be string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Mail Pass is required" }),
    __metadata("design:type", String)
], MailAuth.prototype, "pass", void 0);
class SendMailConfig {
}
__decorate([
    (0, class_validator_1.IsString)({ message: "Mail Host should be string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Mail Host is required" }),
    __metadata("design:type", String)
], SendMailConfig.prototype, "host", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({
        allowNaN: false,
        maxDecimalPlaces: 0,
    }, { message: "Mail Port should be number" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Mail Port is required" }),
    __metadata("design:type", Number)
], SendMailConfig.prototype, "port", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: "Mail Secure should be boolean" }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], SendMailConfig.prototype, "secure", void 0);
__decorate([
    (0, class_validator_1.IsObject)({ message: "Mail Auth should be object" }),
    (0, class_transformer_1.Type)(() => MailAuth),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", MailAuth)
], SendMailConfig.prototype, "auth", void 0);
class MailAttachment {
}
__decorate([
    (0, class_validator_1.IsString)({ message: "Filename should be string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MailAttachment.prototype, "filename", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Content should be string (base64 or text)" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MailAttachment.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Path should be a valid string URL or file path" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MailAttachment.prototype, "path", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "ContentType should be string, e.g. image/png" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MailAttachment.prototype, "contentType", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "CID should be string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MailAttachment.prototype, "cid", void 0);
class SendMail {
}
__decorate([
    (0, class_validator_1.IsString)({ message: "Mail From should be string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Mail From is required" }),
    __metadata("design:type", String)
], SendMail.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: "Mail To should be array" }),
    (0, class_validator_1.ArrayNotEmpty)({ message: "Mail To should not be empty" }),
    (0, class_validator_1.ArrayMaxSize)(50, { message: "Mail To should not pass 50" }),
    (0, class_validator_1.IsString)({ each: true, message: "Mail To should be string" }),
    __metadata("design:type", Array)
], SendMail.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Mail Subject should be string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Mail Subject is required" }),
    __metadata("design:type", String)
], SendMail.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Mail Html should be string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendMail.prototype, "html", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Mail Text should be string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendMail.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: "Attachments should be an array" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MailAttachment),
    __metadata("design:type", Array)
], SendMail.prototype, "attachments", void 0);
class SendMailRequest {
}
exports.SendMailRequest = SendMailRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SendMailConfig),
    __metadata("design:type", SendMailConfig)
], SendMailRequest.prototype, "config", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SendMail),
    __metadata("design:type", SendMail)
], SendMailRequest.prototype, "mail", void 0);
//# sourceMappingURL=smtp.dto.js.map