"use client";

import { useEffect } from "react";

import { useTheme } from "next-themes";

import { useCommandContext } from "./command-context";

const useThemeSwitching = () => {
  const { theme, setTheme } = useTheme();
  const { registerActions } = useCommandContext();

  useEffect(() => {
    const actions = [
      {
        id: "toggle-theme",
        name: "Toggle Theme",
        shortcut: ["t", "t"],
        section: "Theme",
        subtitle: `Switch to ${theme === "light" ? "dark" : "light"} theme`,
        perform: () => setTheme(theme === "light" ? "dark" : "light"),
      },
      {
        id: "set-light-theme",
        name: "Set Light Theme",
        section: "Theme",
        subtitle: "Switch to light theme",
        perform: () => setTheme("light"),
      },
      {
        id: "set-dark-theme",
        name: "Set Dark Theme",
        section: "Theme",
        subtitle: "Switch to dark theme",
        perform: () => setTheme("dark"),
      },
    ];
    registerActions(actions);
  }, [registerActions, setTheme, theme]);

  return null;
};

export default useThemeSwitching;
