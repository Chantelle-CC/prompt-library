import { useState } from "react";
import type { Prompt, TagKey } from "../types";
import { TAG_KEYS, TAG_LABELS } from "../types";

interface PromptFormProps {
  initial?: Prompt | null;
  onSubmit: (data: Omit<Prompt, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export function PromptForm({ initial, onSubmit, onCancel }: PromptFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [tag, setTag] = useState<TagKey>(initial?.tag ?? "prd");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [content, setContent] = useState(initial?.content ?? "");

  const isEdit = !!initial;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title: title.trim(), tag, description: description.trim(), content: content.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          标题 <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="简短描述这个 Prompt 的用途"
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
          required
        />
      </div>

      {/* Tag */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          分类标签
        </label>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value as TagKey)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
        >
          {TAG_KEYS.map((key) => (
            <option key={key} value={key}>
              {TAG_LABELS[key]}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          一句话场景
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="这个 Prompt 用于什么场景？"
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Prompt 内容 <span className="text-red-400">*</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="粘贴完整的 Prompt 文本..."
          rows={8}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all resize-y"
          required
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
        >
          {isEdit ? "保存修改" : "添加 Prompt"}
        </button>
      </div>
    </form>
  );
}
