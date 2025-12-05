import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { RelationshipType } from "@/hooks/useReflections";
import { generateIntegratedAffirmation } from "@/lib/questionPool";
import { getRandomAffirmation } from "@/lib/dailyAffirmations";

interface MirrorSummaryProps {
  supportedPerson: string;
  supportedRelationship: RelationshipType;
  supportedBy: string;
  supportedByRelationship: RelationshipType;
  supportFeeling: string;
  meaningfulReason: string;
  onSave: () => void;
  onViewHistory: () => void;
}

export const MirrorSummary = ({
  supportedPerson,
  supportedRelationship,
  supportedBy,
  supportedByRelationship,
  supportFeeling,
  meaningfulReason,
  onSave,
  onViewHistory,
}: MirrorSummaryProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setIsSaved(true);
  };

  // Generate integrated affirmation that weaves all elements together
  const affirmation = generateIntegratedAffirmation(
    supportedPerson,
    supportedRelationship,
    supportedBy,
    supportedByRelationship,
    supportFeeling,
    meaningfulReason
  );

  // Get random daily affirmation (memoized so it doesn't change on re-render)
  const dailyIntention = useMemo(() => getRandomAffirmation(), []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full animate-gentle-fade">
        {/* Decorative element */}
        <div className="mb-10 flex justify-center">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-primary/30" />
          </div>
        </div>

        <h2 className="font-serif text-heading text-foreground text-center mb-8">
          Your Significance Mirror
        </h2>

        {/* Integrated affirmation */}
        <div className="bg-card rounded-2xl p-10 shadow-card mb-6">
          <div className="prose prose-lg max-w-none text-center">
            <p className="font-serif text-body-lg text-foreground leading-relaxed whitespace-pre-line">
              {affirmation}
            </p>
          </div>
        </div>

        {/* Daily Intention */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-8">
          <p className="text-small text-primary/70 uppercase tracking-wide text-center mb-3">
            Your Daily Intention
          </p>
          <p className="font-serif text-heading text-primary text-center leading-relaxed italic">
            {dailyIntention}
          </p>
        </div>

        {/* Actions */}
        {!isSaved ? (
          <div className="flex justify-center">
            <Button variant="warm" onClick={handleSave}>
              Save This Reflection
            </Button>
          </div>
        ) : (
          <div className="text-center animate-gentle-fade">
            <p className="text-body text-muted-foreground mb-6">
              Your reflection has been saved.
            </p>
            <div className="flex justify-center">
              <Button variant="warm" onClick={onViewHistory}>
                View History
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
