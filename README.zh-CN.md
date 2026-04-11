# 💰 Show Me The Money

[English](README.md) | [中文](README.zh-CN.md)

**AI 智能体技能，自主构建和运营你的商业 —— 从创意到收入，全天候运行。**

> 一条命令。14 个智能体技能。从零到盈利。

Show Me The Money 是一套开源的 [Claude Code](https://claude.ai/code) 技能套件，兼容主流 AI 编程智能体。它将你的 AI 助手变成一个全栈商业操作系统 —— 发现机会、验证需求、构建产品、运营营销、管理广告，并全自主运行。

支持 **Claude Code**、**Codex CLI**、**Gemini CLI** 及其他兼容智能体。

## 快速开始

```bash
npx @orrisai/show-me-the-money
```

然后打开 Claude Code 并输入：

```
/money
```

就这样。AI 会自动引导你，构建你的画像，并带你完成每一步。

## 功能概览

```
📧 入职引导          从公开数据构建你的用户画像
       │
       ▼
💡 发现商机          扫描市场，验证需求，找到切入点
       │
       ▼
📊 制定策略          市场研究，SWOT，4P，商业模式，GTM 方案
       │
       ▼
🔨 构建产品          发布 MVP：落地页、支付、SEO 优化
       │
       ▼
📈 增长引擎          内容、社交、外展、SEO、广告 —— 全自动
       │
       ▼
🤖 全天候运营         自主运营、监控、财务报告
       │
       ▼
💵 收入
```

### 完整流水线

1. **入职引导** — 分享邮箱和社媒账号，AI 自动调研你的背景，构建个性化画像
2. **发现** (`/money-discover`) — 扫描市场空白，用 6 个验证问题验证需求，5 层过滤评估 + 竞品情报协议
3. **策略** (`/money-strategy`) — 前提解构协议 + 完整市场研究报告：SWOT、4P、商业模式压力测试、GTM 方案
4. **诊断** (`/money-diagnose`) — 深度商业诊断：问题解构漏斗、假设审计、执行力辅导
5. **产品** (`/money-product`) — 构建并部署 MVP：落地页、认证、支付、SEO/GEO、QA 测试、金丝雀监控
6. **质量** (`/money-quality`) — 上线前质量门：代码审查、安全审计、性能检查、可访问性
7. **内容** (`/money-content`) — 博客、邮件、社交、视频脚本 — 经过 5 维诊断 + 真实性审计 + 标题影响力矩阵
8. **外展** (`/money-outreach`) — 冷邮件序列、合作伙伴拓展、个性化潜客开发
9. **社交** (`/money-social`) — 跨 X、LinkedIn、Reddit、Product Hunt 社交媒体管理，配合 Hook 写作框架
10. **SEO** (`/money-seo`) — 传统 SEO + GEO（ChatGPT、Perplexity、Gemini 的 AI 搜索优化）
11. **广告** (`/money-ads`) — Google Ads、Meta Ads — 投放设置、优化、ROAS 追踪
12. **运营** (`/money-ops`) — 全天候自主运营 + 商业健康评分 + 安全护栏
13. **财务** (`/money-finance`) — 收入追踪、单位经济、财务报告

## 为什么做这个

大多数 AI 商业工具只给你泛泛的建议。Show Me The Money 给你**可执行的工作流** —— 每个技能都产出具体行动，而不仅仅是分析。每个阶段都以"明天的第一个行动：[具体任务]"结尾。

**核心差异：**
- **个性化** — 自动调研你的背景，所有建议都针对你量身定制
- **验证框架** — 集成实战方法论：前提解构协议、6 问需求验证、5 层机会评分、商业模式压力测试、5 维内容诊断、12 信号真实性审计、标题影响力矩阵
- **全栈覆盖** — 覆盖整个商业生命周期，而不仅仅是某一环
- **收入导向** — 每条建议都与赚钱挂钩，没有废话
- **自主运行** — 设置一次，通过 `/money-ops` 全天候运行
- **开源** — CC BY-NC 4.0 许可证。个人使用免费。自定义、扩展、贡献

## 安装

### 通过 npx（推荐）

```bash
npx @orrisai/show-me-the-money
```

自动将全部 14 个技能安装到 `~/.claude/skills/`。

### 通过 npm（全局安装）

```bash
npm install -g @orrisai/show-me-the-money
```

### 手动安装

```bash
git clone https://github.com/iamzifei/show-me-the-money.git ~/.claude/skills/show-me-the-money
cd ~/.claude/skills/show-me-the-money && node install.js
```

### 更新

```bash
npx @orrisai/show-me-the-money update
```

自动检查最新版本、下载并重新安装所有技能。

## 技能列表

| 技能 | 命令 | 功能说明 |
|------|------|----------|
| **路由器** | `/money` | 用户引导、画像构建、智能信号路由 |
| **发现** | `/money-discover` | 发现并验证盈利商机 + 竞品情报 |
| **策略** | `/money-strategy` | 前提解构 + 市场研究 + 商业模式压力测试 |
| **诊断** | `/money-diagnose` | 深度商业诊断：根因分析 + 执行力辅导 |
| **产品** | `/money-product` | 构建、部署、QA 测试、金丝雀监控 |
| **质量** | `/money-quality` | 代码审查、安全审计、性能检查、上线前门禁 |
| **内容** | `/money-content` | 内容管线 + 真实性审计 + 标题影响力矩阵 |
| **外展** | `/money-outreach` | 冷邮件序列、合作伙伴拓展 |
| **社交** | `/money-social` | 社交媒体管理 + Hook 写作框架 |
| **SEO** | `/money-seo` | SEO + GEO 优化 |
| **广告** | `/money-ads` | Google Ads、Meta Ads — 设置、优化、ROAS |
| **运营** | `/money-ops` | 全天候运营 + 健康评分 + 安全护栏 |
| **财务** | `/money-finance` | 收入追踪和财务报告 |
| **升级** | `/money-upgrade` | 更新到最新版本 |

## 使用示例

### 从零开始
```
/money
→ 分享你的邮箱和 X 账号
→ AI 调研你的背景
→ 跟随引导流水线
```

### 验证商业创意
```
/money-discover "我是一个会做网页应用的开发者"
```

### 获取完整市场研究报告
```
/money-strategy "提供 AI 图像生成的 API 产品"
```

### 构建并发布产品
```
/money-product "邮件分析 SaaS 工具，$29/月"
```

### 启动内容引擎
```
/money-content "为我在 example.com 的产品创建发布内容方案"
```

### 自动化一切
```
/money-ops "为我在 example.com 的产品自动化内容、社交和 SEO"
```

## 兼容性

Show Me The Money 兼容任何支持 `~/.claude/skills/` 技能系统的 AI 编程智能体：

- **Claude Code**（首选）
- **Codex CLI**
- **Gemini CLI**
- **Cursor**（通过 skills）
- **其他兼容智能体**

## 工作原理

基于 [Claude Code 技能系统](https://docs.anthropic.com/en/docs/claude-code/skills) 构建。每个技能是一个 `SKILL.md` 文件，包含分步工作流、商业框架和决策树，AI 自主遵循执行。

```
~/.claude/skills/
├── money/SKILL.md              ← 路由器 + 用户引导 + 智能信号路由
├── money-discover/SKILL.md     ← 创意发现 + 竞品情报
├── money-strategy/SKILL.md     ← 前提解构 + 市场研究
├── money-diagnose/SKILL.md     ← 商业诊断 + 执行力辅导
├── money-product/SKILL.md      ← 产品构建 + QA + 金丝雀监控
├── money-quality/SKILL.md      ← 代码审查 + 安全 + 性能门禁
├── money-content/SKILL.md      ← 内容管线 + 真实性审计
├── money-outreach/SKILL.md     ← 销售与外展
├── money-social/SKILL.md       ← 社交媒体
├── money-seo/SKILL.md          ← SEO 与 GEO
├── money-ads/SKILL.md          ← 付费广告
├── money-ops/SKILL.md          ← 全天候运营 + 健康评分
├── money-finance/SKILL.md      ← 财务追踪
└── money-upgrade/SKILL.md      ← 版本管理
```

## 卸载

```bash
npx @orrisai/show-me-the-money uninstall
```

## 贡献

1. Fork 本仓库
2. 创建功能分支
3. 编辑 `skills/` 中的 SKILL.md 文件
4. 复制到 `~/.claude/skills/` 并在 Claude Code 中测试
5. 提交 PR

欢迎所有贡献 — 新技能、框架改进、语言支持、Bug 修复。

## 许可证

CC BY-NC 4.0（知识共享 署名-非商业性使用 4.0）

- 个人/学习/研究：自由使用
- 公开衍生作品：需注明来源
- 商业用途：需单独授权
