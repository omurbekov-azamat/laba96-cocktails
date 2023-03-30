import React, {useEffect} from 'react';
import {fetchMyCocktails} from '../features/cocktails/cocktailsThunks';
import {selectUser} from '../features/users/usersSlice';
import {Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {
    selectDeleteCocktailLoading,
    selectMyCocktails,
    selectMyCocktailsFetching,
    selectPublishCocktailLoading
} from '../features/cocktails/cocktailsSlice';
import CocktailItems from '../features/cocktails/components/CocktailItems';
import Spinner from '../components/UI/Spinner/Spinner';

const MyCocktails = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const cocktails = useAppSelector(selectMyCocktails);
    const loading = useAppSelector(selectMyCocktailsFetching);
    const onDelete = useAppSelector(selectDeleteCocktailLoading);
    const onPublish = useAppSelector(selectPublishCocktailLoading);

    useEffect(() => {
        if (user) {
            dispatch(fetchMyCocktails(user._id));
        }
    }, [dispatch, user, onDelete, onPublish]);


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