import {createSlice} from '@reduxjs/toolkit';
import {fetchCocktails} from './cocktailsThunks';
import {RootState} from '../../app/store';
import {CocktailApi} from '../../types';

interface CocktailsState {
    cocktails: CocktailApi[];
    fetchLoading: boolean;
}

const initialState: CocktailsState = {
    cocktails: [],
    fetchLoading: false,
}

export const cocktailsSlice = createSlice({
    name: 'cocktails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCocktails.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCocktails.fulfilled, (state, {payload: cocktails}) => {
            state.fetchLoading = false;
            state.cocktails = cocktails;
        });
        builder.addCase(fetchCocktails.rejected, (state) => {
            state.fetchLoading = false;
        });
    },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCocktailsFetching = (state: RootState) => state.cocktails.fetchLoading;