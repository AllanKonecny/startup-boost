import { Redirect, Route, Switch } from 'react-router-dom';
import BoostPage from "pages/boost/boost.page";
import LoginPage from "pages/login/login.page";
import RandomFactPage from "pages/random-fact/random-fact.page";

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/boost" />
            </Route>
            <Route exact path="/login">
                <LoginPage />
            </Route>
            <Route exact path="/boost">
                <BoostPage />
            </Route>
            <Route exact path="/random-fact">
                <RandomFactPage />
            </Route>
        </Switch>
    )
}

export default AppRouter;
