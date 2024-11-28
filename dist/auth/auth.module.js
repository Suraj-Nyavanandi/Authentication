"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_service_1 = require("./services/auth.service");
const password_reset_service_1 = require("./services/password-reset.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const jwt_guard_1 = require("./guards/jwt.guard");
const user_schema_1 = require("./schemas/user.schema");
const password_reset_schema_1 = require("./schemas/password-reset.schema");
const mailer_module_1 = require("../mailer/mailer.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: password_reset_schema_1.PasswordReset.name, schema: password_reset_schema_1.PasswordResetSchema },
            ]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'yourSecretKey',
                signOptions: { expiresIn: '1h' },
            }),
            mailer_module_1.MailerModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, password_reset_service_1.PasswordResetService, jwt_strategy_1.JwtStrategy, jwt_guard_1.JwtAuthGuard],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map