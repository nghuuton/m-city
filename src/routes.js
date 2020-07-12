import React from "react";
import Layout from "./Hoc/Layout";
import { Switch, Route } from "react-router-dom";

import Home from "./Components/home";
import SignIn from "./Components/signin";

const Routes = (props) => {
    return (
        <Layout>
            <Switch>
                <Route exact component={Home} path="/" />
                <Route exact component={SignIn} path="/sign-in" />
            </Switch>
        </Layout>
    );
};

export default Routes;
