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

export interface IngredientMutation {
    name: string;
    amount: string;
}

export interface IngredientApi extends IngredientMutation{
    _id: string;
}

export interface CocktailApi {
    image: string;
    isPublished: boolean;
    name: string;
    _id: string;
}

export interface CocktailId extends CocktailApi {
    recipe: string;
    ingredients: IngredientApi[];
}

export interface CocktailMutation {
    user: string;
    name: string;
    image: File | null;
    recipe: string;
    ingredients: IngredientMutation[];
}