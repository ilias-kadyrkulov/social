export type TAuthForm = {
    email: string
    password: string
}

export type TUser = {
    id: number
    email: string
    firstName: string
    lastName: string

    phone: string
    avatarPath: string
}

export type TAuthResponse = {
    accessToken: string
    user: TUser
}