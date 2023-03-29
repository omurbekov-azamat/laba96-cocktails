import {createSlice} from '@reduxjs/toolkit';
import {fetchCocktails, fetchOneCocktail} from './cocktailsThunks';
import {RootState} from '../../app/store';
import {CocktailApi, CocktailId} from '../../types';

interface CocktailsState {
    cocktails: CocktailApi[];
    fetchLoading: boolean;
    oneCocktail: CocktailId | null;
    fetchOneCocktail: boolean;
}

const initialState: CocktailsState = {
    cocktails: [],
    fetchLoading: false,
    oneCocktail: null,
    fetchOneCocktail: false,
}

export const cocktailsSlice = createSlice({
    name: 'cocktails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCocktails.pending, (state) => {
            state.cocktails = [];
            state.fetchLoading = true;
        });
        builder.addCase(fetchCocktails.fulfilled, (state, {payload: cocktails}) => {
            state.fetchLoading = false;
            state.cocktails = cocktails;
        });
        builder.addCase(fetchCocktails.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(fetchOneCocktail.pending, (state) => {
            state.oneCocktail = null;
            state.fetchOneCocktail = true;
        });
        builder.addCase(fetchOneCocktail.fulfilled, (state, {payload: cocktail}) => {
            state.fetchOneCocktail = false;
            state.oneCocktail = cocktail;
        });
        builder.addCase(fetchOneCocktail.rejected, (state) => {
            state.fetchOneCocktail = false;
        });
    },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCocktailsFetching = (state: RootState) => state.cocktails.fetchLoading;
export const selectOneCocktail = (state: RootState) => state.cocktails.oneCocktail;
export const selectOneCocktailFetching = (state: RootState) => state.cocktails.fetchOneCocktail;