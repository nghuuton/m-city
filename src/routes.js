import React from "react";
import Layout from "./Hoc/Layout";
import { Switch } from "react-router-dom";

import PrivateRoute from "./Components/authRoutes/privateRoutes";
import PublicRoute from "./Components/authRoutes/publicRoutes";

import Home from "./Components/home";
import SignIn from "./Components/signin";
import Dashboard from "./Components/admin/Dashboard";
import AdminMatches from "./Components/admin/matches";

const Routes = (props) => {
    return (
        <Layout>
            <Switch>
                <PrivateRoute
                    {...props}
                    path="/dashboard"
                    exact
                    component={Dashboard}
                />
                <PrivateRoute
                    {...props}
                    path="/admin-matches"
                    exact
                    component={AdminMatches}
                />
                <PublicRoute
                    {...props}
                    restricted={false}
                    path="/"
                    exact
                    component={Home}
                />
                <PublicRoute
                    {...props}
                    restricted={true}
                    path="/sign-in"
                    exact
                    component={SignIn}
                />
            </Switch>
        </Layout>
    );
};

export default Routes;
