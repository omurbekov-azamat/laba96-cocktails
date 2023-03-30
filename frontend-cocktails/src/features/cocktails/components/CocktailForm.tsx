import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from '@mui/material';
import {useAppSelector} from '../../../app/hook';
import {selectUser} from '../../users/usersSlice';
import FileInput from '../../../components/UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import {CocktailMutation} from '../../../types';

const CocktailForm = () => {
    const user = useAppSelector(selectUser);
    const [state, setState] = useState<CocktailMutation>({
        user: user ? user._id : '',
        name: '',
        image: null,
        recipe: '',
        ingredients: [],
    });

    const onAddIngredient = () => {
        setState(prev => ({...prev, ingredients: [...prev.ingredients, {name: '', amount: ''}]}));
    };

    const onRemoveIngredient = (index: number) => {
        const ingredients = [...state.ingredients];
        ingredients.splice(index, 1);
        setState(prev => ({...prev, ingredients}));
    };

    const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const ingredientCopy = {...state.ingredients[index]};
        ingredientCopy['amount'] = event.target.value;

        const ingredientsCopy = [...state.ingredients];
        ingredientsCopy[index] = ingredientCopy;

        setState(prev => ({...prev, ingredients: ingredientsCopy}));
    };

    const ingredientNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const ingredientCopy = {...state.ingredients[index]};
        ingredientCopy['name'] = event.target.value;

        const ingredientsCopy = [...state.ingredients];
        ingredientsCopy[index] = ingredientCopy;

        setState(prev => ({...prev, ingredients: ingredientsCopy}));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setState(prevState => ({
            ...prevState, [name]: files && files[0] ? files[0] : null,
        }));
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(state);
    };

    return (
        <form onSubmit={submitFormHandler}>
            <Grid container direction='column' spacing={2}>
                <Grid item xs>
                    <Typography variant='h5'>
                        Add Cocktail
                    </Typography>
                </Grid>
                <Grid item xs>
                    <TextField
                        id='name' label='Name'
                        name='name'
                        value={state.name}
                        onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid item xs>
                    <Button onClick={onAddIngredient} variant='outlined' color='success'>Add ingredients</Button>
                    {state.ingredients.map((ingredient, index) => (
                        <Grid container key={index} spacing={2} sx={{mt: 1}} alignItems='center'>
                            <Grid item>
                                <TextField
                                    id='name' label='Ingredient name'
                                    name='name'
                                    value={ingredient.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => ingredientNameChangeHandler(e, index)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id='amount' label='amount'
                                    name='amount'
                                    value={ingredient.amount}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => amountChangeHandler(e, index)}
                                />
                            </Grid>
                            <Grid item>
                                <Button onClick={() => onRemoveIngredient(index)}><DeleteIcon/></Button>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs>
                    <TextField
                        id='recipe' label='Recipe'
                        name='recipe'
                        value={state.recipe}
                        onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        onChange={fileInputChangeHandler}
                        name='image'
                        label='Image'
                        type='image/*'
                    />
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='warning'
                        variant='outlined'
                    >
                        Create
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default CocktailForm;