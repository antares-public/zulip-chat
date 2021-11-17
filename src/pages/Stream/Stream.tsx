import React, { useCallback, useEffect, useState } from "react";
import { IMessageZulip, IStream } from "../../interfaces";
import { config } from "../../constants/config";
import { Button, Form, Grid, Comment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { MessageItem } from "../../components/MessageItem";
import zulipInit from "zulip-js";
import { Loading } from "../../components/Loading";

export const Stream: React.FC<any> = ({ stream, id }) => {
  const [message, setMessage] = useState<IMessageZulip["content"]>("");
  const [messages, setMessages] = useState<IStream>([]);

  const hadlerFetchMessages = useCallback(async () => {
    const client = await zulipInit(config);

    const readParams = {
      anchor: "newest",
      num_before: 5,
      num_after: 0,
      narrow: [{ operator: "stream", operand: stream.name }],
    };
    const { messages } = await client.messages.retrieve(readParams);
    setMessages(messages);
  }, [stream.name]);

  const handleSend = async () => {
    const client = await zulipInit(config);
    const params = {
      to: stream.name,
      type: "stream",
      topic: "Castle",
      content: message,
    };
    await client.messages.send(params);
    setMessage("");
  };

  useEffect(() => {
    hadlerFetchMessages();
  }, [hadlerFetchMessages]);

  if (!messages.length) {
    return <Loading />;
  }

  return (
    <Grid.Column style={{ maxWidth: 600, margin: "20px 0" }}>
      <Comment.Group>
        <h1>{stream.name}</h1>
        {messages.map((m: IMessageZulip) => (
          <MessageItem
            key={m.id}
            message={m}
            side={config.username === m.sender_email ? "right" : "left"}
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
          <Link to="/streams">
            <Button content="Back" primary />
          </Link>
          <Link to="/home">
            <Button content="Home" secondary />
          </Link>
        </Form>
      </Comment.Group>
    </Grid.Column>
  );
};
