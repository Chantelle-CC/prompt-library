import { useState } from "react";
import { Star, Copy, Edit3, Trash2, Check } from "lucide-react";
import type { Prompt } from "../types";
import { TAG_LABELS, TAG_COLORS } from "../types";
import { copyToClipboard } from "../utils";
import { useAdmin } from "../context/AdminContext";

interface PromptCardProps {
  prompt: Prompt;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
  onCopied: () => void;
}

export function PromptCard({
  prompt,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
  onCopied,
}: PromptCardProps) {
  const { isAdmin } = useAdmin();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(prompt.content);
    if (ok) {
      setCopied(true);
      onCopied();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tagColor = TAG_COLORS[prompt.tag];

  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 truncate text-base">
            {prompt.title}
          </h3>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {/* Favorite button */}
          <button
            onClick={() => onToggleFavorite(prompt.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isFavorite
                ? "text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                : "text-slate-300 hover:text-amber-400 hover:bg-slate-100 opacity-0 group-hover:opacity-100"
            }`}
            title={isFavorite ? "取消收藏" : "收藏"}
          >
            <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={`p-1.5 rounded-lg transition-colors ${
              copied
                ? "text-emerald-600 bg-emerald-50"
                : "text-slate-300 hover:text-indigo-500 hover:bg-slate-100 opacity-0 group-hover:opacity-100"
            }`}
            title="复制 Prompt"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          {/* Admin actions */}
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(prompt)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-sky-500 hover:bg-sky-50 transition-colors"
                title="编辑"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`确定要删除「${prompt.title}」吗？`)) {
                    onDelete(prompt.id);
                  }
                }}
                className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="删除"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tag badge */}
      <span
        className={`self-start inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${tagColor}`}
      >
        {TAG_LABELS[prompt.tag]}
      </span>

      {/* Description */}
      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
        {prompt.description}
      </p>
    </div>
  );
}
