import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MirrorSummaryProps {
  helpedPerson: string;
  supportedBy: string;
  onSave: (helpedPerson: string, supportedBy: string) => void;
  onEdit: () => void;
}

export const MirrorSummary = ({
  helpedPerson,
  supportedBy,
  onSave,
  onEdit,
}: MirrorSummaryProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHelped, setEditedHelped] = useState(helpedPerson);
  const [editedSupported, setEditedSupported] = useState(supportedBy);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSave(editedHelped, editedSupported);
    setIsSaved(true);
  };

  const handleEdit = () => {
    if (isEditing) {
      // Save edits
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  // Extract first meaningful phrase or person name
  const extractPerson = (text: string) => {
    // Take first sentence or first 50 chars
    const firstSentence = text.split(/[.!?]/)[0].trim();
    return firstSentence.length > 60 
      ? firstSentence.substring(0, 60) + "..." 
      : firstSentence;
  };

  if (isEditing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full animate-gentle-fade">
          <h2 className="font-serif text-heading text-foreground mb-8 text-center">
            Edit Your Reflection
          </h2>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-small text-muted-foreground mb-2">
                Who you helped today
              </label>
              <Textarea
                variant="warm"
                value={editedHelped}
                onChange={(e) => setEditedHelped(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-small text-muted-foreground mb-2">
                Who made a difference to you
              </label>
              <Textarea
                variant="warm"
                value={editedSupported}
                onChange={(e) => setEditedSupported(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="gentle" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="warm" onClick={handleEdit}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full animate-gentle-fade">
        {/* Decorative element */}
        <div className="mb-10 flex justify-center">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-primary/30" />
          </div>
        </div>

        {/* Mirror summary */}
        <div className="bg-card rounded-2xl p-8 shadow-card mb-8">
          <p className="font-serif text-subheading text-foreground leading-relaxed text-center">
            Today, you mattered to{" "}
            <span className="text-primary italic">{extractPerson(editedHelped)}</span>
            {" "}through your care and support.
          </p>

          <div className="w-8 h-0.5 bg-border mx-auto my-6 rounded-full" />

          <p className="font-serif text-subheading text-foreground leading-relaxed text-center">
            You were supported by{" "}
            <span className="text-primary italic">{extractPerson(editedSupported)}</span>.
          </p>

          <div className="w-8 h-0.5 bg-border mx-auto my-6 rounded-full" />

          <p className="font-serif text-heading text-foreground text-center mt-8">
            You make a difference.
            <br />
            <span className="text-primary">You are significant.</span>
          </p>
        </div>

        {/* Actions */}
        {!isSaved ? (
          <div className="flex justify-center gap-4">
            <Button variant="gentle" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="warm" onClick={handleSave}>
              Save This Reflection
            </Button>
          </div>
        ) : (
          <div className="text-center animate-gentle-fade">
            <p className="text-body text-muted-foreground mb-6">
              Your reflection has been saved.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="gentle" onClick={onEdit}>
                View History
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
