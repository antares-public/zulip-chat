/* eslint-disable jsx-a11y/anchor-is-valid */
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
import zulipInit from "zulip-js";

const config = {
  username: process.env.REACT_APP_EMAIL,
  apiKey: process.env.REACT_APP_KEY,
  realm: process.env.REACT_APP_REALM,
};

export const Register = () => {
  const [login, setLogin] = useState({
    email: "rainbwodeity69@icloud.ru",
    password: "temp",
    full_name: "New User",
    short_name: "newbie",
  });

  const handleSignIn = async () => {
    const client = await zulipInit(config);
    // Register a queue
    const params = {
      event_types: ["message"],
    };

    console.log(await client.queues.register(params));
    console.log(await client.users.me.getProfile());
    console.log(await client.users.create(login));
  };

  const handleChange = (e: any, { name, value }: any) => {
    setLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" /> Sign Up to your account
        </Header>
        <Form size="large" onSubmit={handleSignIn}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="clipboard"
              iconPosition="left"
              placeholder="Realm"
              name="realm"
              value={login.full_name}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              name="email"
              value={login.email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              type="password"
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
          Already have an account? <Link to="/login">Sign In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
