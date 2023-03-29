export interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string;
    token: string;
    role: string;
}

export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    image: File | null;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export type GlobalError = {
    error: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _name: string;
}

export interface IngredientApi {
    name: string;
    amount: string;
    _id: string;
}

export interface CocktailApi {
    _id: string;
    user: string;
    name: string;
    image: string;
    recipe: string;
    isPublished: boolean;
    ingredients: IngredientApi[];
}
