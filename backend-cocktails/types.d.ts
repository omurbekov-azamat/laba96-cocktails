export interface IUser {
    email: string
    password: string;
    displayName: string;
    avatar: string;
    role: string;
    token: string;
    googleId?: string;
}