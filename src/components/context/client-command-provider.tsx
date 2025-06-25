"use client";

import CommandPalette from "./command-palette";
import RegisterNavigationActions from "./register-navigation";
import useThemeSwitching from "./use-theme-switching";

export default function ClientCommandProvider() {
  useThemeSwitching(); // Keep theme switching here to avoid duplication

  return (
    <>
      <RegisterNavigationActions />
      <CommandPalette />
    </>
  );
}
