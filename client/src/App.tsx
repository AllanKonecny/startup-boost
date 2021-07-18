import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import './App.scss';
import history from "services/history.service";
import AppRouter from "router/router";
import HttpService from 'services/http.service';

function App() {
    const httpService = new HttpService();
    httpService.initInterceptors();

    return (
        <BrowserRouter>
            <Router history={history}>
                <div className="App">
                    <AppRouter />
                </div>
            </Router>
        </BrowserRouter>
    );
}

export default App;
