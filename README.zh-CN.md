<p align="center">
  <img src="https://pbs.twimg.com/media/HFoAbmGawAAdzJm?format=jpg&name=large" alt="Show Me The Money — 独立创业者的全自主商业操作系统" width="100%" />
</p>

# 💰 Show Me The Money

[![npm version](https://img.shields.io/npm/v/@orrisai/show-me-the-money?label=npm&color=blue)](https://www.npmjs.com/package/@orrisai/show-me-the-money)
[![Latest release](https://img.shields.io/github/v/release/iamzifei/show-me-the-money?label=release&color=green)](https://github.com/iamzifei/show-me-the-money/releases)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/license-CC%20BY--NC%204.0-orange.svg)](LICENSE)

**当前版本：`v2.3.1`** · [更新内容 →](#-v231-更新内容)

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

## ✨ v2.3.1 更新内容

**v2.3.0 原子发布之后的打磨补丁。** 落地 5 件事：

1. **原子库 258 → 276** —— 把单条蒸馏超时从 90s 提到 180s，重跑了 26 条首次失败的推文，回收了其中 18 条（多数是长的中文 thread，需要更多推理时间）。
2. **每个技能现在都有原子加载提示** —— 每一个非路由技能在文件顶部都有一条 Standard-startup 提示，声明它要加载哪个原子切片，并提醒 AI 在直接由原子驱动建议时用 `A-{id}` 引用。之前这条规约只写在 `skills/money/SKILL.md` 里、下游技能隐式继承；现在每个文件自包含。
3. **发布工作流步骤顺序修复** —— 自动发布工作流里 `Extract release notes` 现在跑在 `Publish to npm` **之前**。修之前如果 notes 抽取失败，会留下一个"已发到 npm 但没有 GitHub Release"的孤儿版本（v2.3.0 上线时就遇到了这个问题）。现在 notes 失败可以干净回滚。
4. **中文 README 完整对齐** —— `README.zh-CN.md` 之前还是 v1.x 时代的页面（14 个技能、无 banner、无战绩叙事）。已与英文版逐行对齐，包含 v2.1/2.2/2.3 的所有发布说明和创始人战绩数据。
5. **`printf -- '...'` 修复** —— 已在 2.3.0 中发布，值得再点一下：自动发布工作流里的 `printf '----...'` 分隔符在第一次真实运行时撞上 bash 的选项解析，npm 发布前就退出了。现在防弹。

没有新技能、没有从 #1 之外来源新增的原子。属于纯库健康度补丁。

---

## ✨ v2.3.0 更新内容

**创始人原子知识库随包发布。** 每一个 money-* 技能在启动时都会自动加载从多年独立 SaaS 实战笔记中蒸馏出的原子原则 —— 把经过实战检验的判断直接嵌入 AI 助手的工作上下文。

### 新增内容

```
skills/money/knowledge/atoms/
  atoms.jsonl                              ← 完整原子库
  atoms_solopreneur_psychology.jsonl       ← 创业者心态、行动阈值、专注度
  atoms_market_observation.jsonl           ← 市场迁移、渠道动态、行业拐点
  atoms_agent_infra.jsonl                  ← AI 智能体、技能设计、自动化基础设施
  atoms_growth_tactics.jsonl               ← 外展、广告 ROI、定价、转化实验
  atoms_content_meta.jsonl                 ← 内容策略、AI 内容陷阱、定位叙事
```

每条原子都是一句陈述性原则：一个市场观察、一个反主流判断、一个用代价换来的具体战术。蒸馏自多年的实战笔记 —— 不是观点博客。

### 这意味着什么

过去每次会话技能都要重新推导出同样的结论。现在 `/money-discover` 一启动就已经知道哪些市场形态对独立创始人是陷阱；`/money-content` 已经知道哪些 AI 内容模式会毁掉品牌定位；`/money-diagnose` 在用户的失败模式匹配到已知原子时会直接引用它 —— 任何建议都可以追溯回原始观察。

当某条建议直接由原子驱动时，技能会用 ID 引用它：

> "在这里选 $29/月的消费级切入点会踩中 **A-bce2** 的陷阱 —— Agent 基础设施正在 12 个月内把消费 App 推向无 UI 的纯 API 形态。"

点开来源链接你能看到原始观察、日期、原始上下文。

### 现在有了两层记忆

- **原子（本次发布）** —— 全局、由创始人维护、随包发布、运行时只读。承载通用原则。
- **学习（v2.2 引入）** —— 项目级、按 slug 自动捕获、可变。承载本项目特有的模式。

合在一起：每个技能启动时既有**通用经营智慧**，也有**对这个特定生意我们已经学到的东西**。

### 维护者侧：增量蒸馏

产出原子的管线（`scripts/x-distill.mjs`，gitignored，仅维护者可见）是增量的 —— 后续运行只处理新内容，所以语料库会自然生长，无需重跑全档。

---

## ✨ v2.2.0 更新内容

**评审委员会 + 跨会话学习。** 8 个新技能，加上把过往洞见自动加载进每一次未来会话的能力。

### 计划评审擂台

大多数独立创始人会把自己的计划自我说服成"绿灯通行"，然后跑 6 个月才发现结构性缺陷。现在有 4 个独立评审角色 —— 各自完整人格 —— 加 1 个总编排：

```
/money-review-investor   ← 投资人模式：SEED VIABLE / LATER ROUND / BOOTSTRAP-ONLY / UNFUNDABLE
/money-review-customer   ← 指定 ICP 模式：PAY NOW / WITH FRICTION / WRONG POSITIONING / WRONG ICP
/money-review-operator   ← 单人执行模式：SHIPPABLE / DESCOPE / NEEDS HIRE / WRONG STACK
/money-review-skeptic    ← 质疑者：EXISTENTIAL / SOLVABLE / LOW-RISK / WRONG QUESTION
/money-panel             ← 一次跑齐 4 个，找一致项，只把品味分歧抛给你
```

一条命令跑完整套擂台，只在边界判断处停下来等你拍板。

### 跨会话学习，终于落地

```
/money-learn       ← 原子化、被验证过的模式，自动注入每个其他技能
/money-retro       ← 周复盘：决定 / 出货 / 卡住 / 未用技能 / 焦点
/money-skillify    ← 把成功的工作流固化为项目级技能
```

每个 money-* 技能现在都会在启动时自动加载相关学习。AI 在一次次会话中越来越懂你的项目，而不是每次冷启动从零开始。

### /money-diagnose 的铁律（Iron Law）

`/money-diagnose` 现在按 **4 个明确阶段**运行（调查 → 分析 → 假设 → 建议），并在第 3 阶段设硬门：**未经用户明确确认根因假设之前，不允许给建议。** 这堵住了诊断技能最常见的失败模式 —— AI 80% 自信、用户客气地"嗯对"了一下、然后 30 分钟的建议全部射偏目标。

技能里有可选的 Claude Code 钩子，做工具级强制，文档已附。

---

## ✨ v2.1.0 更新内容

**跨会话状态管理。** 三个技能 —— `/money-save`、`/money-restore`、`/money-report` —— 把每一次对话变成一个检查点。上周敲定的定价、被排除的方向、正在测的假设，全部跨 Claude Code 会话留存。

```
session 1  →  /money-discover  →  /money-save     ✅ 切入点已锁定
   …一周过去…
session 2  →  /money-restore   →  从这里继续        📦 不需要重新解释
           →  /money-strategy  →  /money-save     ✅ 定价已锁定
   …一个月过去…
session N  →  /money-report                        📄 全量交付物
```

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
| **学习** | `/money-learn` | 管理项目级原子学习（自动注入每个其他技能） |
| **固化技能** | `/money-skillify` | 把一段成功的工作流固化为项目级可复用技能 |
| **升级** | `/money-upgrade` | 更新到最新版本 |

### 发现 · 策略 · 诊断 · 评审

| 技能 | 命令 | 功能 |
|------|------|------|
| **发现** | `/money-discover` | 发现并验证盈利商机 + 竞品情报 |
| **策略** | `/money-strategy` | 前提解构 + 市场研究 + 商业模式压力测试 |
| **诊断** | `/money-diagnose` | 业务卡住时找根因，不是症状（带 Iron Law 阶段门） |
| **评审委员会** | `/money-panel` | 4 个评审一起跑，只把品味分歧抛给你 |
| **投资人评审** | `/money-review-investor` | VC 视角的融资可行性评判 |
| **客户评审** | `/money-review-customer` | 指定 ICP 视角的付费意愿评判 |
| **操盘手评审** | `/money-review-operator` | 独立创始人执行可行性评判 |
| **质疑者评审** | `/money-review-skeptic` | 红队式质疑评审 |

### 构建 · 质量

| 技能 | 命令 | 功能 |
|------|------|------|
| **产品** | `/money-product` | 构建、部署、QA、监控 MVP |
| **质量** | `/money-quality` | 代码审查、安全审计、性能检查、上线前门禁 |

### 增长

| 技能 | 命令 | 功能 |
|------|------|------|
| **内容** | `/money-content` | 内容管线 + 真实性审计 + 标题影响力矩阵 |
| **外展** | `/money-outreach` | 冷邮件序列、合作伙伴拓展 |
| **社交** | `/money-social` | 社交媒体管理 + Hook 写作框架 |
| **SEO** | `/money-seo` | SEO + GEO 优化（含 AI 搜索） |
| **广告** | `/money-ads` | Google Ads、Meta Ads —— 设置、优化、ROAS |

### 运营 · 复盘

| 技能 | 命令 | 功能 |
|------|------|------|
| **运营** | `/money-ops` | 全天候运营 + 健康评分 + 安全护栏 |
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
