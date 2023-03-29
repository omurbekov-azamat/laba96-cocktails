import React from 'react';
import {NavLink} from "react-router-dom";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import {LoadingButton} from '@mui/lab';
import {useAppSelector} from '../../../app/hook';
import {selectUser} from '../../users/usersSlice';
import {CocktailApi} from '../../../types';

interface Props {
    item: CocktailApi;
}

const CocktailItem: React.FC<Props> = ({item}) => {
    const user = useAppSelector(selectUser);

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
                                <Typography variant='h6' component='div'>
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
                                >
                                    delete
                                </LoadingButton>
                            </Grid>
                            <Grid item>
                                <LoadingButton
                                    type='button'
                                    color='primary'
                                >
                                    Publish
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Card>
        </Grid>
    );
};

export default CocktailItem;