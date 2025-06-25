"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type CommandAction = {
  id: string;
  name: string;
  subtitle?: string;
  section?: string;
  shortcut?: string[];
  perform: () => void;
};

const CommandContext = createContext<{
  actions: CommandAction[];
  registerActions: (actions: CommandAction[]) => void;
  toggleDialog: () => void;
  isDialogOpen: boolean;
}>({
  actions: [],
  registerActions: () => {},
  toggleDialog: () => {},
  isDialogOpen: false,
});

export const CommandProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [actions, setActions] = useState<CommandAction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const registerActions = (newActions: CommandAction[]) => {
    setActions((prev) => {
      const existingIds = new Set(prev.map((action) => action.id));
      const filteredNewActions = newActions.filter(
        (action) => !existingIds.has(action.id),
      );
      if (filteredNewActions.length === 0) return prev;
      return [...prev, ...filteredNewActions];
    });
  };

  const toggleDialog = useMemo(
    () => () => setIsDialogOpen((prev) => !prev),
    [],
  );

  const value = useMemo(
    () => ({ actions, registerActions, toggleDialog, isDialogOpen }),
    [actions, isDialogOpen, toggleDialog],
  );

  return (
    <CommandContext.Provider value={value}>{children}</CommandContext.Provider>
  );
};

export const useCommandContext = () => useContext(CommandContext);
