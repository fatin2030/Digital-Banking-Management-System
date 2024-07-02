/// <reference types="multer" />
import { EmployeeService } from "./employee.service";
import { EmployeeDTO, changePasswordDTO, profileDTO } from "./employee.dto";
import { EmployeeEntity } from "./Entity/employee.entity";
import { AuthenticationEntity } from "../Authentication/auth.entity";
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getUsers(): object;
    createAccount(myobj: EmployeeDTO, myfile: Express.Multer.File): Promise<EmployeeDTO | string>;
    deleteEmployee(userId: string): object;
    updateEmployee(userId: string, myobj: EmployeeDTO, myfile: Express.Multer.File): Promise<EmployeeEntity | string>;
    getEmployeeAccountInfo(): Promise<AuthenticationEntity[] | string>;
    getEmployeeAccountInfoById(userId: string): Promise<EmployeeEntity | string>;
    getProfile(session: any): Promise<profileDTO | string>;
    updateProfile(session: any, myobj: profileDTO, myfile: Express.Multer.File): Promise<profileDTO | string>;
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
    getAllServiceRequiest(): Promise<string | any[]>;
    getServiceRequiestById(serviceId: number): Promise<string | any>;
    processServiceRequiestById(serviceId: number): Promise<string | any>;
    sendVerificationReportToManager(serviceId: number): Promise<string | any>;
    openFile(name: string, res: any): void;
    getUsersByEmail(email: string): object;
    getUserRoleByEmail(email: string): object;
    updateProfileInfo(userEmail: string, myobj: profileDTO, myfile: Express.Multer.File): Promise<profileDTO | string>;
}
