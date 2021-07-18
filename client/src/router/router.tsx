import { Redirect, Route, Switch } from 'react-router-dom';
import BoostPage from "pages/boost/boost.page";
import LoginPage from "pages/login/login.page";

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
        </Switch>
    )
}

export default AppRouter;
