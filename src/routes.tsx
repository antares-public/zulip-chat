import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};
