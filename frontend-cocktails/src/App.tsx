import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>

            </Route>
            <Route path='*' element={(<h1>Not found!</h1>)}/>
        </Routes>
    );
}

export default App;
