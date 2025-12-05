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

        {/* Welcome message */}
        <h1 className="font-serif text-display text-foreground mb-6 text-balance">
          Welcome to Your Day of Significance
        </h1>

        <p className="font-serif text-heading text-primary mb-10 text-balance">
          Driven by Contribution
        </p>

        {/* Body copy */}
        <p className="text-body-lg text-muted-foreground mb-6 leading-relaxed max-w-lg mx-auto">
          Today, you will deepen your relationships by making others feel significant and allowing others to make you feel significant.
        </p>

        <p className="text-body text-muted-foreground/80 mb-8 leading-relaxed max-w-md mx-auto italic">
          "To be significant is to be seen, heard, and appreciated. It is both a gift we receive and a gift we give."
        </p>

        <p className="text-body-sm text-muted-foreground/70 mb-12 leading-relaxed max-w-md mx-auto">
          When we make others feel significant, we simultaneously strengthen our own sense of purpose and connection.
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
          Your daily mirror for building significance through contribution
        </p>
      </div>
    </div>
  );
};
