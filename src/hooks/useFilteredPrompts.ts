import { useMemo } from "react";
import type { Prompt, TagKey } from "../types";

interface UseFilteredPromptsOptions {
  prompts: Prompt[];
  activeTag: TagKey | "all" | "favorites";
  searchQuery: string;
  favorites: Set<string>;
}

export function useFilteredPrompts({
  prompts,
  activeTag,
  searchQuery,
  favorites,
}: UseFilteredPromptsOptions) {
  return useMemo(() => {
    let filtered = prompts;

    // Filter by tag
    if (activeTag === "favorites") {
      filtered = filtered.filter((p) => favorites.has(p.id));
    } else if (activeTag !== "all") {
      filtered = filtered.filter((p) => p.tag === activeTag);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Sort by updatedAt descending
    return [...filtered].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }, [prompts, activeTag, searchQuery, favorites]);
}
