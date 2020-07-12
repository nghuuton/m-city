import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <Route
            component={(props) => {
                return user ? (
                    <Comp {...props} user={user} />
                ) : (
                    <Redirect to="sign-in" />
                );
            }}
            {...rest}
        />
    );
};

export default PrivateRoutes;
