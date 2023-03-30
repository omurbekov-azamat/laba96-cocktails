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

export const deleteCocktail = createAsyncThunk<void, string>(
    'cocktails/deleteCocktail',
    async (id, {dispatch}) => {
        try {
            await axiosApi.delete('/cocktails/' + id);
            await dispatch(fetchCocktails());
        } catch (e) {
            throw e;
        }
    }
);

export const publishCocktail = createAsyncThunk<void, string>(
    'cocktails/publishCocktail',
    async (id, {dispatch}) => {
        try {
            await axiosApi.patch('/cocktails/' + id + '/togglePublished');
            await dispatch(fetchCocktails());
        } catch (e) {
            throw e;
        }
    }
);