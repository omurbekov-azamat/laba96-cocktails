import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Cocktails from './containers/Cocktails';
import Cocktail from './containers/Cocktail';
import MyCocktails from './containers/MyCocktails';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Cocktails/>}/>
                <Route path='/cocktails' element={<Cocktails/>}/>
                <Route path='/cocktails/:id' element={<Cocktail/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/my-cocktails' element={<MyCocktails/>}/>
            </Route>
            <Route path='*' element={(<h1>Not found!</h1>)}/>
        </Routes>
    );
}

export default App;
