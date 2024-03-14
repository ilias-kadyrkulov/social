import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UsePipes
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { ValidationPipe } from './../pipes/validation.pipe'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Post('registration')
    async register(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const { refreshToken, ...response } =
            await this.authService.registration(dto)
        this.authService.addRefreshTokenToResponse(res, refreshToken)

        return response
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const { refreshToken, ...response } =
            await this.authService.login(dto)
        this.authService.addRefreshTokenToResponse(res, refreshToken)

        return response
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        this.authService.removeRefreshTokenFromResponse(res)

        return true
    }

    @HttpCode(HttpStatus.OK)
    @Post('login/access-token')
    async getNewTokens(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        console.log(req.cookies)

        const refreshTokenFromCookies =
            req.cookies[this.authService.REFRESH_TOKEN_NAME]

        if (!refreshTokenFromCookies) {
            this.authService.removeRefreshTokenFromResponse(res)
            throw new UnauthorizedException(
                'Refresh token has not been passed!'
            )
        }

        const { refreshToken, ...response } =
            await this.authService.verifyRefreshToken(refreshTokenFromCookies)

        this.authService.addRefreshTokenToResponse(res, refreshToken)

        return response
    }
}
