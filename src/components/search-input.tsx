"use client";

import { useEffect } from "react";

import { IconSearch } from "@tabler/icons-react";

import { useCommandContext } from "./context/command-context";
import { Button } from "./ui/button";

export default function SearchInput() {
  const { toggleDialog } = useCommandContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleDialog();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleDialog]);

  return (
    <div className="w-full space-y-2">
      <Button
        variant="outline"
        className="bg-background text-muted-foreground relative h-9 w-full justify-start rounded-lg text-sm font-normal shadow-none sm:pr-12 md:w-48 lg:w-72"
        onClick={toggleDialog}
      >
        <IconSearch className="mr-2 h-4 w-4" />
        Search...
        <kbd className="bg-muted pointer-events-none absolute top-1 right-1 hidden h-6 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    </div>
  );
}
