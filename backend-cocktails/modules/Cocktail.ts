import {model, Schema, Types} from 'mongoose';
import User from './User';
import {ICocktail} from '../types';

const CocktailSchema = new Schema<ICocktail>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    },
    ingredients: {
        type: [{
            name: String,
            amount: String,
        }],
        required: true,
    }
});

const Cocktail = model<ICocktail>('Cocktail', CocktailSchema);

export default Cocktail;