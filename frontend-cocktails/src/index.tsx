import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {persistor, store} from './app/store';
import {PersistGate} from 'redux-persist/integration/react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import App from './App';
import {GOOGLE_CLIENT_ID} from './constants';
import {addInterceptors} from './axiosApi';

addInterceptors(store);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>
);