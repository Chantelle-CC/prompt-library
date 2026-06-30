import { Plus, Download, RotateCcw, LogOut, ShieldAlert } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { usePrompts } from "../context/PromptContext";
import { downloadJSON } from "../utils";

interface AdminBarProps {
  onAddNew: () => void;
}

export function AdminBar({ onAddNew }: AdminBarProps) {
  const { isAdmin, logout } = useAdmin();
  const { prompts, resetToDefaults } = usePrompts();

  const handleExport = () => {
    downloadJSON(
      prompts.map(({ id, title, content, tag, description, createdAt, updatedAt }) => ({
        id,
        title,
        content,
        tag,
        description,
        createdAt,
        updatedAt,
      })),
      `prompts-backup-${new Date().toISOString().slice(0, 10)}.json`,
    );
  };

  const handleReset = () => {
    if (window.confirm("确定要恢复为默认数据吗？当前的所有修改将丢失。")) {
      resetToDefaults();
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg font-medium">
        <ShieldAlert size={14} />
        管理员模式
      </span>

      <button
        onClick={onAddNew}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
      >
        <Plus size={16} />
        新增
      </button>

      <button
        onClick={handleExport}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
      >
        <Download size={16} />
        导出
      </button>

      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 rounded-lg transition-colors"
      >
        <RotateCcw size={16} />
        重置
      </button>

      <button
        onClick={logout}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors ml-auto"
      >
        <LogOut size={16} />
        退出管理
      </button>
    </div>
  );
}
