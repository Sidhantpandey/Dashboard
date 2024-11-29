import React from 'react';
import { Moon, Sun, Coins, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  credits: number;
}

export function Header({ credits }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Award className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
              Mental Wellness Hub
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900 rounded-lg transition-all duration-300">
              <Coins className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
              <span className="font-semibold text-blue-600 dark:text-blue-300">
                {credits} credits
              </span>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}