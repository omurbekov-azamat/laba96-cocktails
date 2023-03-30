import React from 'react';
import {Grid, Typography} from '@mui/material';
import CocktailItem from './CocktailItem';
import {CocktailApi} from '../../../types';

interface Props {
    items: CocktailApi[];
}

const CocktailItems: React.FC<Props> = ({items}) => {

    if (items.length === 0) {
        return (
            <Typography component='div' variant='h6' color='red'>
                There are no cocktails yet.
            </Typography>
        )
    }

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