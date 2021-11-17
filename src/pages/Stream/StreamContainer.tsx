import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { IMessageZulip, IStream } from "../../interfaces";
import zulipInit from "zulip-js";
import { config } from "../../constants/config";
import { Stream } from "./Stream";
import { Loading } from "../../components/Loading";

export const StreamContainer = () => {
  const [stream, setStream] = useState<IStream>();
  const [message, setMessage] = useState<IMessageZulip["content"]>("");
  const [messages, setMessages] = useState<IStream>();
  const { id } = useParams<{ id: string }>();

  const hadlerFetchMessages = useCallback(async () => {
    const client = await zulipInit(config);
    const readParams = {
      anchor: "newest",
      num_before: 5,
      num_after: 0,
      narrow: [{ operator: "stream", operand: "core team" }],
    };
    const { streams } = await client.streams.retrieve();
    const { messages } = await client.messages.retrieve(readParams);
    setMessages(messages);
    setStream(streams.find((d: IStream) => Number(id) === d.stream_id) || null);
  }, [id]);

  const handleSend = useCallback(async () => {
    const client = await zulipInit(config);
    const params = {
      to: stream.name,
      type: "stream",
      topic: "Castle",
      content: message,
    };
    await client.messages.send(params);
    setMessage("");
  }, [message, stream?.name]);

  useEffect(() => {
    hadlerFetchMessages();
  }, [hadlerFetchMessages, handleSend]);

  if (!stream) {
    return <Loading />;
  }

  return (
    <Stream
      stream={stream}
      handleSend={handleSend}
      setMessage={setMessage}
      messages={messages}
      message={message}
    />
  );
};
