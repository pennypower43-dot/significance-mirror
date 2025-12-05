import { useState, useEffect } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ReflectionQuestion } from "@/components/ReflectionQuestion";
import { MirrorSummary } from "@/components/MirrorSummary";
import { ReflectionHistory } from "@/components/ReflectionHistory";
import { useReflections } from "@/hooks/useReflections";

type Screen = "welcome" | "question1" | "question2" | "summary" | "history";

const Index = () => {
  const {
    hasCompletedOnboarding,
    completeOnboarding,
    getTodaysReflection,
    saveReflection,
    getAllReflections,
  } = useReflections();

  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [helpedPerson, setHelpedPerson] = useState("");
  const [supportedBy, setSupportedBy] = useState("");

  // Determine initial screen
  useEffect(() => {
    if (hasCompletedOnboarding) {
      const todaysReflection = getTodaysReflection();
      if (todaysReflection) {
        // If already completed today, show history
        setCurrentScreen("history");
      } else {
        // Start new reflection
        setCurrentScreen("question1");
      }
    } else {
      setCurrentScreen("welcome");
    }
  }, [hasCompletedOnboarding, getTodaysReflection]);

  const handleBegin = () => {
    completeOnboarding();
    setCurrentScreen("question1");
  };

  const handleQuestion1Next = (value: string) => {
    setHelpedPerson(value);
    setCurrentScreen("question2");
  };

  const handleQuestion2Next = (value: string) => {
    setSupportedBy(value);
    setCurrentScreen("summary");
  };

  const handleSave = (editedHelped: string, editedSupported: string) => {
    saveReflection({
      helpedPerson: editedHelped,
      helpedDescription: editedHelped,
      supportedBy: editedSupported,
    });
  };

  const handleViewHistory = () => {
    setCurrentScreen("history");
  };

  const handleTodaysReflection = () => {
    const todaysReflection = getTodaysReflection();
    if (todaysReflection) {
      setHelpedPerson(todaysReflection.helpedPerson);
      setSupportedBy(todaysReflection.supportedBy);
      setCurrentScreen("summary");
    } else {
      setHelpedPerson("");
      setSupportedBy("");
      setCurrentScreen("question1");
    }
  };

  const handleBackToHome = () => {
    const todaysReflection = getTodaysReflection();
    if (todaysReflection) {
      setHelpedPerson(todaysReflection.helpedPerson);
      setSupportedBy(todaysReflection.supportedBy);
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
          initialValue={helpedPerson}
          onNext={handleQuestion1Next}
        />
      )}

      {currentScreen === "question2" && (
        <ReflectionQuestion
          questionNumber={2}
          initialValue={supportedBy}
          onNext={handleQuestion2Next}
          onBack={() => setCurrentScreen("question1")}
        />
      )}

      {currentScreen === "summary" && (
        <MirrorSummary
          helpedPerson={helpedPerson}
          supportedBy={supportedBy}
          onSave={handleSave}
          onEdit={handleViewHistory}
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
