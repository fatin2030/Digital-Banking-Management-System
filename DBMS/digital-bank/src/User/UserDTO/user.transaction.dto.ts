import { Optional } from "@nestjs/common";
import { IsNumber, IsString, Matches, isNumber } from "class-validator";


export class transactionDto{

    transactionId: string;
    @Optional()
    accountNumber: number;


    amount: number;
    @Matches(/^\d{8}(?:\d{8})?$/)
    receiverAccount: number ;

    @IsString()
    holderName: string;

    @IsString()
    accountType: string;
   
    bankCode: number;
   
    routingNumber: number;
    
    transferType: string;
    Status: boolean;
}