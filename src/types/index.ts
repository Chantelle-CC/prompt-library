export const TAG_KEYS = [
  "prd",
  "ui",
  "code",
  "debug",
  "review",
  "copywriting",
  "ops",
  "workflow",
  "aigc",
] as const;

export type TagKey = (typeof TAG_KEYS)[number];

export const TAG_LABELS: Record<TagKey, string> = {
  prd: "PRD / 需求",
  ui: "UI / 交互",
  code: "代码生成",
  debug: "调试 / 优化",
  review: "分析 / 复盘",
  copywriting: "内容 / 文案",
  ops: "内容运营",
  workflow: "工作流 / 提效",
  aigc: "AIGC 场景",
};

export const TAG_COLORS: Record<TagKey, string> = {
  prd: "bg-blue-50 text-blue-700 border-blue-200",
  ui: "bg-purple-50 text-purple-700 border-purple-200",
  code: "bg-emerald-50 text-emerald-700 border-emerald-200",
  debug: "bg-amber-50 text-amber-700 border-amber-200",
  review: "bg-sky-50 text-sky-700 border-sky-200",
  copywriting: "bg-pink-50 text-pink-700 border-pink-200",
  ops: "bg-orange-50 text-orange-700 border-orange-200",
  workflow: "bg-teal-50 text-teal-700 border-teal-200",
  aigc: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

export interface Prompt {
  id: string;
  title: string;
  content: string;
  tag: TagKey;
  description: string;
  createdAt: string;
  updatedAt: string;
}
