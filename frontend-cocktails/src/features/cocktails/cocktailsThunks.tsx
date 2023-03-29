import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {CocktailApi, CocktailId} from '../../types';

export const fetchCocktails = createAsyncThunk<CocktailApi[]>(
    'cocktails/fetchAll',
    async () => {
        try {
            const response = await axiosApi.get<CocktailApi[]>('/cocktails');
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const fetchOneCocktail = createAsyncThunk<CocktailId, string>(
    'cocktails/fetchOneCocktails',
    async (id) => {
        try {
            const response = await axiosApi.get<CocktailId>('/cocktails/' + id);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const fetchMyCocktails = createAsyncThunk<CocktailApi[], string>(
    'cocktails/fetchMyCocktails',
    async (id) => {
        try {
            const response = await axiosApi.get<CocktailApi[]>('/cocktails?author=' + id);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);