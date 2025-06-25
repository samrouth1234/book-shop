"use client";

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useCommandContext } from "./command-context";

export default function CommandPalette() {
  const { actions, toggleDialog, isDialogOpen } = useCommandContext();

  return (
    <CommandDialog open={isDialogOpen} onOpenChange={toggleDialog}>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        {actions.length === 0 && (
          <CommandGroup heading="No commands available" />
        )}
        {actions.map((action) => (
          <CommandGroup heading={action.section || "General"} key={action.id}>
            <CommandItem
              key={action.id}
              onSelect={() => {
                action.perform();
                toggleDialog();
              }}
            >
              {action.name}
              {action.subtitle && (
                <span className="text-muted-foreground ml-2 text-sm">
                  {action.subtitle}
                </span>
              )}
            </CommandItem>
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
