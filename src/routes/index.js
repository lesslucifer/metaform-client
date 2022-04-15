import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import routes from "./router";

const AppRouter = () => {
    return (
        <Switch>
            {routes.map((props, index) => {
                const { component: Component } = props
                const Header = props.header ?? Fragment
                return (
                    <Route
                        key={index}
                        exact={props.exact}
                        path={props.path}
                        render={(rprops) => (
                            <Header>
                                <Component {...rprops} {...props.props} />
                            </Header>
                        )}
                    />
                );
            })}
        </Switch>
    );
};

export default AppRouter;
