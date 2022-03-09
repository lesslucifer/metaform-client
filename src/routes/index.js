import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./router";
import Header from "../component/header";

const AppRouter = () => {
    return (
        <Switch>
            {routes.map((props, index) => {
                const { component: Component } = props;
                return (
                    <Route
                        key={index}
                        exact={props.exact}
                        path={props.path}
                        render={(props) => (
                            <Header>
                                <Component {...props} />
                            </Header>
                        )}
                    />
                );
            })}
        </Switch>
    );
};

export default AppRouter;
