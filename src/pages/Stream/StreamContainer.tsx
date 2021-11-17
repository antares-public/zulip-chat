import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { IStream } from "../../interfaces";
import zulipInit from "zulip-js";
import { config } from "../../constants/config";
import { Loading } from "../../components/Loading";
import { Stream } from "./Stream";

export const StreamContainer = () => {
  const [stream, setStream] = useState<IStream>();
  const { id } = useParams<{ id: string }>();

  const handleGetStream = useCallback(async () => {
    const client = await zulipInit(config);
    const { streams } = await client.streams.retrieve();
    setStream(streams.find((d: IStream) => Number(id) === d.stream_id));
  }, [id]);

  useEffect(() => {
    handleGetStream();
  }, [handleGetStream]);

  if (!stream) {
    return <Loading />;
  }

  return (
    <Stream
      stream={stream}
      id={id}
      // handleSend={handleSend}
      // setMessage={setMessage}
      // messages={messages}
      // message={message}
    />
  );
};
