import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import zulip from "zulip-js";

export const App = () => {
  const [login, setLogin] = useState({
    realm: "https://adevi-testing.zulipchat.com",
    username: "maria.b.2021.06@gmail.com",
    password: "zmarix617820",
  });

  const handleSubmit = async () => {
    const z = await zulip(login);
    if (z.config.username && z.config.apiKey) {
      console.log(z.config.username, z.config.apiKey);
    }
  };

  const handleChange = (e: any, { name, value }: any) => {
    setLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" /> Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="clipboard"
              iconPosition="left"
              placeholder="Realm"
              name="realm"
              value={login.realm}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              name="email"
              value={login.username}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              name="password"
              value={login.password}
              onChange={handleChange}
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="*">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
