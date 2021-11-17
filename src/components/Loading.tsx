import React from "react";
import { Grid, Loader } from "semantic-ui-react";

export const Loading = () => (
  <Grid.Column style={{ maxWidth: 450, textAlign: "left", margin: "20px 0" }}>
    <Loader active>Loading</Loader>
  </Grid.Column>
);
