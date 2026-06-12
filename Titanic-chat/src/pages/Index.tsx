
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";
import { Suggestions } from "@/components/Suggestions";
import { DataVisualization } from "@/components/DataVisualization";
import { useToast } from "@/components/ui/use-toast";

// Mock data functions to simulate API calls
const mockTitanicData = {
  embarked: [
    { port: "Southampton", count: 644 },
    { port: "Cherbourg", count: 168 },
    { port: "Queenstown", count: 77 },
  ],
  gender: [
    { category: "Male", count: 577 },
    { category: "Female", count: 314 },
  ],
  class: [
    { category: "First", count: 216 },
    { category: "Second", count: 184 },
    { category: "Third", count: 491 },
  ],
  age: [
    { range: "0-10", count: 62 },
    { range: "11-20", count: 102 },
    { range: "21-30", count: 223 },
    { range: "31-40", count: 167 },
    { range: "41-50", count: 118 },
    { range: "51+", count: 219 },
  ],
};

const processQuery = (query: string) => {
  query = query.toLowerCase();
  if (query.includes("port") || query.includes("embark")) {
    return {
      data: mockTitanicData.embarked,
      message: "Here's the distribution of passengers by embarkation port:",
      xKey: "port",
      yKey: "count",
    };
  } else if (query.includes("gender") || query.includes("male") || query.includes("female")) {
    return {
      data: mockTitanicData.gender,
      message: "Here's the gender distribution of passengers:",
      xKey: "category",
      yKey: "count",
    };
  } else if (query.includes("class")) {
    return {
      data: mockTitanicData.class,
      message: "Here's the distribution of passengers by class:",
      xKey: "category",
      yKey: "count",
    };
  } else if (query.includes("age")) {
    return {
      data: mockTitanicData.age,
      message: "Here's the age distribution of passengers:",
      xKey: "range",
      yKey: "count",
    };
  }
  return {
    data: mockTitanicData.embarked,
    message: "I'm showing you the embarkation data by default. Try asking about age, gender, or class distribution!",
    xKey: "port",
    yKey: "count",
  };
};

interface Message {
  message: string;
  isUser: boolean;
  visualization?: React.ReactNode;
}

const Index = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = processQuery(text);
      
      const newMessages = [
        ...messages,
        { message: text, isUser: true },
        {
          message: response.message,
          isUser: false,
          visualization: (
            <DataVisualization
              data={response.data}
              type="bar"
              xKey={response.xKey}
              yKey={response.yKey}
            />
          ),
        },
      ];

      setMessages(newMessages);
      setInput("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your question. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-semibold mb-2 tracking-tight">
            Titanic Dataset Explorer
          </h1>
          <p className="text-muted-foreground">
            Ask questions about the Titanic dataset and get instant insights
          </p>
        </div>

        <div className="space-y-4 mb-4">
          <Suggestions onSelect={(question) => handleSend(question)} />
          
          <div className="space-y-4 mb-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="sticky bottom-4 bg-background/80 backdrop-blur-lg rounded-lg p-4 border shadow-lg animate-fadeIn"
        >
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about the Titanic dataset..."
              className="bg-background"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
