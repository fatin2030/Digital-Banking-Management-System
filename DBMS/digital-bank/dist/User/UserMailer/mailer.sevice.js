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
exports.UserEmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let UserEmailService = class UserEmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ifspbankplc@gmail.com',
                pass: 'kpto phvy genq fquz',
            },
        });
    }
    async sendMail(to, subject, text) {
        const mailOptions = {
            from: 'ifspbankplc@gmail.com',
            to,
            subject,
            text,
        };
        await this.transporter.sendMail(mailOptions);
    }
};
exports.UserEmailService = UserEmailService;
exports.UserEmailService = UserEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserEmailService);
//# sourceMappingURL=mailer.sevice.js.map