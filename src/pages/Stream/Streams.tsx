/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Comment, Grid } from "semantic-ui-react";
import zulipInit from "zulip-js";
import { Loading } from "../../components/Loading";
import { StreamItem } from "../../components/StreamItem";
import { config } from "../../constants/config";
import { IStream } from "../../interfaces";

export const Streams = () => {
  const [streams, setStreams] = useState<Array<IStream>>([]);

  const hadlerFetchStreams = async () => {
    try {
      const client = await zulipInit(config);
      const data = await client.streams.retrieve();
      setStreams(data.streams);
    } catch (e) {
      return e;
    }
  };

  const handleCreate = async () => {
    try {
      const client = await zulipInit(config);
      const meParams = {
        subscriptions: JSON.stringify([{ name: "A Project 2" }]),
      };
      await client.users.me.subscriptions.add(meParams);
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    hadlerFetchStreams();
  }, [handleCreate]);

  if (!streams.length) {
    return <Loading />;
  }

  return (
    <Grid.Column style={{ maxWidth: 450, margin: "20px 0" }}>
      <Comment.Group>
        <h1>Streams</h1>
        {streams.map((s: IStream) => (
          <StreamItem key={s.stream_id} stream={s} />
        ))}
        <Link to="home">
          <Button content="Home" secondary />
        </Link>
        <Button
          content="Create"
          onClick={handleCreate}
          labelPosition="right"
          icon="edit"
          primary
        />
      </Comment.Group>
    </Grid.Column>
  );
};
