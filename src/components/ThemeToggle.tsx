"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/AppIcon";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#E8A020] transition-all duration-300"
      aria-label="Toggle theme"
      title={isDark ? "Mode clair" : "Mode sombre"}
    >
      {isDark ? (
        <Icon name="SunIcon" size={20} className="text-[#E8A020]" />
      ) : (
        <Icon name="MoonIcon" size={20} className="text-[#E8A020]" />
      )}
    </button>
  );
}
