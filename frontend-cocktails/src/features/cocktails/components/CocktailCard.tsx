import React, {useState} from 'react';
import {Box, CardMedia, Grid, Rating, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import {rateCocktail} from '../cocktailsThunks';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import {getAverage} from '../../../helpers';
import {LoadingButton} from '@mui/lab';
import {selectUser} from '../../users/usersSlice';
import {selectSendRatingLoading} from '../cocktailsSlice';
import {CocktailId} from '../../../types';

interface Props {
    item: CocktailId;
}

const CocktailCard: React.FC<Props> = ({item}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectSendRatingLoading);
    let number = null;

    if (user) {
        const result = item.rate.find(e => e.user_id === user._id);
        number = result ? result.grade : null;
    }

    const [rate, setRate] = useState<number | null>(number);

    const onRateCocktail = async () => {
        if (user) {
            if (rate) {
                await dispatch(rateCocktail({cocktailId: item._id, grade: rate,}));
            }
        } else {
            alert('You have to Sign up or Sign in');
        }
    }

    const averageRating = getAverage(item.rate);

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
                        <Grid item xs sx={{ml: 2}}>
                            <Typography variant='h6' color='red'>
                                Rating: {averageRating}
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
            <Grid container mt={1} alignItems='center' spacing={2}>
                <Grid item>
                    <Typography component='div' variant='h5'>
                        Rate:
                    </Typography>
                </Grid>
                <Grid item>
                    <Rating
                        name="simple-controlled"
                        value={rate}
                        onChange={(event, newValue) => {
                            setRate(newValue);
                        }}
                    />
                </Grid>
                <Grid item>
                    <LoadingButton
                        type='button'
                        color='secondary'
                        loading={loading}
                        onClick={onRateCocktail}
                    >
                        Send
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CocktailCard;