import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator'

export class UserDto {
    @IsOptional()
    @IsString()
    @IsEmail({}, { message: 'Некорректный email.' })
    email?: string

    @IsOptional()
    @IsString()
    @Length(4, 16, { message: 'Пароль должен быть от 4 до 16 символов.' })
    password?: string

    @IsOptional()
    @Matches(/^[A-ZА-Я][a-zа-я]+$/, {
        message: 'Должна быть строка вашего имени с заглавной буквы без символов и пробелов.',
    })
    @IsString()
    firstName?: string

    @IsOptional()
    @Matches(/^[A-ZА-Я][a-zа-я]+$/, {
        message: 'Должна быть строка вашей фамилии с заглавной буквы без символов и пробелов.',
    })
    @IsString()
    lastName?: string

    @IsOptional()
    @IsString()
    phone?: string

    @IsOptional()
    @IsString()
    avatarPath?: string
}
