import React from "react";
import { useRoutes } from "./routes";
import { Grid } from "semantic-ui-react";

export const App = () => {
  const routes = useRoutes();
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      {routes}
    </Grid>
  );
};
