import React from 'react';
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import AppToolbar from '../components/UI/Apptoolbar/Apptolbar';

const Home = () => {
    return (
        <>
            <AppToolbar/>
            <Container maxWidth="lg">
                <Outlet/>
            </Container>
        </>
    );
};

export default Home;