import React from "react";
import { Link } from "react-router-dom";
import { List } from "semantic-ui-react";
import { IUser } from "../interfaces";

export const StreamItem: React.FC<{ stream: IUser }> = ({ stream }) => (
  <List>
    <List.Item style={{ textAlign: "left", margin: 30 }}>
      <List.Header>
        <Link to={`/stream${stream.stream_id}`}>{stream.name}</Link>
      </List.Header>
      <List.Description style={{ cursor: "default" }}>
        {stream.description}
      </List.Description>
    </List.Item>
  </List>
);
