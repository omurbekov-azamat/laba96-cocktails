import React from 'react';
import {NavLink} from "react-router-dom";
import {Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {deleteCocktail, publishCocktail} from '../cocktailsThunks';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import {selectUser} from '../../users/usersSlice';
import {LoadingButton} from '@mui/lab';
import {apiURL} from '../../../constants';
import {selectDeleteCocktailLoading, selectPublishCocktailLoading} from '../cocktailsSlice';
import {CocktailApi} from '../../../types';

interface Props {
    item: CocktailApi;
}

const CocktailItem: React.FC<Props> = ({item}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const deleteLoading = useAppSelector(selectDeleteCocktailLoading);
    const publishLoading = useAppSelector(selectPublishCocktailLoading);

    const onDeleteCocktail = async (id: string) => {
        await dispatch(deleteCocktail(id));
    };

    const onPublishCocktail = async (id: string) => {
        await dispatch(publishCocktail(id));
    };

    return (
        <Grid item>
            <Card sx={{width: 300, height: 420}}>
                <CardActionArea component={NavLink} to={'/cocktails/' + item._id}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={apiURL + '/' + item.image}
                        alt={item.name}
                    />
                    <CardContent>
                        <Grid container direction='column'>
                            <Grid item>
                                <Typography variant='h6' component='div' textTransform='capitalize'>
                                    Name: {item.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {!item.isPublished &&
                                    <Typography variant='subtitle2' color='yellowgreen'>Its not published</Typography>
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <Grid item>
                    {user && user.role === 'admin' && !item.isPublished &&
                        <Grid container justifyContent='space-around'>
                            <Grid item>
                                <LoadingButton
                                    type='button'
                                    color='error'
                                    onClick={() => onDeleteCocktail(item._id)}
                                    loading={deleteLoading ? deleteLoading === item._id : false}
                                    disabled={publishLoading ? publishLoading === item._id : false}
                                >
                                    delete
                                </LoadingButton>
                            </Grid>
                            <Grid item>
                                <LoadingButton
                                    type='button'
                                    color='primary'
                                    onClick={() => onPublishCocktail(item._id)}
                                    loading={publishLoading ? publishLoading === item._id : false}
                                    disabled={deleteLoading ? deleteLoading === item._id : false}
                                >
                                    publish
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    }
                    {user && user.role === 'admin' && item.isPublished &&
                        <Box textAlign='center' sx={{mt: 3}}>
                            <LoadingButton
                                type='button'
                                color='error'
                                onClick={() => onDeleteCocktail(item._id)}
                                loading={deleteLoading ? deleteLoading === item._id : false}
                                disabled={publishLoading ? publishLoading === item._id : false}
                            >
                                delete
                            </LoadingButton>
                        </Box>
                    }
                </Grid>
            </Card>
        </Grid>
    );
};

export default CocktailItem;