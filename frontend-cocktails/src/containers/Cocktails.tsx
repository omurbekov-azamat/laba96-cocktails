import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {selectCocktails, selectCocktailsFetching} from '../features/cocktails/cocktailsSlice';
import {fetchCocktails} from '../features/cocktails/cocktailsThunks';
import {Typography} from '@mui/material';
import Spinner from '../components/UI/Spinner/Spinner';
import CocktailItems from '../features/cocktails/components/CocktailItems';

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
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
            <CocktailItems items={cocktails}/>
        </>
    );
};

export default Cocktails;