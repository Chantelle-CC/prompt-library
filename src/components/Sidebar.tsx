import type { TagKey, Prompt } from "../types";
import { TAG_KEYS, TAG_LABELS } from "../types";

interface SidebarProps {
  prompts: Prompt[];
  favorites: Set<string>;
  activeTag: TagKey | "all" | "favorites";
  onTagChange: (tag: TagKey | "all" | "favorites") => void;
}

export function Sidebar({
  prompts,
  favorites,
  activeTag,
  onTagChange,
}: SidebarProps) {
  const countByTag = (tag: TagKey) =>
    prompts.filter((p) => p.tag === tag).length;

  const items: { key: TagKey | "all" | "favorites"; label: string; count: number; isSpecial?: boolean }[] =
    [
      { key: "all", label: "全部", count: prompts.length },
      ...TAG_KEYS.map((key) => ({
        key: key as TagKey,
        label: TAG_LABELS[key as TagKey],
        count: countByTag(key as TagKey),
      })),
      { key: "favorites", label: "⭐ 收藏", count: favorites.size, isSpecial: true },
    ];

  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item) => {
        const isActive = activeTag === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onTagChange(item.key)}
            className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left ${
              isActive
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <span className="flex-1 truncate">
              {item.isSpecial ? item.label : item.label}
            </span>
            <span
              className={`inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full text-xs font-medium ${
                isActive
                  ? "bg-indigo-200/60 text-indigo-700"
                  : "bg-slate-200 text-slate-500 group-hover:bg-slate-300"
              }`}
            >
              {item.count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
