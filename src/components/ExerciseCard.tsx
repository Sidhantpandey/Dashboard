import React from 'react';
import { Clock, Coins, Heart } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onStart: (exercise: Exercise) => void;
  completed: boolean;
}

export function ExerciseCard({ exercise, onStart, completed }: ExerciseCardProps) {
  const categoryColors = {
    meditation: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    breathing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    journaling: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    mindfulness: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[exercise.category]}`}>
          {exercise.category}
        </span>
        <Heart className={`w-6 h-6 transition-colors duration-300 ${completed ? 'text-red-500 fill-red-500' : 'text-gray-300 group-hover:text-red-400'}`} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
        {exercise.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
        {exercise.description}
      </p>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <Clock className="w-4 h-4 mr-1" />
          <span>{exercise.duration} mins</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
          <Coins className="w-4 h-4 mr-1" />
          <span>{exercise.credits} credits</span>
        </div>
      </div>
      <button
        onClick={() => onStart(exercise)}
        disabled={completed}
        className={`w-full py-2 px-4 rounded-lg transition-all duration-300 transform ${
          completed
            ? 'bg-green-500 text-white cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md'
        }`}
      >
        {completed ? 'Completed' : 'Start Exercise'}
      </button>
    </div>
  );
}