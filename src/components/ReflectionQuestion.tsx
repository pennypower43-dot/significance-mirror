import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RelationshipType } from "@/hooks/useReflections";
import { Question } from "@/lib/questionPool";

interface ReflectionQuestionProps {
  questionNumber: 1 | 2 | 3 | 4;
  question: Question;
  initialValue?: string;
  initialRelationship?: RelationshipType;
  onNext: (value: string, relationship?: RelationshipType) => void;
  onBack?: () => void;
}

const relationshipOptions: { value: RelationshipType; label: string }[] = [
  { value: 'family', label: 'Family' },
  { value: 'friend', label: 'Friend' },
  { value: 'colleague', label: 'Colleague' },
  { value: 'client', label: 'Client' },
  { value: 'stranger', label: 'Stranger' },
  { value: 'other', label: 'Other' },
];

export const ReflectionQuestion = ({
  questionNumber,
  question,
  initialValue = "",
  initialRelationship,
  onNext,
  onBack,
}: ReflectionQuestionProps) => {
  const [value, setValue] = useState(initialValue);
  const [relationship, setRelationship] = useState<RelationshipType | undefined>(initialRelationship);

  const handleSubmit = () => {
    if (value.trim()) {
      if (question.showRelationship && relationship) {
        onNext(value.trim(), relationship);
      } else if (!question.showRelationship) {
        onNext(value.trim());
      }
    }
  };

  const isValid = value.trim() && (!question.showRelationship || relationship);
  const buttonText = questionNumber === 4 ? "See My Mirror" : "Next";

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
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              questionNumber >= 3 ? "bg-primary" : "bg-border"
            }`}
          />
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              questionNumber >= 4 ? "bg-primary" : "bg-border"
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
          className="mb-4 min-h-[160px] text-body-lg"
        />

        {/* Relationship selector */}
        {question.showRelationship && (
          <div className="mb-8">
            <Label htmlFor="relationship" className="text-sm text-muted-foreground mb-2 block">
              Your relationship
            </Label>
            <Select value={relationship} onValueChange={(value: RelationshipType) => setRelationship(value)}>
              <SelectTrigger id="relationship" className="w-full">
                <SelectValue placeholder="Select a relationship type" />
              </SelectTrigger>
              <SelectContent>
                {relationshipOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

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
            disabled={!isValid}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
