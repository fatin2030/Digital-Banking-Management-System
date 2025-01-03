import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsNumberString, IsString, Matches, MaxLength, isEmail, isNotEmpty, isNumber } from "class-validator";
import { Entity } from "typeorm";


export class RegistrationUserDto{

    
    @Optional()
    userId:string;
      @IsNotEmpty()
  //  @MaxLength(150)
    name:string;
     @IsNotEmpty()

    @Matches(/^(male|female)$/i)
    gender:string;

    @IsNotEmpty()
    dob:Date;

    @IsNotEmpty()
    @Matches(/^\d{8}(?:\d{8})?$/)
    nid:number;

    @IsNotEmpty()
   @Matches(/^01\d{9}$/)
    phone:string;

    @MaxLength(100)
    @IsEmail()
    email:string;

    @IsNotEmpty()
    address:string;
   
    filename: string;
   // @Optional()    isActive:boolean;
    @IsNotEmpty()
   // @Matches(/[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/)
    password:string;

    @Optional()
    role:string;
    //isActive:boolean;


    @IsNotEmpty()
    nomineeName: string;



   @Matches(/^(male|female)$/i)
    nomineeGender: string;

    @IsNotEmpty()
    nomineedob: Date;

    @IsNotEmpty()
    @Matches(/^\d{8}(?:\d{8})?$/)
    nomineenNid: number;

    @IsNotEmpty()
    @Matches(/^01\d{9}$/)
    nomineephone: string;

    @IsNotEmpty()
   nomineeAddress: string;
    
    nomineeFilename: string;

    @Matches(/^(current|saving)$/i)
    accountType: string;

   
    balance: number;

}


export class profileDTO {

  @IsNotEmpty({ message: 'User ID must not be empty' })
  userId: string;

  @IsNotEmpty({ message: 'Name must not be empty' })
  @MaxLength(150, { message: 'Name can be at most 150 characters long' })
  name: string;

  @IsNotEmpty({ message: 'Phone number must not be empty' })
  @Matches(/^01\d*$/, { message: 'Phone number must start with "01"' })
  phone: string;

  @MaxLength(100, { message: 'Email can be at most 100 characters long' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Address must not be empty' })
  address: string;


}

