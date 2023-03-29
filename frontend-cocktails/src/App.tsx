import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Cocktails from './containers/Cocktails';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Cocktails/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
            </Route>
            <Route path='*' element={(<h1>Not found!</h1>)}/>
        </Routes>
    );
}

export default App;
