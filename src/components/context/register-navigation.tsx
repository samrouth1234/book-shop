"use client";

import { useEffect, useMemo } from "react";

import { useRouter } from "next/navigation";

import { navItems } from "@/constants/data";

import { useCommandContext } from "./command-context";

const RegisterNavigationActions = () => {
  const router = useRouter();
  const { registerActions } = useCommandContext();

  // Memoize navItems to prevent recreation
  const memoizedNavItems = useMemo(() => navItems, []);

  useEffect(() => {
    const actions = memoizedNavItems.flatMap((navItem) => {
      const baseAction =
        navItem.url !== "#"
          ? {
              id: `${navItem.title.toLowerCase()}-action`,
              name: navItem.title,
              shortcut: navItem.shortcut,
              keywords: navItem.title.toLowerCase(),
              section: "Navigation",
              subtitle: `Go to ${navItem.title}`,
              perform: () => router.push(navItem.url),
            }
          : null;

      const childActions =
        navItem.items?.map((childItem) => ({
          id: `${childItem.title.toLowerCase()}-action`,
          name: childItem.title,
          shortcut: childItem.shortcut,
          keywords: childItem.title.toLowerCase(),
          section: navItem.title,
          subtitle: `Go to ${childItem.title}`,
          perform: () => router.push(childItem.url),
        })) ?? [];

      return baseAction ? [baseAction, ...childActions] : childActions;
    });

    registerActions(actions);
  }, [memoizedNavItems, registerActions, router]);

  return null;
};

export default RegisterNavigationActions;
