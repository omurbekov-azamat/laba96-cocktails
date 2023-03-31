import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {selectCreateCocktailError, selectCreateCocktailLoading} from '../cocktailsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import {createCocktail} from '../cocktailsThunks';
import {selectUser} from '../../users/usersSlice';
import {Button, Grid, TextField, Typography} from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import {enqueueSnackbar, SnackbarProvider} from 'notistack';
import {CocktailMutation} from '../../../types';

const CocktailForm = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectCreateCocktailLoading);
    const error = useAppSelector(selectCreateCocktailError);
    const navigate = useNavigate();

    const [state, setState] = useState<CocktailMutation>({
        user: user ? user._id : '',
        name: '',
        image: null,
        recipe: '',
        ingredients: [{name: '', amount: ''}],
    });

    const onAddIngredient = () => {
        setState(prev => ({...prev, ingredients: [...prev.ingredients, {name: '', amount: ''}]}));
    };

    const onRemoveIngredient = (index: number) => {
        if (state.ingredients.length > 1) {
            const ingredients = [...state.ingredients];
            ingredients.splice(index, 1);
            setState(prev => ({...prev, ingredients}));
        }
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

    const moveToMyCocktails = () => {
        navigate('/my-cocktails');
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(createCocktail(state)).unwrap();
        setState({
            user: user ? user._id : '',
            name: '',
            image: null,
            recipe: '',
            ingredients: [{name: '', amount: ''}],
        });
        await enqueueSnackbar('You have created cocktail successfully', {variant: 'success'});
        setTimeout(moveToMyCocktails, 2000);
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form onSubmit={submitFormHandler}>
            <SnackbarProvider/>
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
                        error={Boolean(getFieldError('name'))}
                        helperText={getFieldError('name')}
                        required
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
                                    error={Boolean(getFieldError('ingredients.0.name'))}
                                    helperText={getFieldError('ingredients.0.name')}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => ingredientNameChangeHandler(e, index)}
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id='amount' label='amount'
                                    name='amount'
                                    value={ingredient.amount}
                                    error={Boolean(getFieldError('ingredients.0.amount'))}
                                    helperText={getFieldError('ingredients.0.amount')}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => amountChangeHandler(e, index)}
                                    required
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
                        error={Boolean(getFieldError('recipe'))}
                        helperText={getFieldError('recipe')}
                        required
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        onChange={fileInputChangeHandler}
                        name='image'
                        label='Image'
                        type='image/*'
                        error={error}
                    />
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='warning'
                        variant='outlined'
                        loading={loading}
                    >
                        Create
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default CocktailForm;