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
exports.transactionDto = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
class transactionDto {
}
exports.transactionDto = transactionDto;
__decorate([
    (0, common_1.Optional)(),
    __metadata("design:type", Number)
], transactionDto.prototype, "accountNumber", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^\d{8}(?:\d{8})?$/),
    __metadata("design:type", Number)
], transactionDto.prototype, "receiverAccount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], transactionDto.prototype, "holderName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], transactionDto.prototype, "accountType", void 0);
//# sourceMappingURL=user.transaction.dto.js.map