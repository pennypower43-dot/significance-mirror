import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Reflection, RelationshipType } from "@/hooks/useReflections";
import { generateIntegratedAffirmation } from "@/lib/questionPool";

interface ReflectionHistoryProps {
  reflections: Reflection[];
  onTodaysReflection: () => void;
  onBack: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00");
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const getPreview = (text: string, wordCount: number = 10) => {
  const words = text.split(/\s+/).slice(0, wordCount);
  const preview = words.join(" ");
  return text.split(/\s+/).length > wordCount ? preview + "..." : preview;
};

const formatRelationship = (relationship: RelationshipType): string => {
  return relationship.charAt(0).toUpperCase() + relationship.slice(1);
};

export const ReflectionHistory = ({
  reflections,
  onTodaysReflection,
  onBack,
}: ReflectionHistoryProps) => {
  const [selectedReflection, setSelectedReflection] = useState<Reflection | null>(null);

  if (selectedReflection) {
    // Generate the affirmation for this reflection
    const affirmation = selectedReflection.supportedPerson && selectedReflection.supportedRelationship
      ? generateIntegratedAffirmation(
          selectedReflection.supportedPerson,
          selectedReflection.supportedRelationship,
          selectedReflection.supportedBy,
          selectedReflection.supportedByRelationship!,
          selectedReflection.supportFeeling || "",
          selectedReflection.meaningfulReason || ""
        )
      : null;

    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full animate-gentle-fade">
          {/* Date header */}
          <p className="text-small text-muted-foreground text-center mb-2">
            {formatDate(selectedReflection.date)}
          </p>

          {/* Decorative element */}
          <div className="mb-8 flex justify-center">
            <div className="w-8 h-0.5 bg-primary/40 rounded-full" />
          </div>

          {/* Affirmation (if new format) */}
          {affirmation && (
            <div className="bg-card rounded-2xl p-10 shadow-card mb-6">
              <div className="prose prose-lg max-w-none text-center">
                <p className="font-serif text-body-lg text-foreground leading-relaxed whitespace-pre-line">
                  {affirmation}
                </p>
              </div>
            </div>
          )}

          {/* Full reflection details */}
          <div className="bg-card rounded-2xl p-8 shadow-card mb-8">
            <div className="mb-6">
              <p className="text-small text-muted-foreground mb-2">
                Who you made feel significant:
              </p>
              <p className="font-serif text-body-lg text-foreground leading-relaxed">
                {selectedReflection.supportedPerson || selectedReflection.helpedPerson}
                {selectedReflection.supportedRelationship && (
                  <span className="text-body text-primary ml-2">
                    ({formatRelationship(selectedReflection.supportedRelationship)})
                  </span>
                )}
              </p>
            </div>

            <div className="w-full h-px bg-border my-6" />

            <div className="mb-6">
              <p className="text-small text-muted-foreground mb-2">
                Who made you feel significant:
              </p>
              <p className="font-serif text-body-lg text-foreground leading-relaxed">
                {selectedReflection.supportedBy}
                {selectedReflection.supportedByRelationship && (
                  <span className="text-body text-primary ml-2">
                    ({formatRelationship(selectedReflection.supportedByRelationship)})
                  </span>
                )}
              </p>
            </div>

            {selectedReflection.supportFeeling && (
              <>
                <div className="w-full h-px bg-border my-6" />
                <div className="mb-6">
                  <p className="text-small text-muted-foreground mb-2">
                    How it made you feel:
                  </p>
                  <p className="font-serif text-body-lg text-foreground leading-relaxed">
                    {selectedReflection.supportFeeling}
                  </p>
                </div>
              </>
            )}

            {selectedReflection.meaningfulReason && (
              <>
                <div className="w-full h-px bg-border my-6" />
                <div>
                  <p className="text-small text-muted-foreground mb-2">
                    What made it meaningful:
                  </p>
                  <p className="font-serif text-body-lg text-foreground leading-relaxed">
                    {selectedReflection.meaningfulReason}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Back button */}
          <div className="flex justify-center">
            <Button variant="gentle" onClick={() => setSelectedReflection(null)}>
              Back to History
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full animate-gentle-fade">
        {/* Header */}
        <h2 className="font-serif text-heading text-foreground mb-2 text-center">
          Your Reflections
        </h2>
        <p className="text-body text-muted-foreground mb-10 text-center">
          A record of your significance
        </p>

        {/* Reflections list */}
        {reflections.length === 0 ? (
          <div className="bg-card rounded-2xl p-8 shadow-soft text-center mb-8">
            <p className="text-body text-muted-foreground">
              No reflections yet. Start your first one today.
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-10">
            {reflections.map((reflection) => {
              const previewText = reflection.supportedPerson || reflection.helpedPerson || "No content";
              return (
                <button
                  key={reflection.date}
                  onClick={() => setSelectedReflection(reflection)}
                  className="w-full text-left bg-card hover:bg-accent/50 rounded-xl p-5 shadow-soft transition-all duration-300 hover:shadow-card group"
                >
                  <p className="text-small text-muted-foreground mb-1">
                    {formatDate(reflection.date)}
                  </p>
                  <p className="text-body text-foreground group-hover:text-primary transition-colors duration-300">
                    {getPreview(previewText, 10)}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="gentle" onClick={onBack}>
            Back to Home
          </Button>
          <Button variant="warm" onClick={onTodaysReflection}>
            Today's Reflection
          </Button>
        </div>
      </div>
    </div>
  );
};
