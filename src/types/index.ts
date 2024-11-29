export interface Exercise {
  id: string;
  title: string;
  description: string;
  credits: number;
  duration: number; // in minutes
  category: 'meditation' | 'breathing' | 'journaling' | 'mindfulness';
}

export interface CompletedExercise {
  id: string;
  exerciseId: string;
  completedAt: string;
  credits: number;
}

export interface User {
  credits: number;
  streak: number;
  lastCompletedDate: string | null;
  completedExercises: CompletedExercise[];
}