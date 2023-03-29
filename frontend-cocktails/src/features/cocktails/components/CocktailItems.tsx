import React from 'react';
import {Grid} from '@mui/material';
import CocktailItem from './CocktailItem';
import {CocktailApi} from '../../../types';

interface Props {
    items: CocktailApi[]
}

const CocktailItems: React.FC<Props> = ({items}) => {
    return (
        <Grid container spacing={3}>
            {items.map(cocktail => (
                <CocktailItem
                    key={cocktail._id}
                    item={cocktail}
                />
            ))}
        </Grid>
    );
};

export default CocktailItems;