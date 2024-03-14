import { UserFriends } from '@/users/user_friends.model'
import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table
} from 'sequelize-typescript'

type UserCreationAttrs = {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @Column({ type: DataType.STRING })
    password: string

    @Column({ type: DataType.STRING, allowNull: true })
    firstName: string

    @Column({ type: DataType.STRING, allowNull: true })
    lastName: string

    @Column({ type: DataType.STRING, allowNull: true })
    avatarPath: string

    @Column({ type: DataType.STRING, allowNull: true })
    phone: string

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean

    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string

    @BelongsToMany(() => User, {
        through: () => UserFriends,
        foreignKey: 'userId',
        otherKey: 'friendId',
        as: 'FriendsList'
    })
    friends: User[]
}
