import { type ChatMessage, type User } from "@/types";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { io } from "socket.io-client";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const socket = io(import.meta.env.PUBLIC_API_URL || "http://localhost:3000");

import { Skeleton } from "@/components/ui/skeleton";

export const ChatSkeleton = () => {
  return (
    <section className="flex flex-col gap-2 relative">
      <Skeleton className="h-8 w-48" /> {/* Título */}
      <div className="h-72 rounded-md border p-3 space-y-2 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
          >
            <Skeleton className="w-2/3 h-6 rounded-md" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </section>
  );
};

export const Chat = ({ from, to }: { from: User; to: User }) => {
  const [message, setMessage] = useState<ChatMessage>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("previousMessages", (prevMessages: ChatMessage[]) => {
      setMessages(prevMessages);
    });

    socket.emit("join", from._id);

    socket.on("message", (newMessage: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, [from, to]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
    });
  }, [messages]);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!from || !to) return;
    if (!message) return;
    if (message.content.trim() === "") return;

    socket.emit("message", {
      content: message.content,
      from: from._id,
      to: to._id,
    });

    setMessage({
      content: "",
      from: from._id,
      to: to._id,
    });
  };

  return (
    <section className="flex flex-col gap-2 relative">
      <h1 className="text-2xl font-semibold text-black dark:text-white">
        Chatea con {to.name}
      </h1>
      <ScrollArea viewportRef={scrollRef} className="h-72 rounded-md border">
        {messages.map((msg, index) => {
          if (msg.from === from._id) {
            return (
              <li className="flex justify-end px-3 py-1" key={index}>
                <Badge
                  variant="secondary"
                  className="items-end bg-[#708a6b] hover:bg-[#708a6b]"
                >
                  <span className="px-1">
                    {msg.content} {" - "}
                    {msg.createdAt &&
                      new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </span>
                </Badge>
              </li>
            );
          }

          return (
            <li className="flex justify-start px-3 py-1" key={index}>
              <Badge variant="secondary" className="flex flex-col items-start">
                <span className="px-1">{from.name}</span>
                <span className="px-1">
                  {msg.content} {" - "}
                  {msg.createdAt &&
                    new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </span>
              </Badge>
            </li>
          );
        })}
      </ScrollArea>
      <form onSubmit={handleSend} className="flex items-center gap-2">
        <Input
          type="text"
          autoComplete="off"
          value={message?.content}
          onChange={(e) => {
            if (!from || !to) return;

            setMessage({
              content: e.target.value,
              from: from._id,
              to: to._id,
            });
          }}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </section>
  );
};
