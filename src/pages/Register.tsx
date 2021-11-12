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
import { config } from "../constants/config";

export const Register = () => {
  const [login, setLogin] = useState({
    email: "rainbwodeity12@icloud.ru",
    password: "newbie123GHJ",
    full_name: "New User",
    short_name: "temp",
  });

  const handleSignIn = async () => {
    const client = await zulipInit(config);
    console.log(await client.users.create(login));
  };

  const handleChange = (e: any, { name, value }: any) => {
    setLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" /> Sign Up to your account
        </Header>
        <Form size="large" onSubmit={handleSignIn}>
          <Segment stacked>
            <Form.Input
              fluid
              iconPosition="left"
              icon="user"
              placeholder="Full name"
              name="full"
              value={login.full_name}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="clipboard"
              iconPosition="left"
              placeholder="Short name"
              name="short"
              value={login.short_name}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="mail"
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
              Registration
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/login">Sign In</Link>
        </Message>
        <Link to="home"><Button content='Home' secondary /></Link>
      </Grid.Column>
  );
};
