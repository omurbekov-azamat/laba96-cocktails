import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {selectOneCocktail, selectOneCocktailFetching} from '../features/cocktails/cocktailsSlice';
import CocktailCard from '../features/cocktails/components/CocktailCard';
import {fetchOneCocktail} from '../features/cocktails/cocktailsThunks';
import Spinner from '../components/UI/Spinner/Spinner';

const Cocktail = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams() as {id: string};
    const cocktail = useAppSelector(selectOneCocktail);
    const loading = useAppSelector(selectOneCocktailFetching);

    useEffect(() => {
        dispatch(fetchOneCocktail(id));
    }, [dispatch]);

    return (
        <>
            {loading && <Spinner/>}
            {cocktail && <CocktailCard item={cocktail}/>}
        </>
    );
};

export default Cocktail;