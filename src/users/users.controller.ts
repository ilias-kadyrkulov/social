import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    UsePipes,
    // ValidationPipe,
} from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'

@Controller('users/profile')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @Auth()
    getProfile(@CurrentUser('id') id: number) {
        return this.usersService.getById(id)
    }

    @UsePipes(new ValidationPipe())
    @Auth()
    @HttpCode(HttpStatus.OK)
    @Put()
    updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
        return this.usersService.updateProfile(id, dto)
    }

    @Auth()
    @HttpCode(HttpStatus.OK)
    @Patch('friends/:friendId')
    toggleFriend(
        @CurrentUser('id') id: number,
        @Param('friendId') friendId: number,
    ) {
        return this.usersService.toggleFriend(id, friendId)
    }
}
