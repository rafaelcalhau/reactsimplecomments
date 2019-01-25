import React from 'react';
import ReactDOM from 'react-dom';
import { auth, database } from './firebase';
import App from './App';
import './Styles.css';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App auth={auth} database={database} />, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
