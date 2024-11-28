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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PasswordResetService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const password_reset_schema_1 = require("../schemas/password-reset.schema");
const user_schema_1 = require("../schemas/user.schema");
const mailer_service_1 = require("../../mailer/mailer.service");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
let PasswordResetService = PasswordResetService_1 = class PasswordResetService {
    constructor(passwordResetModel, userModel, mailerService) {
        this.passwordResetModel = passwordResetModel;
        this.userModel = userModel;
        this.mailerService = mailerService;
        this.logger = new common_1.Logger(PasswordResetService_1.name);
    }
    async generateResetToken(email) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000);
        await this.passwordResetModel.create({ email, token, expiresAt });
        const resetLink = `http://localhost:5000/password-reset/reset?token=${token}`;
        await this.mailerService.sendMail(email, 'Password Reset Request', `Click the link to reset your password: ${resetLink}`, `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`);
    }
    async resetPassword(token, newPassword) {
        const resetRequest = await this.passwordResetModel.findOne({ token });
        if (!resetRequest || resetRequest.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired token');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userModel.updateOne({ email: resetRequest.email }, { password: hashedPassword });
        await this.passwordResetModel.deleteOne({ token });
    }
};
exports.PasswordResetService = PasswordResetService;
exports.PasswordResetService = PasswordResetService = PasswordResetService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(password_reset_schema_1.PasswordReset.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mailer_service_1.MailerService])
], PasswordResetService);
//# sourceMappingURL=password-reset.service.js.map