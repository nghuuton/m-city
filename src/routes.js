import React from "react";
import Layout from "./Hoc/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Components/home";

function Routes() {
  return (
    <Layout>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home} />
      </Switch>
    </Layout>
  );
}

export default Routes;
