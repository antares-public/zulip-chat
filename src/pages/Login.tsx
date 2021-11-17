import React, { useState } from "react";
import { Link } from "react-router-dom";
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

export const Login = () => {
  const [login, setLogin] = useState({
    realm: process.env.REACT_APP_REALM,
    apiKey: process.env.REACT_APP_KEY,
    username: process.env.REACT_APP_EMAIL,
    password: process.env.REACT_APP_PASSWORD,
  });

  const handleSignIn = async () => {
    const z = await zulip(login);
    if (z.config.username && z.config.apiKey) {
      console.log(z.config.username, z.config.apiKey);
    }
  };

  const handleChange = (e: any, { name, value }: any) => {
    setLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="/logo.png" /> Sign In to your account
      </Header>
      <Form size="large" onSubmit={handleSignIn}>
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
            type="password"
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
        New to us? <Link to="/register">Sign Up</Link>
      </Message>
      <Link to="home">
        <Button content="Home" secondary />
      </Link>
    </Grid.Column>
  );
};
