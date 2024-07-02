import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Delete, Put, NotFoundException, Patch, Session, InternalServerErrorException } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { EmployeeDTO, changePasswordDTO, profileDTO } from "./employee.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { EmployeeEntity } from "./Entity/employee.entity";
//import { AuthService } from "./auth/auth.service";
import { AuthGuard } from '../Authentication/auth.guard';
import * as bcrypt from 'bcrypt';
//import { promises } from "dns";
import { AuthenticationEntity } from "../Authentication/auth.entity";
import { Roles } from '../CustomDecorator/roles.decorator';
//import { Request } from 'express';
//import session from "express-session";


@Controller('/employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }
    @UseGuards(AuthGuard)
    @Get()
    getUsers(): object {
        return this.employeeService.getUsers();
    }

    //=>[1] Create Account For Accountant
    @Post('/createAccount')
    @UseGuards(AuthGuard)
    @Roles('Account Officer')
    @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 300000000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
    async createAccount(@Body() myobj: EmployeeDTO, @UploadedFile() myfile: Express.Multer.File): Promise<EmployeeDTO | string> {
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(myobj.password, salt);
        myobj.password = hashedpassword;
        myobj.filename = myfile.filename;
        return this.employeeService.createAccount(myobj);
    }

    //=>[2] Delete Accountent Account
    @Delete('deleteEmployee/:userId')
    @UseGuards(AuthGuard)
    @Roles('Account Officer')
    deleteEmployee(@Param('userId') userId: string): object {
        return this.employeeService.deleteEmployee(userId);
    }
    //=>[3] Update Accountent Account
    @Put('updateEmployee/:userId')
    @UseGuards(AuthGuard)
    @Roles('Account Officer')
    @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 300000000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe())
    async updateEmployee(@Param('userId') userId: string, @Body() myobj: EmployeeDTO, @UploadedFile() myfile: Express.Multer.File): Promise<EmployeeEntity | string> {
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(myobj.password, salt);
        myobj.password = hashedpassword;
        myobj.filename = myfile.filename;
        return this.employeeService.updateEmployee(userId, myobj);
    }
    //=>[4]Get Accountent Account
    @Get('/getEmployeeAccount')
    @UseGuards(AuthGuard)
    @Roles('Account Officer')
    getEmployeeAccountInfo(): Promise<AuthenticationEntity[] | string> {
        return this.employeeService.getAccountInfo();
    }
    //=>[5]Get Accountent Account By ID
    @Get('/getEmployeeAccount/:userId')
    @UseGuards(AuthGuard)
    @Roles('Account Officer')
    async getEmployeeAccountInfoById(@Param('userId') userId: string): Promise<EmployeeEntity | string> {
        try {
            console.log(userId)
            const accountInfo = await this.employeeService.getAccountInfoById(userId);
            return accountInfo;
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error occurred while fetching employee account information:', error);
            throw new InternalServerErrorException('Error occurred while fetching employee account information.');
        }
    }


    //=>[6]Show Account Information
    @UseGuards(AuthGuard)
    @Get('/Profile')
    getProfile(@Session() session): Promise<profileDTO | string> {
        if (session && session['email']) {
            // Retrieve data from session
            const userEmail = session['email']; // Access the 'email' property stored in the session
            console.log(userEmail);
            return this.employeeService.getProfile(userEmail);
        }
        throw new NotFoundException('No data in session');
    }
    //=>[7]Update Account Information
    @UseGuards(AuthGuard)
    @Put('/updateProfile')
    @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 300000000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    updateProfile(@Session() session, @Body() myobj: profileDTO, @UploadedFile() myfile: Express.Multer.File): Promise<profileDTO | string> {
        if (session && session['email']) {
            // Retrieve data from session
            const userEmail = session['email']; // Access the 'email' property stored in the session
            console.log(userEmail);
            myobj.filename = myfile.filename;
            return this.employeeService.updateProfile(userEmail, myobj);
        }
        throw new NotFoundException('No data in the session');
    }
    //=>[8]Update Account Password
    // @UseGuards(AuthGuard)
    // @Patch('/changePassword')
    // passwordChange(@Body() myobj: changePasswordDTO, @Session() session): Promise<AuthenticationEntity | string> {
    //     if (session && session['email']) {
    //         // Retrieve data from session
    //         const userEmail = session['email']; // Access the 'email' property stored in the session
    //         console.log("Session Data:", userEmail);
    //         return this.employeeService.passwordChange(userEmail, myobj);
    //     }
    //     throw new NotFoundException('No data in the session');
    // }
    //=>[8]Update Account Password
    @UseGuards(AuthGuard)
    @Patch('/changePassword/:email')
    passwordChange(@Param('email') userEmail: string, @Body() myobj: changePasswordDTO): Promise<AuthenticationEntity | string> {

        return this.employeeService.passwordChange(userEmail, myobj);

    }
    //=>[9]Get Inactive User Account
    @Get('/getInactiveUserAccount')
    @UseGuards(AuthGuard)
    @Roles('Account Officer')
    getInactiveUserAccount(): Promise<string | AuthenticationEntity[]> {
        return this.employeeService.getInactiveUserAccount();
    }
    //=>[10]Activate User Account
    @Patch('activateUserAccount/:userId')
    //@UseGuards(AuthGuard)
    //@Roles('Account Officer')
    activateUserAccount(@Param('userId') userId: string): Promise<string> {
        return this.employeeService.activateUserAccount(userId);
    }
    //=>[11]Deactivate User Account
    @Patch('deActivateUserAccount/:userId')
    //@UseGuards(AuthGuard)
    //@Roles('Account Officer')
    deactivateUserAccount(@Param('userId') userId: string): Promise<string> {
        return this.employeeService.deactivateUserAccount(userId);
    }
    //=>[12]Get All User Account
    @Get('/getUserAccount')
    @UseGuards(AuthGuard)
    @Roles('Account Officer')
    getUserAccountInfo(): Promise<string | EmployeeEntity[]> {
        return this.employeeService.getUserAccountInfo();
    }
    //=>[13]Get All Transaction History
    @Get('/getUserTransactionHistory')
    @UseGuards(AuthGuard)
    @Roles('Account Officer', 'Accountent')
    getTransactionHistory(): Promise<string | any[]> {
        return this.employeeService.getTransactionHistory();
    }
    //=>[14]Get Transaction History By UserID
    @Get('getTransactionHistoryByUserId/:userId')
    @UseGuards(AuthGuard)
    @Roles('Account Officer', 'Accountent')
    getTransactionHistoryByUserId(@Param('userId') userId: string): Promise<string | any[]> {
        return this.employeeService.getTransactionHistoryByUserId(userId);
    }
    //=>[15]Get Transaction History By TransactionID
    @Get('getTransactionHistoryByTransactionId/:transactionId')
    @UseGuards(AuthGuard)
    @Roles('Account Officer', 'Accountent')
    getTransactionHistoryByTransactionId(@Param('transactionId') transactionId: string): Promise<string | any> {
        return this.employeeService.getTransactionHistoryByTransactionId(transactionId);
    }
    //=>[16]Get Incomplete Transaction Data
    @Get('/getIncompleteTransfer')
    @UseGuards(AuthGuard)
    @Roles('Account Officer', 'Accountent')
    getIncompleteTransfer(): Promise<string | any[]> {
        return this.employeeService.getIncompleteTransfer();
    }
    //=>[17]Activate User Account
    @Patch('confirmTransfer/:transactionId')
    //@UseGuards(AuthGuard)
    //@Roles('Accountent')
    confirmTransfer(@Param('transactionId') transactionId: string): Promise<string> {
        console.log(transactionId);
        return this.employeeService.confirmTransfer(transactionId);
    }
    //=>[18]Get All Service Requiest
    @Get('/getAllServiceRequiest')
    @UseGuards(AuthGuard)
    @Roles('Accountent')
    getAllServiceRequiest(): Promise<string | any[]> {

        return this.employeeService.getAllServiceRequests();
    }
    //=>[19]Get Service Requiest By ServiceID
    @Get('getServiceRequiestById/:serviceId')
    @UseGuards(AuthGuard)
    @Roles('Accountent')
    getServiceRequiestById(@Param('serviceId') serviceId: number): Promise<string | any> {
        return this.employeeService.getServiceRequiestById(serviceId);
    }
    //=>[20]Process Service Requiest By ServiceID
    @Patch('/processServiceRequiestById/:serviceId')
    //@UseGuards(AuthGuard)
    //@Roles('Accountent')
    processServiceRequiestById(@Param('serviceId') serviceId: number): Promise<string | any> {
        return this.employeeService.processServiceRequestById(serviceId);
    }
    //=>[21]Send Verification Report To Manager
    @Get('/sendVerificationReportToManager/:serviceId')
    @UseGuards(AuthGuard)
    @Roles('Accountent')
    sendVerificationReportToManager(@Param('serviceId') serviceId: number): Promise<string | any> {
        return this.employeeService.sendVerificationReportToManager(serviceId);
    }
    //=>[22]Show The Uploaded File
    //@UseGuards(AuthGuard)
    //@Roles('Account Officer','Accountent')
    @Get('/openFile/:name')
    openFile(@Param('name') name: string, @Res() res) {
        res.sendFile(name, { root: './upload' })
    }

    @UseGuards(AuthGuard)
    @Get('getusers/:email')
    getUsersByEmail(@Param('email') email: string): object {
        return this.employeeService.getProfile(email);
    }

    //=>[24]Get User Role
    //@UseGuards(AuthGuard)
    @Get('Userrole/:email')
    getUserRoleByEmail(@Param('email') email: string): object {
        return this.employeeService.userRole(email);
    }
    //=>[7]Update Account Information
    @UseGuards(AuthGuard)
    @Put('updateUserProfile/:email')
    @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 300000000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    updateProfileInfo(@Param('email') userEmail: string, @Body() myobj: profileDTO, @UploadedFile() myfile: Express.Multer.File): Promise<profileDTO | string> {
        myobj.filename = myfile.filename;
        return this.employeeService.updateProfile(userEmail, myobj);
    }
}
