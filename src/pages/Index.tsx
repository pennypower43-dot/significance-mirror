import { useState, useEffect, useMemo } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ReflectionQuestion } from "@/components/ReflectionQuestion";
import { MirrorSummary } from "@/components/MirrorSummary";
import { ReflectionHistory } from "@/components/ReflectionHistory";
import { useReflections, RelationshipType, SelectedQuestions } from "@/hooks/useReflections";
import { selectDailyQuestions, givingQuestions, receivingQuestions, feelingQuestions, meaningQuestions } from "@/lib/questionPool";

type Screen = "welcome" | "question1" | "question2" | "question3" | "question4" | "summary" | "history";

const Index = () => {
  const {
    hasCompletedOnboarding,
    completeOnboarding,
    getTodaysReflection,
    saveReflection,
    getAllReflections,
  } = useReflections();

  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");

  // Reflection data
  const [supportedPerson, setSupportedPerson] = useState("");
  const [supportedRelationship, setSupportedRelationship] = useState<RelationshipType | undefined>();
  const [supportedBy, setSupportedBy] = useState("");
  const [supportedByRelationship, setSupportedByRelationship] = useState<RelationshipType | undefined>();
  const [supportFeeling, setSupportFeeling] = useState("");
  const [meaningfulReason, setMeaningfulReason] = useState("");

  // Selected questions for today's reflection
  const [selectedQuestions, setSelectedQuestions] = useState<SelectedQuestions | null>(null);

  // Select questions for today (or load from existing reflection)
  const dailyQuestions = useMemo(() => {
    const todaysReflection = getTodaysReflection();

    if (todaysReflection && todaysReflection.selectedQuestions) {
      // Load questions from existing reflection
      return {
        giving: givingQuestions.find(q => q.id === todaysReflection.selectedQuestions.givingId)!,
        receiving: receivingQuestions.find(q => q.id === todaysReflection.selectedQuestions.receivingId)!,
        feeling: feelingQuestions.find(q => q.id === todaysReflection.selectedQuestions.feelingId)!,
        meaning: meaningQuestions.find(q => q.id === todaysReflection.selectedQuestions.meaningId)!,
      };
    }

    // Select new random questions for today
    return selectDailyQuestions();
  }, [getTodaysReflection]);

  // Determine initial screen
  useEffect(() => {
    if (hasCompletedOnboarding) {
      const todaysReflection = getTodaysReflection();
      if (todaysReflection) {
        // If already completed today, show history
        setCurrentScreen("history");
      } else {
        // Show welcome screen daily before starting new reflection
        setCurrentScreen("welcome");
      }
    } else {
      setCurrentScreen("welcome");
    }
  }, [hasCompletedOnboarding, getTodaysReflection, dailyQuestions]);

  const handleBegin = () => {
    // Complete onboarding if first time
    if (!hasCompletedOnboarding) {
      completeOnboarding();
    }
    // Store selected questions when starting new reflection
    setSelectedQuestions({
      givingId: dailyQuestions.giving.id,
      receivingId: dailyQuestions.receiving.id,
      feelingId: dailyQuestions.feeling.id,
      meaningId: dailyQuestions.meaning.id,
    });
    setCurrentScreen("question1");
  };

  const handleQuestion1Next = (value: string, relationship?: RelationshipType) => {
    setSupportedPerson(value);
    setSupportedRelationship(relationship);
    setCurrentScreen("question2");
  };

  const handleQuestion2Next = (value: string, relationship?: RelationshipType) => {
    setSupportedBy(value);
    setSupportedByRelationship(relationship);
    setCurrentScreen("question3");
  };

  const handleQuestion3Next = (value: string) => {
    setSupportFeeling(value);
    setCurrentScreen("question4");
  };

  const handleQuestion4Next = (value: string) => {
    setMeaningfulReason(value);
    setCurrentScreen("summary");
  };

  const handleSave = () => {
    if (!supportedRelationship || !supportedByRelationship || !selectedQuestions) return;

    saveReflection({
      selectedQuestions,
      supportedPerson,
      supportedRelationship,
      supportedBy,
      supportedByRelationship,
      supportFeeling,
      meaningfulReason,
    });

    // Automatically navigate to history after saving
    setTimeout(() => {
      setCurrentScreen("history");
    }, 1500); // Brief delay to show "saved" message
  };

  const handleViewHistory = () => {
    setCurrentScreen("history");
  };

  const handleTodaysReflection = () => {
    const todaysReflection = getTodaysReflection();
    if (todaysReflection) {
      setSupportedPerson(todaysReflection.supportedPerson);
      setSupportedRelationship(todaysReflection.supportedRelationship);
      setSupportedBy(todaysReflection.supportedBy);
      setSupportedByRelationship(todaysReflection.supportedByRelationship);
      setSupportFeeling(todaysReflection.supportFeeling);
      setMeaningfulReason(todaysReflection.meaningfulReason);
      setSelectedQuestions(todaysReflection.selectedQuestions);
      setCurrentScreen("summary");
    } else {
      // Reset for new reflection
      setSupportedPerson("");
      setSupportedRelationship(undefined);
      setSupportedBy("");
      setSupportedByRelationship(undefined);
      setSupportFeeling("");
      setMeaningfulReason("");
      setSelectedQuestions({
        givingId: dailyQuestions.giving.id,
        receivingId: dailyQuestions.receiving.id,
        feelingId: dailyQuestions.feeling.id,
        meaningId: dailyQuestions.meaning.id,
      });
      setCurrentScreen("question1");
    }
  };

  const handleBackToHome = () => {
    const todaysReflection = getTodaysReflection();
    if (todaysReflection) {
      setSupportedPerson(todaysReflection.supportedPerson);
      setSupportedRelationship(todaysReflection.supportedRelationship);
      setSupportedBy(todaysReflection.supportedBy);
      setSupportedByRelationship(todaysReflection.supportedByRelationship);
      setSupportFeeling(todaysReflection.supportFeeling);
      setMeaningfulReason(todaysReflection.meaningfulReason);
      setSelectedQuestions(todaysReflection.selectedQuestions);
      setCurrentScreen("summary");
    } else {
      setCurrentScreen("question1");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {currentScreen === "welcome" && (
        <WelcomeScreen onBegin={handleBegin} />
      )}

      {currentScreen === "question1" && (
        <ReflectionQuestion
          questionNumber={1}
          question={dailyQuestions.giving}
          initialValue={supportedPerson}
          initialRelationship={supportedRelationship}
          onNext={handleQuestion1Next}
        />
      )}

      {currentScreen === "question2" && (
        <ReflectionQuestion
          questionNumber={2}
          question={dailyQuestions.receiving}
          initialValue={supportedBy}
          initialRelationship={supportedByRelationship}
          onNext={handleQuestion2Next}
          onBack={() => setCurrentScreen("question1")}
        />
      )}

      {currentScreen === "question3" && (
        <ReflectionQuestion
          questionNumber={3}
          question={dailyQuestions.feeling}
          initialValue={supportFeeling}
          onNext={handleQuestion3Next}
          onBack={() => setCurrentScreen("question2")}
        />
      )}

      {currentScreen === "question4" && (
        <ReflectionQuestion
          questionNumber={4}
          question={dailyQuestions.meaning}
          initialValue={meaningfulReason}
          onNext={handleQuestion4Next}
          onBack={() => setCurrentScreen("question3")}
        />
      )}

      {currentScreen === "summary" && supportedRelationship && supportedByRelationship && (
        <MirrorSummary
          supportedPerson={supportedPerson}
          supportedRelationship={supportedRelationship}
          supportedBy={supportedBy}
          supportedByRelationship={supportedByRelationship}
          supportFeeling={supportFeeling}
          meaningfulReason={meaningfulReason}
          onSave={handleSave}
          onViewHistory={handleViewHistory}
        />
      )}

      {currentScreen === "history" && (
        <ReflectionHistory
          reflections={getAllReflections()}
          onTodaysReflection={handleTodaysReflection}
          onBack={handleBackToHome}
        />
      )}
    </main>
  );
};

export default Index;
