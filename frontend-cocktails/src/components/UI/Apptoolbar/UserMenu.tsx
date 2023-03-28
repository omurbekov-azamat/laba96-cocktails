import React, { useState } from 'react';
import {logout} from '../../../features/users/userThunks';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import {selectLogoutLoading} from '../../../features/users/usersSlice';
import {apiURL} from '../../../constants';
import {Avatar, Button, Grid, Menu, MenuItem} from '@mui/material';
import {User} from '../../../types';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLogoutLoading);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
    };

    return (
        <>
            <Grid container>
                <Grid item>
                    <Avatar alt={user.displayName} src={apiURL + '/' + user.avatar}/>
                </Grid>
                <Grid item>
                    <Button
                        onClick={handleClick}
                        color="inherit"
                    >
                        Hello, {user.displayName}
                    </Button>
                </Grid>
            </Grid>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout} disabled={loading}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;