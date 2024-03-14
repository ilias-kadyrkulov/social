import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'
import { UserDto } from './dto/user.dto'
import { UserFriends } from '@/users/user_friends.model'
import { AuthDto } from '@/auth/dto/auth.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(UserFriends)
        private userFriendsRepository: typeof UserFriends
    ) {}

    async createUser(dto: AuthDto) {
        const user = await this.userRepository.create(dto)
        return user
    }

    async updateProfile(id: number, dto: UserDto) {
        let data = dto

        if (dto.password) {
            data = { ...dto, password: await bcrypt.hash(dto.password, 5) }
        }

        await this.userRepository.update(data, {
            where: { id }
        })

        return this.getById(id)
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        return user
    }

    async getById(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            attributes: {
                exclude: ['password']
            }
        })

        return user
    }

    async toggleFriend(userId: number, friendId: number) {
        if (userId === friendId) {
            throw new Error('Нельзя добавить себя в друзья.')
        }

        const user = await this.userRepository.findByPk(userId)
        const friend = await this.userRepository.findByPk(friendId)

        if (!user || !friend) {
            throw new Error('Один из пользователей не найден.')
        }

        const existingFriendship = await this.userFriendsRepository.findOne({
            where: {
                userId: userId,
                friendId: friendId
            }
        })

        if (existingFriendship) {
            await existingFriendship.destroy()
            return 'Друг удалён.'
        } else {
            await this.userFriendsRepository.create({ userId, friendId })
            return 'Друг добавлен.'
        }
    }
}
