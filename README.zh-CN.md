<p align="center">
  <img src="https://pbs.twimg.com/media/HFoAbmGawAAdzJm?format=jpg&name=large" alt="Show Me The Money — 独立创业者的全自主商业操作系统" width="100%" />
</p>

# 💰 Show Me The Money

[![npm version](https://img.shields.io/npm/v/@orrisai/show-me-the-money?label=npm&color=blue)](https://www.npmjs.com/package/@orrisai/show-me-the-money)
[![Latest release](https://img.shields.io/github/v/release/iamzifei/show-me-the-money?label=release&color=green)](https://github.com/iamzifei/show-me-the-money/releases)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/license-CC%20BY--NC%204.0-orange.svg)](LICENSE)

**当前版本：`v2.5.1`** · [更新内容 →](#-v251-更新内容) · [完整历史 →](CHANGELOG.zh-CN.md)

[English](README.md) | [中文](README.zh-CN.md)

**AI 智能体技能套件 —— 自主构建并运营你的商业，从创意到收入，全天候在线。**

> 一条命令。25 个智能体技能。从零到盈利。

**作者** · [X / @jamesai](https://x.com/jamesai) · [小红书 / 在悉尼和稀泥](https://www.xiaohongshu.com/user/profile/5af26425e8ac2b0a9bc030d2)

---

## 🎯 战绩 — 实打实的数据

我是一名独立创始人，**同时在运营 6 个 SaaS 产品** —— API、开发者工具、消费级应用，全部在过去 32 个月里发布。

跨这 6 个产品，当下的工作数字是：

```
💰  $1M+         全部产品的累计收入
💳  6,500+       完成支付的交易数
👥  10,000+      累计付费用户
🚢  6            上线运行中的 SaaS 产品
⏱   32 个月     从第一笔 1 美元到今天
🧑   1 个人      没有团队、没有员工，只有 AI 智能体
```

这其中**没有一个**是用市场团队、销售部门或内容代理跑出来的。就是我一个人、一台电脑、Claude Code 终端常年开着。

这个仓库里的 25 个技能，就是我用来运营自己生意的**实际操作系统**。不是课程、不是框架 —— 是我自己每天在用的可执行代码。每个技能都被用过来交付一个真实在跑、真实在 Stripe 收款的产品。

**这不是空想的方法论手册。这是支撑我整个公司运转的代码。**

如果你是独立创业者、indie hacker 或想以 20 人团队节奏出货的技术型创始人 —— 这是你能拿到的最接近"复制我整个工作流"的东西。

---

Show Me The Money 是一套开源的 [Claude Code](https://claude.ai/code) 技能套件，兼容主流 AI 编程智能体。它将你的 AI 助手变成一个全栈商业操作系统 —— 发现机会、验证需求、构建产品、运营营销、管理广告、全天候自主运行，**并且记得你在每一次会话中做出的每一个决定**。

支持 **Claude Code**、**Codex CLI**、**Gemini CLI**，以及其他兼容 skill 系统的智能体。

---

## ✨ v2.5.1 更新内容

v2.5.0 发布之后的小修小补：

- **Value Quantification 块在终端 Markdown 渲染器中现在能正确显示。** 之前用的空表头两列表格（`| | |`）在 Claude Code 的终端渲染里会塌陷成 "Column 1 / Column 2" 的文本形式。已把 13 个 SKILL.md 文件统一改成"加粗前缀的项目符号列表" —— 终端、GitHub 以及任何其他 Markdown 阅读器都能正常渲染。在 `/money` 模板里加了规则，禁止未来再用空表头表格形式。
- **"更新内容"历史抽到独立的 changelog 文件。** 旧版本的发布说明之前内嵌在 README 里，越积越长。现在迁到 [CHANGELOG.zh-CN.md](CHANGELOG.zh-CN.md)（英文版：[CHANGELOG.md](CHANGELOG.md)）。README 首页只保留当前版本的更新内容。

### 历史版本？

- [v2.5.0](CHANGELOG.zh-CN.md#v250--2026-05-11) —— 业务类型感知（7 种）+ `/money-strategy iterate` 后 PMF 迭代模式
- [v2.4.0](CHANGELOG.zh-CN.md#v240--2026-05-10) —— 运行模式、最窄一注、出版生命周期、STRIDE、组合学习、自动更新
- [v2.3.1](CHANGELOG.zh-CN.md#v231--2026-05-03) —— 原子打磨、技能级提示、工作流修复
- [v2.3.0](CHANGELOG.zh-CN.md#v230--2026-05-03) —— 创始人原子知识库
- [v2.2.0](CHANGELOG.zh-CN.md#v220--2026-04) —— 评审委员会 + 跨会话学习
- [v2.1.0](CHANGELOG.zh-CN.md#v210) —— 跨会话状态管理

完整历史 → [CHANGELOG.zh-CN.md](CHANGELOG.zh-CN.md)

---

## 🚀 快速开始

### 方式 1 — Claude Code 插件市场

```bash
claude plugin marketplace add iamzifei/show-me-the-money
claude plugin install money@show-me-the-money
```

### 方式 2 — npx（任意智能体均可）

```bash
npx @orrisai/show-me-the-money
```

然后打开 Claude Code（或 Codex CLI / Gemini CLI）输入：

```
/money
```

就这样。AI 会自动检查是否有先前会话状态、为新用户做引导、带你完成每一步。

---

## 🧭 它能做什么

```
📧 入职引导          基于公开数据构建你的画像
       │
       ▼
💡 发现商机          扫描市场、验证需求、找到你的切入点
       │
       ▼
📊 制定策略          市场研究、SWOT、4P、商业模式、GTM 方案
       │
       ▼
🔨 构建产品          落地页、支付、SEO/GEO 一键 MVP
       │
       ▼
📈 增长引擎          内容、社交、外展、SEO、广告 —— 全自动
       │
       ▼
🤖 全天候运营         自主运营、监控、财务报告
       │
       ▼
💾 持久化            /money-save → /money-restore → /money-report
       │
       ▼
💵 收入
```

### 完整流水线

1. **入职引导** — 分享邮箱和社媒账号，AI 自动调研你的背景，构建个性化画像
2. **发现** (`/money-discover`) — 扫描市场空白，6 个验证问题确认需求，5 层过滤评估 + 竞品情报协议
3. **策略** (`/money-strategy`) — 前提解构 + 完整市场研究报告：SWOT、4P、商业模式压力测试、GTM 方案
4. **产品** (`/money-product`) — 构建并部署 MVP：落地页、认证、支付、SEO/GEO、QA、金丝雀监控
5. **质量** (`/money-quality`) — 上线前质量门：代码审查、QA 测试、安全审计、性能、可访问性
6. **内容** (`/money-content`) — 博客、邮件序列、社交、视频脚本，配 5 维质量诊断 + 12 信号真实性审计 + 标题影响力矩阵
7. **外展** (`/money-outreach`) — 冷邮件序列、合作拓展、个性化潜客
8. **社交** (`/money-social`) — X / LinkedIn / Reddit / Product Hunt 跨平台运营，Hook 写作框架加持
9. **SEO** (`/money-seo`) — 传统 SEO + GEO（ChatGPT、Perplexity、Gemini 等 AI 搜索优化）
10. **广告** (`/money-ads`) — Google Ads、Meta Ads —— 投放设置、优化、ROAS 追踪
11. **运营** (`/money-ops`) — 全天候自主运营 + 商业健康评分 + 金丝雀监控 + 安全护栏
12. **财务** (`/money-finance`) — 收入追踪、单位经济、财务报告
13. **诊断** (`/money-diagnose`) — 业务卡住时深度诊断：问题解构、假设审计、执行力辅导，带 Iron Law 阶段门
14. **保存 / 恢复 / 报告** (`/money-save`、`/money-restore`、`/money-report`) — 跨会话状态管理：检查点 + 续接 + 多月进展合并成一份可分享的交付物

---

## 🌟 为什么做这个

大多数 AI 商业工具只给你泛泛的建议。Show Me The Money 给你**可执行的工作流** —— 每个技能都产出具体行动，不只是分析。每个阶段都以"明天的第一个行动：[具体任务]"收尾。

**核心差异：**

- **个性化** — 自动调研你的背景，所有建议针对你量身定制
- **被验证过的框架** — 实战方法论：前提解构、6 问需求验证、5 层机会评分、商业模式压力测试、5 维内容诊断、12 信号真实性审计、标题影响力矩阵
- **全栈覆盖** — 覆盖完整商业生命周期，不止某一环
- **收入导向** — 每条建议都连回赚钱，没有废话
- **持久化记忆** — 决策、被排除的方向、正在测的假设，通过 `/money-save` 跨会话留存
- **创始人级判断** — 通过 `/money-learn`（项目级）+ 创始人原子库（全局），AI 越用越像你的脑子
- **自主运行** — 一次配置，通过 `/money-ops` 全天候运行
- **开源** — CC BY-NC 4.0 协议。个人使用免费。可定制、可扩展、欢迎贡献

---

## 📦 安装

### 通过 Claude Code 插件市场（Claude Code 用户推荐）

```bash
claude plugin marketplace add iamzifei/show-me-the-money
claude plugin install money@show-me-the-money
```

之后更新：

```bash
claude plugin marketplace update show-me-the-money
claude plugin update money@show-me-the-money
/reload-plugins
```

### 通过 npx（任意智能体均可 —— Claude Code、Codex、Gemini）

```bash
npx @orrisai/show-me-the-money
```

自动将全部 25 个技能安装到 `~/.claude/skills/`。

之后更新，跑同一条命令即可：

```bash
npx @orrisai/show-me-the-money
```

### 通过 npm（全局安装）

```bash
npm install -g @orrisai/show-me-the-money
```

### 手动安装

```bash
git clone https://github.com/iamzifei/show-me-the-money.git ~/.claude/skills/show-me-the-money
cd ~/.claude/skills/show-me-the-money && node install.js
```

---

## 🛠 技能列表

### 核心（路由、状态、学习）

| 技能 | 命令 | 功能 |
|------|------|------|
| **路由器** | `/money` | 用户引导、画像构建、检查先前状态、智能信号路由 |
| **保存** | `/money-save` | 把当前业务状态检查点写入 `~/.smtm/sessions/{project}/` |
| **恢复** | `/money-restore` | 从先前的检查点续接，无需重新解释 |
| **报告** | `/money-report` | 把所有保存的状态合并成可交付的 markdown 报告 |
| **学习** | `/money-learn` | 管理项目级原子学习 + 跨项目共享的组合学习层 |
| **固化技能** | `/money-skillify` | 把一段成功的工作流固化为项目级可复用技能 |
| **升级** | `/money-upgrade` | 自动更新：查 npm、下载、替换、读 CHANGELOG、提示重启 |

### 发现 · 策略 · 诊断 · 评审

| 技能 | 命令 | 功能 |
|------|------|------|
| **发现** | `/money-discover` | 发现并验证盈利商机 + 竞品情报；末尾给出明天就能展示的"最窄一注"赌注 |
| **策略** | `/money-strategy` | 逐词清晰度审计 + 模糊转可测量目标 + 市场研究 + 商业模式压力测试 |
| **诊断** | `/money-diagnose` | 业务卡住时找根因，不是症状（带 Iron Law 阶段门） |
| **评审委员会** | `/money-panel` | 4 个评审一起跑（+ 可选 `--add` 自定义角色），只把品味分歧抛给你 |
| **投资人评审** | `/money-review-investor` | VC 视角的融资可行性评判 |
| **客户评审** | `/money-review-customer` | 指定 ICP 视角的付费意愿评判 |
| **操盘手评审** | `/money-review-operator` | 独立创始人执行可行性 + 架构与数据流压力测试 |
| **质疑者评审** | `/money-review-skeptic` | 红队式质疑评审 |

### 构建 · 质量

| 技能 | 命令 | 功能 |
|------|------|------|
| **产品** | `/money-product` | DESIGN.md 设计契约、构建、出版生命周期（VERSION + CHANGELOG + 发布说明）、部署、QA、金丝雀 |
| **质量** | `/money-quality` | 代码审查、OWASP + STRIDE 安全、性能、上线前门禁、技术分诊调试模式 |

### 增长

| 技能 | 命令 | 功能 |
|------|------|------|
| **内容** | `/money-content` | 内容管线 + 真实性审计 + 标题影响力矩阵 + Hook & 标题模式库 + 发布说明模式 |
| **外展** | `/money-outreach` | 冷邮件序列、合作伙伴拓展 |
| **社交** | `/money-social` | 社交媒体管理 + Hook 写作框架 |
| **SEO** | `/money-seo` | SEO + GEO 优化（含 AI 搜索） |
| **广告** | `/money-ads` | Google Ads、Meta Ads —— 设置、优化、ROAS |

### 运营 · 复盘

| 技能 | 命令 | 功能 |
|------|------|------|
| **运营** | `/money-ops` | 全天候运营 + 健康评分 + 运行模式（open/staging/production）+ 编辑边界 + 紧急停止 |
| **财务** | `/money-finance` | 收入追踪、财务报告 |
| **复盘** | `/money-retro` | 周复盘：决定 / 出货 / 卡住 / 未用技能 / 焦点 |

---

## 💡 使用示例

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

### 锁定决策，下次继续

```
/money-discover "..."
→ AI 验证切入点，你确认定价
/money-save                       ✅ 切入点 + 定价已检查点

   …一周后，新的 Claude Code 会话…

/money-restore                    📦 从你上次离开的地方继续
/money-strategy                   → 在此基础上构建 GTM
```

### 给联合创始人生成交付物

```
/money-report
→ 把你跨数周或数月保存的所有检查点合并成一份
   可分享的 markdown 报告，输出到 ~/.smtm/reports/{project}/
```

---

## 🌐 兼容性

Show Me The Money 兼容任何支持 `~/.claude/skills/` 技能系统或 Claude Code 插件市场的 AI 编程智能体：

- **Claude Code**（首选，完整插件市场支持）
- **Codex CLI**
- **Gemini CLI**
- **Cursor**（通过 skills）
- **其他兼容智能体**

---

## 🏗 工作原理

基于 [Claude Code 技能系统](https://docs.anthropic.com/en/docs/claude-code/skills) 构建。每个技能是一个 `SKILL.md` 文件，包含分步工作流、商业框架、决策树，AI 自主遵循执行。

```
~/.claude/skills/
├── money/SKILL.md                ← 路由器 + 入职引导 + 先前状态检查
├── money/knowledge/atoms/        ← 创始人原子知识库（v2.3 起随包发布）
├── money-discover/SKILL.md       ← 创意发现 + 竞品情报
├── money-strategy/SKILL.md       ← 前提解构 + 市场研究
├── money-diagnose/SKILL.md       ← 业务诊断 + 执行力辅导（含 Iron Law）
├── money-panel/SKILL.md          ← 4 评审编排器
├── money-review-{investor,customer,operator,skeptic}/SKILL.md
│                                 ← 4 个独立评审角色
├── money-product/SKILL.md        ← 产品构建 + QA + 金丝雀
├── money-quality/SKILL.md        ← 代码审查 + 安全 + 性能门禁
├── money-content/SKILL.md        ← 内容管线 + 真实性审计
├── money-outreach/SKILL.md       ← 销售与外展
├── money-social/SKILL.md         ← 社交媒体
├── money-seo/SKILL.md            ← SEO 与 GEO
├── money-ads/SKILL.md            ← 付费广告
├── money-ops/SKILL.md            ← 全天候运营 + 健康评分
├── money-finance/SKILL.md        ← 财务追踪
├── money-save/SKILL.md           ← 跨会话检查点写入
├── money-restore/SKILL.md        ← 跨会话状态加载
├── money-report/SKILL.md         ← 交付物报告生成
├── money-learn/SKILL.md          ← 项目级学习管理
├── money-retro/SKILL.md          ← 周复盘
├── money-skillify/SKILL.md       ← 工作流固化为项目级技能
└── money-upgrade/SKILL.md        ← 版本管理
```

状态文件落在 `~/.smtm/sessions/{project}/`（按项目、追加写）和 `~/.smtm/reports/{project}/`（带时间戳、永不覆写）。学习落在 `~/.smtm/projects/{project}/learnings.jsonl`。原子库随包发布，运行时只读。

---

## 🗑 卸载

```bash
npx @orrisai/show-me-the-money uninstall
```

---

## 🤝 贡献

1. Fork 本仓库
2. 创建功能分支
3. 编辑 `skills/` 中的 `SKILL.md` 文件
4. 复制到 `~/.claude/skills/` 并在 Claude Code 中测试
5. 提交 PR

欢迎所有贡献 —— 新技能、框架改进、语言支持、Bug 修复。

---

## 📄 许可证

CC BY-NC 4.0（知识共享 署名-非商业性使用 4.0）

- 个人 / 学习 / 研究：自由使用
- 公开衍生作品：需注明来源
- 商业用途：需单独授权
