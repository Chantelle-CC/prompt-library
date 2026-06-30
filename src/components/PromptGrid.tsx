import type { Prompt } from "../types";
import { PromptCard } from "./PromptCard";

interface PromptGridProps {
  prompts: Prompt[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
  onCopied: () => void;
}

export function PromptGrid({
  prompts,
  favorites,
  onToggleFavorite,
  onEdit,
  onDelete,
  onCopied,
}: PromptGridProps) {
  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-sm">没有找到匹配的 Prompt</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          isFavorite={favorites.has(prompt.id)}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
          onDelete={onDelete}
          onCopied={onCopied}
        />
      ))}
    </div>
  );
}
