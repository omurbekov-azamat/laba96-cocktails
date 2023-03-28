import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError} from '../../types';
import {isAxiosError} from 'axios';

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
    'users/register',
    async (registerMutation, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

            keys.forEach((key) => {
                const value = registerMutation[key];

                if (value !== null) {
                    formData.append(key, value);
                }
            });
            const response = await axiosApi.post<RegisterResponse>('/users', formData);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e;
        }
    }
);

export const logout = createAsyncThunk(
    'users/logout',
    async () => {
        await axiosApi.delete('/users/sessions');
    }
);
