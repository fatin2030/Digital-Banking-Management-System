import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from '../Employee/Entity/employee.entity';
import { AuthenticationEntity } from '../Authentication/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserEmailService } from './UserMailer/mailer.sevice';
import { AuthService } from '../Authentication/auth.service';
import { AuthController } from '../Authentication/auth.controller';
import { AccountEntity } from '../Employee/Entity/Account.entity';
import { TransactionEntity } from '../Employee/Entity/transaction.entity';
import { ServiceEntity } from '../Employee/Entity/service.entity';
import { EmployeeService } from 'src/Employee/employee.service';
import { EmailService } from 'src/Employee/Mailer/mailer.service';
import { jwtConstants } from 'src/Authentication/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeEntity,
      AuthenticationEntity,
      AccountEntity,
      TransactionEntity,
      ServiceEntity,
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    
  ],
 controllers: [UserController,AuthController],
 providers:[ UserService,UserEmailService,AuthService,EmployeeService,EmailService],
 exports: [UserService],
})
export class UserModule {}


