import React from 'react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none transition duration-200">
      {darkMode ? (
        // Filled moon — dark mode active
        <svg xmlns="http://www.w3.org/2000/svg"
             width="26" height="26" viewBox="0 0 24 24"
             fill="white" stroke="white" strokeWidth={1}>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      ) : (
        // Outline moon — light mode active
        <svg xmlns="http://www.w3.org/2000/svg"
             width="26" height="26" viewBox="0 0 24 24"
             fill="none" stroke="white" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;