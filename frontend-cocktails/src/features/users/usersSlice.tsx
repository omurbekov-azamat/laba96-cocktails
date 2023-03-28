import {User} from '../../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';


interface UsersState {
    user: User | null;
}

const initialState: UsersState = {
    user: null,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
});

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
