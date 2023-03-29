import React from 'react';
import {Box, CardMedia, Grid, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import {CocktailId} from '../../../types';

interface Props {
    item: CocktailId;
}

const CocktailCard: React.FC<Props> = ({item}) => {
    return (
        <Box>
            <Grid container>
                <Grid item xs>
                    <CardMedia
                        component="img"
                        height='auto'
                        image={apiURL + '/' + item.image}
                        alt={item.name}
                    />
                </Grid>
                <Grid item xs>
                    <Grid container direction='column' spacing={2}>
                        <Grid item xs sx={{m: 2, textTransform: 'uppercase'}}>
                            <Typography variant='h5' component='div' color='royalblue'>
                                {item.name}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography component='ul' variant='h6' color='green'>
                                Ingredients:
                                {item.ingredients.map(ingredient => (
                                    <Typography
                                        key={ingredient._id}
                                        component='li'
                                    >
                                        {ingredient.name} - {ingredient.amount}
                                    </Typography>
                                ))}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Typography component='div' variant='h5' sx={{mt: 5, mb: 1}}>
                Recipe:
            </Typography>
            <Typography>
                {item.recipe}
            </Typography>
        </Box>
    );
};

export default CocktailCard;