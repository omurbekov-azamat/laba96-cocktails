export interface IUser {
    email: string
    password: string;
    displayName: string;
    avatar: string | null;
    role: string;
    token: string;
    googleId?: string;
}