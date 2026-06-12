
import React from "react";
import { Button } from "@/components/ui/button";

interface SuggestionsProps {
  onSelect: (question: string) => void;
}

const suggestions = [
  "What percentage of passengers were male on the Titanic?",
  "Show me a histogram of passenger ages",
  "What was the average ticket fare?",
  "How many passengers embarked from each port?",
];

export const Suggestions = ({ onSelect }: SuggestionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          className="text-xs bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};
