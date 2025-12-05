import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReflectionQuestionProps {
  questionNumber: 1 | 2;
  initialValue?: string;
  onNext: (value: string) => void;
  onBack?: () => void;
}

const questions = {
  1: {
    prompt: "Who did you help, support or care about today, even in a small way?",
    helper: "This could be a client, colleague, friend, family member, stranger — or yourself.",
    buttonText: "Next",
  },
  2: {
    prompt: "Who made a difference to you today?",
    helper: "Listening, encouraging, helping, checking in — all count.",
    buttonText: "See My Mirror",
  },
};

export const ReflectionQuestion = ({
  questionNumber,
  initialValue = "",
  onNext,
  onBack,
}: ReflectionQuestionProps) => {
  const [value, setValue] = useState(initialValue);
  const question = questions[questionNumber];

  const handleSubmit = () => {
    if (value.trim()) {
      onNext(value.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full animate-gentle-fade">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div 
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              questionNumber >= 1 ? "bg-primary" : "bg-border"
            }`} 
          />
          <div 
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              questionNumber >= 2 ? "bg-primary" : "bg-border"
            }`} 
          />
        </div>

        {/* Question prompt */}
        <h2 className="font-serif text-heading text-foreground mb-4 text-center text-balance leading-snug">
          {question.prompt}
        </h2>

        {/* Helper text */}
        <p className="text-body text-muted-foreground mb-8 text-center">
          {question.helper}
        </p>

        {/* Text input */}
        <Textarea
          variant="warm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Take your time..."
          className="mb-8 min-h-[160px] text-body-lg"
        />

        {/* Actions */}
        <div className="flex items-center justify-between">
          {onBack ? (
            <Button variant="text" onClick={onBack}>
              Back
            </Button>
          ) : (
            <div />
          )}
          
          <Button
            variant="warm"
            onClick={handleSubmit}
            disabled={!value.trim()}
          >
            {question.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
