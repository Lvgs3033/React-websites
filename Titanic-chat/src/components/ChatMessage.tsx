
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  visualization?: React.ReactNode;
}

export const ChatMessage = ({ message, isUser, visualization }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-fadeIn mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <Card
        className={cn(
          "max-w-[80%] p-4 backdrop-blur-sm",
          isUser
            ? "bg-primary/10 text-primary-foreground"
            : "bg-card/50 text-card-foreground"
        )}
      >
        <p className="text-sm leading-relaxed">{message}</p>
        {visualization && (
          <div className="mt-4 rounded-lg overflow-hidden bg-white/50 p-4">
            {visualization}
          </div>
        )}
      </Card>
    </div>
  );
};
