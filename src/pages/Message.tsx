import React from "react";
import { Comment } from "semantic-ui-react";
import { IMessageZulip } from "../interfaces";

export const Message: React.FC<{ message: IMessageZulip }> = ({ message }) => {
  return (
    <Comment>
      <Comment.Avatar as="a" src={message.avatar_url} />
      <Comment.Content>
        <Comment.Author>{message.sender_full_name}</Comment.Author>
        <Comment.Text>
          <div dangerouslySetInnerHTML={{ __html: message.content }} />
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
};
