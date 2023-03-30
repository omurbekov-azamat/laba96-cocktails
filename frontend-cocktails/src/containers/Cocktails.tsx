import React, {useEffect} from 'react';
import {fetchCocktails} from '../features/cocktails/cocktailsThunks';
import {selectCocktails, selectCocktailsFetching,} from '../features/cocktails/cocktailsSlice';
import CocktailItems from '../features/cocktails/components/CocktailItems';
import {useAppDispatch, useAppSelector} from '../app/hook';
import Spinner from '../components/UI/Spinner/Spinner';
import {Typography} from '@mui/material';

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const loading = useAppSelector(selectCocktailsFetching);

    useEffect(() => {
       dispatch(fetchCocktails());
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