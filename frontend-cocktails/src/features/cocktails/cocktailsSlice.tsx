import {createSlice} from '@reduxjs/toolkit';
import {
    createCocktail,
    deleteCocktail,
    fetchCocktails,
    fetchMyCocktails,
    fetchOneCocktail,
    publishCocktail, rateCocktail
} from './cocktailsThunks';
import {RootState} from '../../app/store';
import {CocktailApi, CocktailId, ValidationError} from '../../types';

interface CocktailsState {
    cocktails: CocktailApi[];
    fetchLoading: boolean;
    oneCocktail: CocktailId | null;
    fetchOneCocktail: boolean;
    myCocktails: CocktailApi[];
    fetchMyCocktails: boolean;
    deleteCocktailLoading: string | false;
    publishCocktailLoading: string | false;
    createCocktailError: ValidationError | null;
    createCocktailLoading: boolean;
    sendRatingLoading: boolean;
}

const initialState: CocktailsState = {
    cocktails: [],
    fetchLoading: false,
    oneCocktail: null,
    fetchOneCocktail: false,
    myCocktails: [],
    fetchMyCocktails: false,
    deleteCocktailLoading: false,
    publishCocktailLoading: false,
    createCocktailError: null,
    createCocktailLoading: false,
    sendRatingLoading: false,
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
        builder.addCase(fetchMyCocktails.pending, (state) => {
            state.myCocktails = [];
            state.fetchMyCocktails = true;
        });
        builder.addCase(fetchMyCocktails.fulfilled, (state, {payload: cocktails}) => {
            state.fetchMyCocktails = false;
            state.myCocktails = cocktails;
        });
        builder.addCase(fetchMyCocktails.rejected, (state) => {
            state.fetchMyCocktails = false;
        });
        builder.addCase(deleteCocktail.pending, (state, {meta}) => {
            state.deleteCocktailLoading = meta.arg;
        });
        builder.addCase(deleteCocktail.fulfilled, (state) => {
            state.deleteCocktailLoading = false;
        });
        builder.addCase(deleteCocktail.rejected, (state) => {
            state.deleteCocktailLoading = false;
        });
        builder.addCase(publishCocktail.pending, (state, {meta}) => {
            state.publishCocktailLoading = meta.arg;
        });
        builder.addCase(publishCocktail.fulfilled, (state) => {
            state.publishCocktailLoading = false;
        });
        builder.addCase(publishCocktail.rejected, (state) => {
            state.publishCocktailLoading = false;
        });
        builder.addCase(createCocktail.pending, (state) => {
           state.createCocktailError = null;
           state.createCocktailLoading = true;
        });
        builder.addCase(createCocktail.fulfilled, (state) => {
            state.createCocktailLoading = false;
        });
        builder.addCase(createCocktail.rejected, (state, {payload: error}) => {
            state.createCocktailLoading = false;
            state.createCocktailError = error || null;
        });
        builder.addCase(rateCocktail.pending, (state) => {
            state.sendRatingLoading = true;
        });
        builder.addCase(rateCocktail.fulfilled, (state) => {
            state.sendRatingLoading = false;
        });
        builder.addCase(rateCocktail.rejected, (state) => {
            state.sendRatingLoading = false;
        });
    },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCocktailsFetching = (state: RootState) => state.cocktails.fetchLoading;
export const selectOneCocktail = (state: RootState) => state.cocktails.oneCocktail;
export const selectOneCocktailFetching = (state: RootState) => state.cocktails.fetchOneCocktail;
export const selectMyCocktails = (state: RootState) => state.cocktails.myCocktails;
export const selectMyCocktailsFetching = (state: RootState) => state.cocktails.fetchMyCocktails;
export const selectDeleteCocktailLoading = (state: RootState) => state.cocktails.deleteCocktailLoading;
export const selectPublishCocktailLoading = (state: RootState) => state.cocktails.publishCocktailLoading;
export const selectCreateCocktailError = (state: RootState) => state.cocktails.createCocktailError;
export const selectCreateCocktailLoading = (state: RootState) => state.cocktails.createCocktailLoading;
export const selectSendRatingLoading = (state: RootState) => state.cocktails.sendRatingLoading;