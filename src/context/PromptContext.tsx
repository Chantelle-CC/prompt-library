import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import type { Prompt } from "../types";
import { DEFAULT_PROMPTS } from "../data/defaultPrompts";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface PromptContextValue {
  prompts: Prompt[];
  favorites: Set<string>;
  addPrompt: (
    data: Omit<Prompt, "id" | "createdAt" | "updatedAt">,
  ) => void;
  editPrompt: (id: string, data: Partial<Omit<Prompt, "id">>) => void;
  deletePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  resetToDefaults: () => void;
}

const PromptContext = createContext<PromptContextValue | null>(null);

function getNow(): string {
  return new Date().toISOString();
}

let _idCounter = 0;
function generateId(): string {
  _idCounter++;
  return `p-${Date.now().toString(36)}-${_idCounter.toString(36)}`;
}

export function PromptProvider({ children }: { children: ReactNode }) {
  const [prompts, setPrompts] = useLocalStorage<Prompt[]>(
    "prompt_lib_prompts",
    DEFAULT_PROMPTS,
  );
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "prompt_lib_favorites",
    [],
  );

  const favoritesSet = new Set(favorites);

  const addPrompt = useCallback(
    (data: Omit<Prompt, "id" | "createdAt" | "updatedAt">) => {
      setPrompts((prev) => [
        ...prev,
        {
          ...data,
          id: generateId(),
          createdAt: getNow(),
          updatedAt: getNow(),
        },
      ]);
    },
    [setPrompts],
  );

  const editPrompt = useCallback(
    (id: string, data: Partial<Omit<Prompt, "id">>) => {
      setPrompts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, ...data, updatedAt: getNow() } : p,
        ),
      );
    },
    [setPrompts],
  );

  const deletePrompt = useCallback(
    (id: string) => {
      setPrompts((prev) => prev.filter((p) => p.id !== id));
      // Also remove from favorites
      setFavorites((prev) => prev.filter((fid) => fid !== id));
    },
    [setPrompts, setFavorites],
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id],
      );
    },
    [setFavorites],
  );

  const resetToDefaults = useCallback(() => {
    setPrompts(DEFAULT_PROMPTS);
    setFavorites([]);
  }, [setPrompts, setFavorites]);

  return (
    <PromptContext.Provider
      value={{
        prompts,
        favorites: favoritesSet,
        addPrompt,
        editPrompt,
        deletePrompt,
        toggleFavorite,
        resetToDefaults,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
}

export function usePrompts(): PromptContextValue {
  const ctx = useContext(PromptContext);
  if (!ctx) {
    throw new Error("usePrompts must be used within PromptProvider");
  }
  return ctx;
}
