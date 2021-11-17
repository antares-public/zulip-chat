import React from "react";
import { List, Image } from "semantic-ui-react";
import { IUser } from "../interfaces";

export const UserItem: React.FC<{ user: IUser }> = ({ user }) => (
  <List>
    <List.Item>
      <Image avatar src={user.avatar_url} />
      <List.Content>
        <List.Header as="a">{user.full_name}</List.Header>
        <List.Description>{user.email}</List.Description>
      </List.Content>
    </List.Item>
  </List>
);
