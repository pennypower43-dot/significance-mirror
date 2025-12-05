import { useState, useEffect, useCallback } from 'react';

export type RelationshipType = 'stranger' | 'client' | 'family' | 'friend' | 'colleague' | 'other';

export interface SelectedQuestions {
  givingId: string;
  receivingId: string;
  feelingId: string;
  meaningId: string;
}

export interface Reflection {
  date: string; // ISO date string (YYYY-MM-DD)
  // Store which questions were selected for this reflection
  selectedQuestions: SelectedQuestions;
  // Q1: Who did you support/help today?
  supportedPerson: string;
  supportedRelationship: RelationshipType;
  // Q2: Who provided emotional support to you?
  supportedBy: string;
  supportedByRelationship: RelationshipType;
  // Q3: How did their support make you feel?
  supportFeeling: string;
  // Q4: What made this support meaningful?
  meaningfulReason: string;
  createdAt: string; // Full ISO timestamp
  // Legacy fields for backward compatibility
  helpedPerson?: string;
  helpedDescription?: string;
}

interface ReflectionState {
  reflections: Reflection[];
  hasCompletedOnboarding: boolean;
}

const STORAGE_KEY = 'significance-mirror-data';

const getInitialState = (): ReflectionState => {
  if (typeof window === 'undefined') {
    return { reflections: [], hasCompletedOnboarding: false };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading from localStorage:', e);
  }
  
  return { reflections: [], hasCompletedOnboarding: false };
};

export const useReflections = () => {
  const [state, setState] = useState<ReflectionState>(getInitialState);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }, [state]);

  const getTodayDateString = useCallback(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }, []);

  const completeOnboarding = useCallback(() => {
    setState(prev => ({ ...prev, hasCompletedOnboarding: true }));
  }, []);

  const getTodaysReflection = useCallback((): Reflection | undefined => {
    const today = getTodayDateString();
    return state.reflections.find(r => r.date === today);
  }, [state.reflections, getTodayDateString]);

  const saveReflection = useCallback((reflection: Omit<Reflection, 'date' | 'createdAt'>) => {
    const today = getTodayDateString();
    const newReflection: Reflection = {
      ...reflection,
      date: today,
      createdAt: new Date().toISOString(),
    };

    setState(prev => {
      // Remove existing reflection for today if it exists (overwrite)
      const filtered = prev.reflections.filter(r => r.date !== today);
      return {
        ...prev,
        reflections: [newReflection, ...filtered].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
      };
    });
  }, [getTodayDateString]);

  const getReflectionByDate = useCallback((date: string): Reflection | undefined => {
    return state.reflections.find(r => r.date === date);
  }, [state.reflections]);

  const getAllReflections = useCallback((): Reflection[] => {
    return state.reflections;
  }, [state.reflections]);

  return {
    hasCompletedOnboarding: state.hasCompletedOnboarding,
    completeOnboarding,
    getTodaysReflection,
    saveReflection,
    getReflectionByDate,
    getAllReflections,
    getTodayDateString,
  };
};
