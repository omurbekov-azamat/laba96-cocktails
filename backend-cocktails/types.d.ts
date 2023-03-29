import {ObjectId} from 'mongoose';

export interface IUser {
    email: string
    password: string;
    displayName: string;
    avatar: string;
    role: string;
    token: string;
    googleId?: string;
}

export interface Ingredient {
    name: string;
    amount: string;
}

export interface ICocktail {
    user: ObjectId;
    name: string;
    image: string;
    recipe: string;
    isPublished: boolean;
    ingredients: Ingredient[];
}