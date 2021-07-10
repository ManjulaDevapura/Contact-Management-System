import { rootReducer } from '../reducer/reducer';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

if (process.env.NODE_ENV === 'development') {
    console.log('development');
}

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)
     , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);