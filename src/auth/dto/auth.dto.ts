import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class AuthDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Некорректный email.' })
    email: string

    @IsString()
    @Length(4, 16, { message: 'Пароль должен быть от 4 до 16 символов.' })
    password: string
}
