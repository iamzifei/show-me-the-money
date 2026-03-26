# 💰 Show Me The Money

[English](README.md) | [中文](README.zh-CN.md)

**从零开始构建并运行 24/7 全自动化商业系统 — 由 Claude Code 驱动。**

Show Me The Money 是一套 Claude Code 技能套件，充当你的 AI 商业操作系统。它能发现商机、制定策略、构建产品、运营营销、管理销售，并自主编排一切。

## 快速开始

```bash
npx @orrisai/show-me-the-money
```

然后打开 Claude Code 并输入:

```
/money
```

## 功能概览

```
💡 发现商机 ──► 📋 制定策略 ──► 🔨 构建产品 ──► 📈 增长
                                                    │
                                  ┌─────────────────┤
                                  │       │       │  │
                                  ▼       ▼       ▼  ▼
                                内容    社交    SEO  广告
                                  │       │       │  │
                                  └───────┴───┬───┴──┘
                                              ▼
                                         🤖 全天候运营
                                              │
                                              ▼
                                         💵 收入
```

从零到运营中的商业:

1. **没有想法?** → `/money-discover` 扫描市场、趋势和空白，寻找盈利机会
2. **有了想法?** → `/money-strategy` 创建商业模式、定价和市场进入方案
3. **有了方案?** → `/money-product` 构建并部署带支付集成的 MVP
4. **有了产品?** → 增长技能处理内容、社交、SEO、广告和外展
5. **需要自动化?** → `/money-ops` 全天候自动运营

## 安装

### 通过 npx（推荐）

```bash
npx @orrisai/show-me-the-money
```

这会自动将全部 12 个技能安装到 `~/.claude/skills/`。

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

或在 Claude Code 中输入:

```
/money-upgrade
```

## 技能列表

| 技能 | 命令 | 功能说明 |
|------|------|----------|
| **路由器** | `/money` | 主入口 — 引导你到正确的技能或运行完整流水线 |
| **发现** | `/money-discover` | 从市场空白和趋势中发现盈利商机 |
| **策略** | `/money-strategy` | 商业模式、定价、竞争分析、市场进入方案 |
| **产品** | `/money-product` | 构建和部署 MVP（Next.js、Supabase、Stripe、Vercel） |
| **内容** | `/money-content` | 内容管线 — 博客文章、邮件、社交媒体、文案 |
| **外展** | `/money-outreach` | 冷邮件序列、潜客开发、合作伙伴拓展 |
| **社交** | `/money-social` | 跨 X、LinkedIn、Reddit、Product Hunt 的社交媒体管理 |
| **SEO** | `/money-seo` | 传统 SEO + GEO（ChatGPT、Perplexity 的 AI 搜索优化） |
| **广告** | `/money-ads` | Google Ads、Meta Ads — 投放设置、优化、ROAS 追踪 |
| **运营** | `/money-ops` | 全天候自主运营 — 调度、监控、健康检查 |
| **财务** | `/money-finance` | 收入追踪、单位经济、财务报告、定价优化 |
| **升级** | `/money-upgrade` | 更新到最新版本（含备份和回滚） |

## 使用示例

### 从零开始
```
/money
→ 选择"从零开始"
→ 跟随引导流水线
```

### 寻找商业创意
```
/money-discover "我是一个会做网页应用的开发者"
```

### 为现有想法制定策略
```
/money-strategy "提供 AI 图像生成的 API 产品"
```

### 构建并发布产品
```
/money-product "邮件分析 SaaS 工具，$29/月"
```

### 设置营销自动化
```
/money-ops "为我在 example.com 的产品自动化内容、社交和 SEO"
```

### 投放广告
```
/money-ads "为我的 AI 写作工具投放 Google Ads，每日预算 $20"
```

### 获取财务报告
```
/money-finance "从 Stripe 获取每周收入报告"
```

## 工作原理

Show Me The Money 基于 [Claude Code 技能系统](https://docs.anthropic.com/en/docs/claude-code/skills) 构建。每个技能是一个 `SKILL.md` 文件，包含:

- **Frontmatter** — 名称、描述和配置
- **Instructions** — Claude 遵循的分步工作流
- **Frameworks** — 商业模板、检查清单和决策树

技能安装到 `~/.claude/skills/`，Claude Code 会自动发现它们。当你输入 `/money` 时，Claude 会加载技能指令并执行你的请求。

### 架构

```
~/.claude/skills/
├── money/SKILL.md              ← 主路由器
├── money-discover/SKILL.md     ← 商业创意发现
├── money-strategy/SKILL.md     ← 策略与规划
├── money-product/SKILL.md      ← 产品构建
├── money-content/SKILL.md      ← 内容管线
├── money-outreach/SKILL.md     ← 销售与外展
├── money-social/SKILL.md       ← 社交媒体
├── money-seo/SKILL.md          ← SEO 与 GEO
├── money-ads/SKILL.md          ← 付费广告
├── money-ops/SKILL.md          ← 全天候运营
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

## 许可证

MIT
