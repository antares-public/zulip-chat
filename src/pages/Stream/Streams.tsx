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
    const client = await zulipInit(config);
    const data = await client.streams.retrieve();
    setStreams(data.streams);
  };

  useEffect(() => {
    hadlerFetchStreams();
  }, []);

  if (!streams.length) <Loading />;

  return (
    <Grid.Column style={{ maxWidth: 450, margin: "20px 0" }}>
      <Comment.Group>
        <h1>Group</h1>
        {streams.map((s: IStream) => (
          <StreamItem key={s.stream_id} stream={s} />
        ))}
        <Link to="home">
          <Button content="Home" secondary />
        </Link>
      </Comment.Group>
    </Grid.Column>
  );
};
