/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Button, Comment, Form, Grid } from "semantic-ui-react";
import { Message } from "./Message";
import zulipInit from "zulip-js";
import { IMessageZulip } from "../interfaces";

const config = {
  username: process.env.REACT_APP_EMAIL,
  apiKey: process.env.REACT_APP_KEY,
  realm: process.env.REACT_APP_REALM,
};

export const Chat = () => {
  const [messages, setMessages] = useState<Array<IMessageZulip>>([]);
  const [message, setMessage] = useState<IMessageZulip["content"]>("");

  const hadlerFetchMessages = async () => {
    const client = await zulipInit(config);

    const readParams = {
      anchor: "newest",
      num_before: 100,
      num_after: 0,
      narrow: [{ operator: "pm-with", operand: [8, 21] }],
    };

    const data = await client.messages.retrieve(readParams);
    setMessages(data.messages);
  };

  const handleSend = useCallback(async () => {
    const client = await zulipInit(config);

    const params = {
      to: [21],
      type: "private",
      content: message,
    };
    await client.messages.send(params);
  }, [messages]);

  useEffect(() => {
    hadlerFetchMessages();
  }, [handleSend]);

  if (!messages.length) {
    return <p>Loading... </p>;
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 800, textAlign: "left", margin: "40px 0" }}>
        <Comment.Group>
          {messages.map((m: IMessageZulip) => (
            <Message key={m.id} message={m} />
          ))}
        </Comment.Group>

        <Form reply>
          <Form.TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={handleSend}
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Grid.Column>
    </Grid>
  );
};
