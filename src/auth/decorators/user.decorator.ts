import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { User } from 'src/users/users.model'

//NOTE - To receive info about current user that is logged into the system
export const CurrentUser = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user

        return data ? user[data] : user
    },
)
