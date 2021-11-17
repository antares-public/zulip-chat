import React from "react";
import { IMessageZulip } from "../../interfaces";
import { config } from "../../constants/config";
import { Button, Form, Grid, Comment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { MessageItem } from "../../components/MessageItem";

export const Stream: React.FC<any> = ({
  handleSend,
  stream,
  messages,
  message,
  setMessage,
}) => {
  if (!stream) <h1>Not found</h1>;

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
