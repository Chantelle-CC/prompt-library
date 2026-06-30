import { useState, useCallback } from "react";
import { Layout } from "./components/Layout";
import { SearchBar } from "./components/SearchBar";
import { PromptGrid } from "./components/PromptGrid";
import { AdminBar } from "./components/AdminBar";
import { AdminLoginModal } from "./components/AdminLoginModal";
import { Modal } from "./components/Modal";
import { PromptForm } from "./components/PromptForm";
import { AdminProvider } from "./context/AdminContext";
import { PromptProvider, usePrompts } from "./context/PromptContext";
import { useAdmin } from "./context/AdminContext";
import { useToast, ToastProvider } from "./components/Toast";
import { useFilteredPrompts } from "./hooks/useFilteredPrompts";
import type { Prompt, TagKey } from "./types";
import { Lock } from "lucide-react";

function AppInner() {
  const { prompts, favorites, addPrompt, editPrompt, deletePrompt, toggleFavorite } = usePrompts();
  const { isAdmin } = useAdmin();
  const { show } = useToast();

  const [activeTag, setActiveTag] = useState<TagKey | "all" | "favorites">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  const filtered = useFilteredPrompts({
    prompts,
    activeTag,
    searchQuery,
    favorites,
  });

  const handleEdit = useCallback((prompt: Prompt) => {
    setEditingPrompt(prompt);
    setFormModalOpen(true);
  }, []);

  const handleAddNew = useCallback(() => {
    setEditingPrompt(null);
    setFormModalOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    (data: Omit<Prompt, "id" | "createdAt" | "updatedAt">) => {
      if (editingPrompt) {
        editPrompt(editingPrompt.id, data);
      } else {
        addPrompt(data);
      }
      setFormModalOpen(false);
      setEditingPrompt(null);
    },
    [editingPrompt, editPrompt, addPrompt],
  );

  const handleDelete = useCallback(
    (id: string) => {
      deletePrompt(id);
    },
    [deletePrompt],
  );

  const handleCopied = useCallback(() => {
    show("已复制到剪贴板");
  }, [show]);

  return (
    <Layout
      prompts={prompts}
      favorites={favorites}
      activeTag={activeTag}
      onTagChange={setActiveTag}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          {!isAdmin ? (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-500 hover:text-indigo-600 hover:bg-white rounded-lg border border-slate-200 hover:border-indigo-200 transition-all"
            >
              <Lock size={14} />
              管理员登录
            </button>
          ) : (
            <AdminBar onAddNew={handleAddNew} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <PromptGrid
          prompts={filtered}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCopied={handleCopied}
        />
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      {/* Add/Edit Form Modal */}
      <Modal
        open={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingPrompt(null);
        }}
        title={editingPrompt ? "编辑 Prompt" : "新增 Prompt"}
      >
        <PromptForm
          initial={editingPrompt}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormModalOpen(false);
            setEditingPrompt(null);
          }}
        />
      </Modal>
    </Layout>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <PromptProvider>
        <ToastProvider>
          <AppInner />
        </ToastProvider>
      </PromptProvider>
    </AdminProvider>
  );
}
