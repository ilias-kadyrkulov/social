import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/users.model'
import * as bcrypt from 'bcryptjs'
import { Response } from 'express'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) {}

    EXPIRE_DAY_REFRESH_TOKEN = 1
    REFRESH_TOKEN_NAME = 'refreshToken'

    async verifyRefreshToken(refreshToken: string) {
        const isTokenValid = await this.jwtService.verifyAsync(refreshToken)

        if (!isTokenValid)
            throw new UnauthorizedException('Invalid refresh token.')

        const user = await this.usersService.getById(isTokenValid.id)

        const tokens = await this.generateTokens(user.id)

        return {
            user: await this.returnUserFields(user),
            ...tokens
        }
    }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto)
        const tokens = await this.generateTokens(user.id)

        return {
            user: await this.returnUserFields(user),
            ...tokens
        }
    }

    async registration(dto: AuthDto) {
        const candidate = await this.usersService.getUserByEmail(dto.email)

        if (candidate) {
            throw new HttpException(
                'Пользователь с таким email уже существует.',
                HttpStatus.BAD_REQUEST
            )
        }

        const hashPassword = await bcrypt.hash(dto.password, 5)

        const user = await this.usersService.createUser({
            ...dto,
            password: hashPassword
        })

        const tokens = await this.generateTokens(user.id)

        return {
            user: await this.returnUserFields(user),
            ...tokens
        }
    }

    async generateTokens(userId: number) {
        const payload = { id: userId }

        const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' })
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' })

        return {
            accessToken,
            refreshToken
        }
    }

    private async returnUserFields(user: User) {
        return {
            id: user.id,
            email: user.email
        }
    }

    async validateUser(dto: AuthDto) {
        const user = await this.usersService.getUserByEmail(dto.email)

        if (!user) {
            throw new NotFoundException({
                message: 'Некорректный email или пароль.'
            })
        }

        const passwordsEqual = await bcrypt.compare(dto.password, user.password)

        if (user && passwordsEqual) {
            return user
        } else {
            throw new UnauthorizedException({
                message: 'Некорректный email или пароль.'
            })
        }
    }

    addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: 'localhost',
            expires: expiresIn,
            secure: true,
            sameSite: 'none'
        })
    }

    removeRefreshTokenFromResponse(res: Response) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: 'localhost',
            expires: new Date(0),
            secure: true,
            sameSite: 'none'
        })
    }
}
