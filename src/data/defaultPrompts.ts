import type { Prompt } from "../types";

export const ADMIN_PASSWORD = "admin123";

export const DEFAULT_PROMPTS: Prompt[] = [
  {
    id: "demo-001",
    title: "PRD 文档生成器",
    content:
      "你是一位资深产品经理。请根据以下需求描述，生成一份完整的 PRD 文档。\n\n需求：{{requirement}}\n\n要求：\n1. 包含背景与目标\n2. 用户故事\n3. 功能需求列表\n4. 非功能需求\n5. 验收标准\n6. 优先级排序",
    tag: "prd",
    description: "根据需求描述自动生成完整的 PRD 文档",
    createdAt: "2025-06-01T08:00:00.000Z",
    updatedAt: "2025-06-01T08:00:00.000Z",
  },
  {
    id: "demo-002",
    title: "UI 设计评审助手",
    content:
      "你是一位资深 UI/UX 设计师。请对以下设计稿进行专业评审。\n\n设计稿描述：{{design_description}}\n\n请从以下维度分析：\n1. 视觉层级与信息架构\n2. 交互流畅度\n3. 一致性与设计规范\n4. 可访问性\n5. 改进建议（按优先级排序）",
    tag: "ui",
    description: "对 UI 设计稿进行多维度专业评审",
    createdAt: "2025-06-02T08:00:00.000Z",
    updatedAt: "2025-06-02T08:00:00.000Z",
  },
  {
    id: "demo-003",
    title: "React 组件代码生成",
    content:
      "你是一位资深前端工程师，精通 React 和 TypeScript。请根据以下需求生成组件代码。\n\n需求：{{requirement}}\n\n要求：\n1. 使用 TypeScript 严格模式\n2. 遵循 React 最佳实践（hooks、memo、useCallback）\n3. 包含完整的 Props 类型定义\n4. 处理加载、空、错误等边界状态\n5. 添加必要的注释",
    tag: "code",
    description: "根据需求描述生成规范的 React 组件代码",
    createdAt: "2025-06-03T08:00:00.000Z",
    updatedAt: "2025-06-03T08:00:00.000Z",
  },
  {
    id: "demo-004",
    title: "代码 Bug 诊断",
    content:
      "你是一位资深调试专家。请分析以下代码中的问题，并给出修复方案。\n\n代码：\n```\n{{code}}\n```\n\n错误信息：{{error_message}}\n\n请按以下格式输出：\n1. 问题根因\n2. 复现条件\n3. 修复方案（含代码 diff）\n4. 预防措施",
    tag: "debug",
    description: "分析代码问题并给出完整的修复方案",
    createdAt: "2025-06-04T08:00:00.000Z",
    updatedAt: "2025-06-04T08:00:00.000Z",
  },
  {
    id: "demo-005",
    title: "项目复盘报告",
    content:
      "你是一位项目管理专家。请根据以下项目信息，生成一份结构化的项目复盘报告。\n\n项目信息：{{project_info}}\n\n报告结构：\n1. 项目概况\n2. 目标达成情况\n3. 亮点与成功经验\n4. 问题与挑战\n5. 根因分析\n6. 改进措施与行动计划",
    tag: "review",
    description: "生成结构化的项目复盘报告",
    createdAt: "2025-06-05T08:00:00.000Z",
    updatedAt: "2025-06-05T08:00:00.000Z",
  },
  {
    id: "demo-006",
    title: "营销文案生成",
    content:
      "你是一位资深文案策划。请为以下产品/活动撰写营销文案。\n\n产品/活动信息：{{product_info}}\n目标受众：{{target_audience}}\n渠道：{{channel}}\n\n请提供 3 个不同风格的版本：\n1. 理性说服型（数据+卖点）\n2. 情感共鸣型（故事+场景）\n3. 简洁有力型（短句+节奏感）",
    tag: "copywriting",
    description: "为产品/活动生成多风格营销文案",
    createdAt: "2025-06-06T08:00:00.000Z",
    updatedAt: "2025-06-06T08:00:00.000Z",
  },
  {
    id: "demo-007",
    title: "小红书内容创作",
    content:
      "你是一位小红书资深运营，熟悉平台算法和用户偏好。请根据以下主题创作一篇小红书笔记。\n\n主题：{{topic}}\n目标人群：{{target}}\n\n要求：\n1. 标题吸引眼球（含 emoji，不超过 20 字）\n2. 正文分点清晰，语气亲切\n3. 包含 3-5 个相关话题标签\n4. 结尾引导互动",
    tag: "ops",
    description: "撰写符合小红书调性的高互动笔记",
    createdAt: "2025-06-07T08:00:00.000Z",
    updatedAt: "2025-06-07T08:00:00.000Z",
  },
  {
    id: "demo-008",
    title: "每日站会效率提升",
    content:
      "你是一位敏捷教练。请帮我设计一套高效的每日站会流程。\n\n团队规模：{{team_size}} 人\n团队角色：{{roles}}\n当前痛点：{{pain_points}}\n\n请输出：\n1. 站会流程设计（时间分配）\n2. 每个人的发言模板\n3. 阻塞项追踪方法\n4. 效果度量指标",
    tag: "workflow",
    description: "设计高效的团队每日站会流程",
    createdAt: "2025-06-08T08:00:00.000Z",
    updatedAt: "2025-06-08T08:00:00.000Z",
  },
  {
    id: "demo-009",
    title: "Midjourney 提示词优化",
    content:
      "你是一位 AI 绘画提示词专家，擅长 Midjourney。请帮我把以下画面描述转化为高质量的 Midjourney prompt。\n\n画面描述：{{description}}\n风格偏好：{{style}}\n\n要求：\n1. 使用英文输出（Midjourney 对英文理解最佳）\n2. 包含构图、光线、风格、画幅比等参数\n3. 添加合适的 --ar --style --v 等后缀参数\n4. 给出 2 个不同风格的变体",
    tag: "aigc",
    description: "将画面描述转化为高质量 Midjourney 提示词",
    createdAt: "2025-06-09T08:00:00.000Z",
    updatedAt: "2025-06-09T08:00:00.000Z",
  },
];
