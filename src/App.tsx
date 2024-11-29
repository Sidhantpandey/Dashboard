import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { ExerciseCard } from './components/ExerciseCard';
import { DashboardStats } from './components/DashboardStats';
import { Timer } from './components/Timer';
import { exercises } from './data/exercises';
import { Exercise, CompletedExercise } from './types';
import { calculateStreak } from './utils/dateUtils';
import { ArrowLeft } from 'lucide-react';

function App() {
  const [credits, setCredits] = useState(100);
  const [completedExercises, setCompletedExercises] = useState<CompletedExercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const dates = completedExercises.map(ex => ex.completedAt);
    const currentStreak = calculateStreak(dates);
    setStreak(currentStreak);
  }, [completedExercises]);

  const handleStartExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
  };

  const handleCompleteExercise = () => {
    if (currentExercise) {
      const newCompletedExercise: CompletedExercise = {
        id: Date.now().toString(),
        exerciseId: currentExercise.id,
        completedAt: new Date().toISOString(),
        credits: currentExercise.credits
      };

      setCredits(prev => prev + currentExercise.credits);
      setCompletedExercises(prev => [...prev, newCompletedExercise]);
      setCurrentExercise(null);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header credits={credits} />
        
        <main className="max-w-7xl mx-auto px-6 py-8">
          {currentExercise ? (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setCurrentExercise(null)}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mb-6 transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to exercises
              </button>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
                  {currentExercise.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg transition-colors duration-300">
                  {currentExercise.description}
                </p>
                <Timer
                  duration={currentExercise.duration}
                  onComplete={handleCompleteExercise}
                />
              </div>
            </div>
          ) : (
            <>
              <DashboardStats
                totalCredits={credits}
                streak={streak}
                completedExercises={completedExercises}
              />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">
                Available Exercises
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises.map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onStart={handleStartExercise}
                    completed={completedExercises.some(ce => ce.exerciseId === exercise.id)}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;