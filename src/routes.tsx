import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Chat } from "./pages/Chat";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Streams } from "./pages/Stream/Streams";
import { Register } from "./pages/Register";
import Users from "./pages/Users";
import { StreamContainer } from "./pages/Stream/StreamContainer";

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
      <Route path="/streams" exact>
        <Streams />
      </Route>
      <Route path="/streams:id">
        <StreamContainer />
      </Route>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Redirect to="/home" />
    </Switch>
  );
};
