import { useState } from "react";
import { Modal } from "./Modal";
import { useAdmin } from "../context/AdminContext";
import { Lock } from "lucide-react";

interface AdminLoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ open, onClose }: AdminLoginModalProps) {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = login(password);
    if (ok) {
      setPassword("");
      onClose();
    } else {
      setError("密码错误，请重试");
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="管理员登录" width="max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center justify-center">
          <div className="p-3 bg-indigo-50 rounded-full">
            <Lock size={24} className="text-indigo-600" />
          </div>
        </div>
        <p className="text-sm text-slate-500 text-center">
          输入管理员密码以编辑 Prompt
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          placeholder="请输入密码"
          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
          autoFocus
          required
        />
        {error && (
          <p className="text-sm text-red-500 text-center -mt-2">{error}</p>
        )}
        <button
          type="submit"
          className="w-full py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
        >
          登录
        </button>
      </form>
    </Modal>
  );
}
