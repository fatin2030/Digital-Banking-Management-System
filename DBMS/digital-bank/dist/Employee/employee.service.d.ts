import { EmployeeDTO, changePasswordDTO, profileDTO } from "./employee.dto";
import { loginDTO } from "../DTO/login.dto";
import { Repository } from "typeorm";
import { AuthenticationEntity } from "../Authentication/auth.entity";
import { EmployeeEntity } from "./Entity/employee.entity";
import { JwtService } from '@nestjs/jwt';
import { AccountEntity } from "./Entity/Account.entity";
import { EmailService } from "./Mailer/mailer.service";
import { TransactionEntity } from "./Entity/transaction.entity";
import { ServiceEntity } from "./Entity/service.entity";
export declare class EmployeeService {
    private employeeRepo;
    private autheRepo;
    private accountRepo;
    private transactionRepo;
    private serviceRepo;
    private jwtService;
    private emailService;
    [x: string]: any;
    constructor(employeeRepo: Repository<EmployeeEntity>, autheRepo: Repository<AuthenticationEntity>, accountRepo: Repository<AccountEntity>, transactionRepo: Repository<TransactionEntity>, serviceRepo: Repository<ServiceEntity>, jwtService: JwtService, emailService: EmailService);
    getUsers(): object;
    createAccount(myobj: EmployeeDTO): Promise<EmployeeDTO | string>;
    deleteEmployee(userId: string): Promise<void>;
    updateEmployee(userId: string, myobj: EmployeeDTO): Promise<EmployeeEntity | string>;
    getAccountInfo(): Promise<AuthenticationEntity[] | string>;
    getAccountInfoById(userId: string): Promise<EmployeeEntity | string>;
    getProfile(userEmail: string): Promise<any | string>;
    updateProfile(userEmail: string, myobj: profileDTO): Promise<profileDTO | string>;
    passwordChange(userEmail: string, myobj: changePasswordDTO): Promise<AuthenticationEntity | string>;
    getInactiveUserAccount(): Promise<string | AuthenticationEntity[]>;
    activateUserAccount(userId: string): Promise<string>;
    deactivateUserAccount(userId: string): Promise<string>;
    getUserAccountInfo(): Promise<string | EmployeeEntity[]>;
    getTransactionHistory(): Promise<string | any[]>;
    getTransactionHistoryByUserId(userId: string): Promise<string | any[]>;
    getTransactionHistoryByTransactionId(transactionId: string): Promise<string | any>;
    getIncompleteTransfer(): Promise<string | any[]>;
    confirmTransfer(transactionId: string): Promise<string>;
    getAllServiceRequests(): Promise<string | any[]>;
    getServiceRequestById(serviceId: number): Promise<string | any>;
    processServiceRequestById(serviceId: number): Promise<string>;
    sendVerificationReportToManager(serviceId: number): Promise<string>;
    findOne(logindata: loginDTO): Promise<any>;
    userRole(userEmail: string): Promise<any>;
}
