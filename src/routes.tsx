import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Chat } from "./pages/Chat";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Users from "./pages/Users";

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>
      <Route path="/chat" exact>
        <Chat />
      </Route>
      <Route path="/users" exact>
        <Users />
      </Route>
      <Redirect to="/chat" />
    </Switch>
  );
};
