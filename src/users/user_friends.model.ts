import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript'
import { User } from '@/users/users.model'

@Table({ tableName: 'user_friends' })
export class UserFriends extends Model<UserFriends> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    })
    id: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    friendId: number
}
