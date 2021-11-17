import React, { useCallback, useEffect, useState } from "react";
import { Button, Comment, Form, Grid } from "semantic-ui-react";
import { MessageItem } from "../components/MessageItem";
import { IMessageZulip } from "../interfaces";
import { Link } from "react-router-dom";
import { config } from "../constants/config";
import { Loading } from "../components/Loading";
import zulipInit from "zulip-js";

export const Chat = () => {
  const [messages, setMessages] = useState<Array<IMessageZulip>>([]);
  const [message, setMessage] = useState<IMessageZulip["content"]>("");

  // getting a list of active users
  const hadlerFetchMessages = async () => {
    const client = await zulipInit(config);

    const readParams = {
      anchor: "newest",
      num_before: 5,
      num_after: 0,
      narrow: [{ operator: "pm-with", operand: [8, 21] }],
    };

    const data = await client.messages.retrieve(readParams);
    setMessages(data.messages);
  };

  // sending a message
  const handleSend = useCallback(async () => {
    const client = await zulipInit(config);
    const params = {
      to: [21],
      type: "private",
      content: message,
    };
    await client.messages.send(params);
    setMessage("");
  }, [message]);

  useEffect(() => {
    hadlerFetchMessages();
  }, [handleSend]);

  if (!messages.length) <Loading />;

  return (
    <Grid.Column style={{ maxWidth: 600, margin: "20px 0" }}>
      <Comment.Group>
        <h1>Chat</h1>
        {messages.map((m: IMessageZulip) => (
          <MessageItem
            key={m.id}
            message={m}
            side={
              m.display_recipient[1].full_name === m.sender_full_name
                ? "right"
                : "left"
            }
          />
        ))}

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
          <Link to="/home">
            <Button content="Home" secondary />
          </Link>
        </Form>
      </Comment.Group>
    </Grid.Column>
  );
};
