import {createAsyncThunk} from '@reduxjs/toolkit';
import {CocktailApi} from '../../types';
import axiosApi from '../../axiosApi';

export const fetchCocktails = createAsyncThunk<CocktailApi[]>(
    'cocktails/fetchAll',
    async () => {
        const response = await axiosApi.get<CocktailApi[]>('/cocktails');
        return response.data;
    }
);