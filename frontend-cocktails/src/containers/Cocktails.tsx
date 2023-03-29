import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {selectCocktailsFetching} from '../features/cocktails/cocktailsSlice';
import {fetchCocktails} from '../features/cocktails/cocktailsThunks';
import {Typography} from '@mui/material';
import Spinner from '../components/UI/Spinner/Spinner';

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCocktailsFetching);

    useEffect(() => {
       dispatch(fetchCocktails())
    }, [dispatch]);

    return (
        <>
            <Typography variant="h5" component="div" sx={{mb: 5, fontSize: 50}}>
                Cocktails
            </Typography>
            {loading && <Spinner/>}
        </>
    );
};

export default Cocktails;