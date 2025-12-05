import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onBegin: () => void;
}

export const WelcomeScreen = ({ onBegin }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full text-center animate-gentle-fade">
        {/* Decorative element */}
        <div className="mb-12">
          <div className="w-16 h-0.5 bg-primary/40 mx-auto rounded-full" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-display text-foreground mb-8 text-balance">
          The Significance Mirror
        </h1>

        {/* Body copy */}
        <p className="text-body-lg text-muted-foreground mb-12 leading-relaxed max-w-md mx-auto">
          Each day, take a quiet moment to notice why you matter — and who matters to you.
        </p>

        {/* Decorative element */}
        <div className="mb-12">
          <div className="w-8 h-0.5 bg-primary/30 mx-auto rounded-full" />
        </div>

        {/* CTA Button */}
        <Button 
          variant="warm" 
          size="xl"
          onClick={onBegin}
          className="font-sans"
        >
          Begin Today's Reflection
        </Button>

        {/* Footer note */}
        <p className="mt-16 text-small text-muted-foreground/70">
          A quiet space for daily reflection
        </p>
      </div>
    </div>
  );
};
