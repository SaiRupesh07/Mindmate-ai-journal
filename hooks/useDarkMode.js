import { useEffect, useState } from 'react';

/**
 * Custom hook to enable / disable dark mode
 * @returns [darkMode (boolean), toggleDarkMode (function)]
 */
export default function useDarkMode() {
  // tracks current theme
  const [darkMode, setDarkMode] = useState(false);

  // run once on first render
  useEffect(() => {
    // 1️⃣ Load saved value from localStorage (if any)
    const stored = localStorage.getItem('theme');

    // 2️⃣ If stored value is 'dark', apply it
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  // function returned so UI can toggle
  const toggleDarkMode = () => {
    if (darkMode) {
      // turn OFF dark mode
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      // turn ON dark mode
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    // React state update → UI re‑renders
    setDarkMode(!darkMode);
  };

  // hook returns darkMode flag and the toggle function
  return [darkMode, toggleDarkMode];
}
