"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

export interface ChatProps {}

export default function Chat(props: ChatProps) {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  return (
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>
          Using Vercel's AI SDK to create a chat bot.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full  pr-4">
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className="flex gap-3 text-slate-600 text-sm mb-4"
              >
                <Avatar>
                  <AvatarFallback>
                    {message.role === "user" ? "NF" : "AI"}
                  </AvatarFallback>
                  <AvatarImage
                    src={
                      message.role === "user"
                        ? "https://github.com/makeneto.png"
                        : "https://github.com/vercel.png"
                    }
                  />
                </Avatar>
                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-700">
                    {message.role === "user" ? "Human:" : "NUBot:"}
                  </span>
                  {message.parts.map((part) => {
                    switch (part.type) {
                      case "text":
                        return part.text;
                      default:
                        return null;
                    }
                  })}
                </p>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          className="w-full flex gap-2"
          action="submit"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput("");
          }}
        >
          <Input
            placeholder="How can I help you?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button disabled={!input}>Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
