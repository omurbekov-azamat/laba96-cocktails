import React, {useEffect} from 'react';
import {Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {selectMyCocktails, selectMyCocktailsFetching} from '../features/cocktails/cocktailsSlice';
import {selectUser} from '../features/users/usersSlice';
import {fetchMyCocktails} from '../features/cocktails/cocktailsThunks';
import CocktailItems from '../features/cocktails/components/CocktailItems';
import Spinner from '../components/UI/Spinner/Spinner';

const MyCocktails = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const cocktails = useAppSelector(selectMyCocktails);
    const loading = useAppSelector(selectMyCocktailsFetching);

    useEffect(() => {
        if (user) {
            dispatch(fetchMyCocktails(user._id));
        }
    },[dispatch, user]);


    return (
        <>
            <Typography variant="h5" component="div" sx={{mb: 5, fontSize: 50}}>
                My Cocktails
            </Typography>
            {loading && <Spinner/>}
            <CocktailItems items={cocktails}/>
        </>
    );
};

export default MyCocktails;