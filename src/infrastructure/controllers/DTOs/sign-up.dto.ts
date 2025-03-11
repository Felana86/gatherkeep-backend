import {IsEmail, IsNotEmpty} from "class-validator";
import {MinLength} from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    firstName?: string;
    lastName?: string;
}