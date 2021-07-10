import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import App from './client/App';
import * as serviceWorker from './client/serviceWorker';
import { store } from '../src/client/store/store';

import '@fortawesome/fontawesome-free/css/all.min.css';
import "./client/css/sb-admin.css";
import './client/css/custom.css';

import 'bootstrap';
import './client/js/sb-admin.js';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <App />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

store.subscribe(() => {
    console.log('store changed', store.getState());
})
