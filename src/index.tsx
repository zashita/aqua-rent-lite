import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import {Provider} from "react-redux";
import {store} from "./app/providers/storeProvider";
import {BrowserRouter} from "react-router-dom";
import './app/styles/index.scss'
import {ErrorBoundary} from "app/providers/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ErrorBoundary>
                <Suspense fallback="">
                        <App />
                </Suspense>
            </ErrorBoundary>
        </Provider>
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
