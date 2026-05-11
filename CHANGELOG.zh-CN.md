# 更新日志

**Show Me The Money** 所有重要变更都记录在此。当前版本的更新内容也展示在 [README.zh-CN.md](README.zh-CN.md) 开头；历史版本只在这里。

English version: [CHANGELOG.md](CHANGELOG.md)

---

## v2.5.1 — 2026-05-11

### 修复
- **Value Quantification 块在终端 Markdown 渲染器中现在能正确显示。** 之前用的空表头两列表格（`| | |`）在 Claude Code 的终端渲染里会塌陷成 "Column 1 / Column 2" 的文本形式（其他终端 Markdown 工具也类似）。已把 13 个 SKILL.md 文件统一改成"加粗前缀的项目符号列表" —— 终端、GitHub 以及任何其他 Markdown 阅读器都能正常渲染。
- 在 `/money` 的 Value Quantification 模板里加了一条明确规则，禁止再用空表头的表格形式，避免未来新技能重新引入这个坑。

### 调整
- README "更新内容"历史抽到独立的 `CHANGELOG.md`（英文）和 `CHANGELOG.zh-CN.md`（中文）。README 只保留最新一个版本的更新内容；历史版本只在 changelog 里。版本越积越多时，首页保持精简。

---

## v2.5.0 — 2026-05-11

**"你的生意不一定是 SaaS，而且你可能已经有一个跑得起来的产品"的一版。** 两条主线全部融进现有技能 —— 没有新技能文件，数量仍为 25。

### 主线 1 —— 业务类型感知（整套不再默认所有人都在做 SaaS）

v2.5 之前，每个技能都默认走 Web SaaS 假设：Next.js 技术栈、Stripe 订阅、冷邮件外展、Google 网页 SEO、Meta/Google 广告。这对大约一半的真实创业者是错的。`/money` 的 onboarding 现在按项目记录 `business_type`，写入 `~/.smtm/projects/{slug}/profile.json`，下游技能根据它分支调整行为。

**支持 7 种类型：**
- `saas` —— Web SaaS / API
- `app` —— iOS / Android / 桌面应用
- `content-kol` —— 小红书、X、YouTube、Substack、播客的内容创作者
- `commerce` —— 电商 / 平台店铺（Shopify、Amazon、Etsy、淘宝、TikTok Shop）
- `retail-local` —— 实体店 / 本地服务业
- `service` —— 服务 / 代理 / 咨询
- `hybrid` —— 组合形式

**设置类型后会分支的内容：**

| 技能 | 分支什么 |
|---|---|
| `/money-product` | 给内容 KOL（账号搭建、首 10 篇、变现路径）、电商（平台选择、上架、履约）、本地零售（门店、地图收录、本地 SEO）、服务业（服务页、预约、案例库）提供完整替代构建路径 |
| `/money-finance` | 收入来源按类型映射（Stripe / App Store / 平台结算 / POS / 开票），核心增长指标因业务而异（MRR vs DAU vs 复购率 vs 每日来客数 vs 时间利用率）|
| `/money-outreach` | 冷邮件只是众多外展模式之一 —— 为非 SaaS 类型新增：本地 PR、批发、达人招募、赞助方对接 |
| `/money-seo` | 本地 SEO（Google Maps + Yelp + 大众点评）、应用商店优化、平台原生搜索（小红书 / X / YouTube / Substack / 抖音 / TikTok）、电商搜索（Amazon / Etsy / TikTok Shop / 淘宝）—— 跑对应章节，不再统一套 Web SEO |
| `/money-ads` | 平台选择按类型分化 —— App 用 Apple Search Ads / Google App，KOL 用 Dou+/薯条，本地用 Yelp / NextDoor / 美团，电商用 Amazon Sponsored / TikTok Shop |
| `/money-quality` | 替代质量模式 —— 内容质量（真实性 + Hook + 事实完整性）、上架质量（图片 + 标题 + 评价 + 履约）、服务体验质量（卫生 + 话术 + 第一印象流程）、交付物质量（Brief 匹配 + 声音 + 案例库沉淀） |
| `/money-content` | 内容优先级因业务而异 —— 上架文案 + UGC 脚本（电商）；GBP 内容 + 初始评价种子（本地零售）；平台原生格式本身（内容 KOL） |

### 主线 2 —— `/money-strategy iterate` 后 PMF 迭代模式

大部分策略类工具都假设用户在空白起点。反过来其实越来越常见：**已经有产品在跑、有真实客户、有真实指标**，问题是"下一个我该 ship 什么？"。v2.5 给 `/money-strategy` 加了一个 iterate 模式，锚点是真实测量数据，不是假设。

**自动判定：** 如果 `profile.json` 里 `post_pmf: true` 且有 `live_url`，`/money-strategy` 默认进入 iterate 模式。可用 `/money-strategy fresh` 或 `/money-strategy iterate` 强制覆盖。

**流程：**

1. **基线产品快照** —— 定价、当前 MRR / 替代指标、ICP、最近 5 次 ship
2. **挑选榜单（按业务类型给的默认列表）：**
   - `saas` → Toolify、TrustMRR、Product Hunt、Indie Hackers 收入榜、AppSumo
   - `app` → App Store 总榜、Play 畅销榜、Sensor Tower、data.ai
   - `content-kol` → 小红书 热榜、飞瓜 抖音榜、Substack Leaderboard、YouTube Trending
   - `commerce` → Amazon Best Sellers、Etsy Bestsellers、Shopify Top Shops、淘宝热卖、TikTok Shop Trending
   - `retail-local` → Yelp top-rated、大众点评 必吃榜、Google Maps top
   - `service` → UpWork top、Thumbtack top pros、Clutch top agencies
3. **挑出 3 个值得深度拆解的对标**（沿用现有的四重过滤，按迭代场景重新定义其中 1 条）
4. **对每个对标写一段拆解**：他们真正赢在哪、定价结构、真正的流量来源、藏起来的杠杆、他们没占的位
5. **差距矩阵** —— 用户产品 vs 3 个对标的 11 个维度对比；差距标记 P0 / P1 / P2
6. **挑出下 3 个 ship** —— 具体、收敛、可量化，每个 ship 都给出"能 ship 的最小版本"
7. **读品类趋势** —— 榜单 top 10 告诉你品类在往哪走，以及**不要追**什么

输出是一份"下 3 个 ship + 30/60/90 天复盘日期"的迭代计划，不是 11 章的市场研究报告。

### Onboarding 流程更新

`/money` Step 1.5 现在在 onboarding 阶段就询问业务类型和 live URL。新增"我已经有一个跑得起来的产品"选项，直接路由到 `/money-strategy iterate`。`/money-discover` 检测到 post-PMF 状态后会主动路由到 iterate 而非启动全新的发现 —— 防止多产品 operator 的常见模式："对着已经在跑的产品惯性打开 discovery，但实际问题是迭代"。

---

## v2.4.0 — 2026-05-10

**"自动化但不会把生产环境干爆"的一版。** 落地 9 项改进，**全部融进现有技能** —— 没有新命令要记、没有技能数量膨胀。

### 1. 运行模式 + 编辑边界 + 紧急停止（`/money-ops`）

自动化没有护栏，就是凌晨两点把生产环境炸了的快速通道。Ops 层现在声明一个**运行模式** —— `open` / `staging` / `production` —— 在更高级别的模式下，每一个破坏性命令（rm -rf、强制推送、DROP TABLE、kubectl delete、Stripe 批量操作）都需要明确确认。可以设置**编辑边界**把调试会话锁在一个子目录里；调 `/money-ops stop` 立刻停掉所有定时智能体和外展循环。

```
mode: production
→ rm -rf production_users 需要输入 "yes-delete-production_users"
→ npm publish 需要明确确认版本号
→ 超过 10 个收件人的外展批次需要明确批量审批
```

### 2. 最窄一注压力测试（`/money-discover`）

6 个强制问题已经找出"最小可付费的版本"。v2.4 加了一个 **Phase 4.5 压力测试**，逼迫这个最窄版本必须**明天就能展示** —— 不是"再准备 2-3 周"。输出是一句可证伪的赌注："到 {日期} 前，我会把 {一个工件} 摆到 {具名买家} 面前，测试他们是否愿意为 {一件事} 付 {具体价格}。如果到 {日期+7天} 还没信号，就是赌错了。"

这是独立创业者卡在"差不多准备好可以给人看了"第 4 周最大的原因。

### 3. 逐词审计 + 模糊转可测量（`/money-strategy`）

前提审计 Layer 1 现在跑一个循环：找出 pitch 里每一个承重的模糊词，追问（"陌生人要怎么测量这句话？"），并把它转换成可测量的替代。每一个目标都要变成 `<动词> <指标> <阈值> <截止时间>` 才能进入正式策略。

如果用户没法把目标转成可测量形式，策略环节会拒绝继续，直接回路到 `/money-discover` 的 Phase 4.5。不能在含糊措辞上面继续做策略。

### 4. Hook + 标题模式库 + 发布说明模式（`/money-content`）

Stage 4.8 新增了一个**模式库** —— 12 种 hook 模式 + 15 种标题模式，按读者状态（滑动中 / 搜索中 / 决策中）索引，外加针对 XHS 和微信的平台专属模式。一个标题必须**同时**命中库里的某个模式 **且** 触发现有冲击力矩阵里 2+ 个心理机制，才能放出。

外加一个新的**发布说明模式**：当 `/money-product` 出版本时，自动生成三层发布说明（一行航班 tweet / 产品邮件 / 完整 CHANGELOG + 博客）。发布说明邮件是所有内容类型中转化率最高的 —— 不写就是白白漏掉免费→付费升级。

### 5. 设计系统契约 + 出版生命周期（`/money-product`）

新的 **Phase 0** 在写任何 UI 代码之前写 `DESIGN.md` —— 美学站位、字体/颜色/间距 token、动效规则，以及**拒绝清单**（这套系统明确**不做**什么）。解决"组合里 4 个产品看起来毫无亲缘关系"的问题。

新的 **Phase 5.5 出版生命周期**把部署变成 5 步协议：版本号 bump（semver）→ CHANGELOG 条目 → 部署前验证 → 部署 + tag → 发布说明分发。跳过一步就是"生产事故"的成因 —— 每一步都有"缺失则拒绝"的门禁。

### 6. STRIDE 威胁模型 + 技术分诊模式（`/money-quality`）

安全审计现在跑 OWASP Top 10 **和** STRIDE（仿冒 / 篡改 / 抵赖 / 信息泄露 / 拒绝服务 / 提权）两遍 —— 抓住 OWASP 漏掉的架构性假设。3+ 个 STRIDE 威胁停在 P0/P1，意味着**不能**开始向真实用户收钱，跟 OWASP 分数无关。

新的**技术分诊模式**面向技术层面坏了的场景 —— 测试挂、查询慢、神秘的 500。5 步循环（重述症状 → 找边界 → 复现 → 先假设再验证 → 修复 + 回归测试 + `/money-learn` 留痕）。在精确重述症状之前拒绝瞎猜、拒绝 grep 源码。

### 7. 自定义评审角色 + 架构审视（`/money-panel` + `/money-review-operator`）

`/money-panel --add "Enterprise IT buyer: 签合同前必须 SOC2"` 把一个领域专家评审塞进 gauntlet。当内置 4 个角度（投资人 / 客户 / 操盘手 / 怀疑论者）不足以覆盖你的方案需要的特定视角时用 —— 企业采购、隐私律师、开源维护者、受监管行业合规。

`/money-review-operator` 加了 Q5：**架构与数据流压力测试** —— 独立操盘手逃不掉的 5 种失败模式（隐藏运营成本、数据形状锁定、单点故障、成本曲线错配、调试可达性）。2+ 项红灯就把判决拉到 NEEDS HIRE，无视其他问题的得分。

### 8. 组合学习 —— 跨项目知识沉淀（`/money-learn`）

Learnings 之前只能项目内本地。v2.4 加了一个**组合层** `~/.smtm/portfolio/learnings.jsonl`，自动加载到**每个项目**的**每个 money-* 技能**里。跑 `/money-learn promote <L-id>` 把一条已验证、已复现、领域通用的项目级 pattern 提到组合层。如果发现它只在原来的项目里成立，可以降级。

跑 6 个产品的独立操盘手会发现一些放之四海皆准的 pattern（"Stripe webhook idempotency key 必须显式检查，即使 API 本身幂等"）。这些不该锁在单一产品里 —— 它们属于操盘手的"组合大脑"。

### 9. 自动更新命令（`/money-upgrade`）

`/money-upgrade` 现在是真正的自动更新器。一条命令：
- 查询 npm 上的最新版本
- 显示版本差 + 重点变更
- 下载 + 替换已安装的技能
- 读 CHANGELOG 摘要更新内容
- 提示重启 Claude Code

不再"手动比对版本号"或"我应该跑 install 还是 update"。一条命令，幂等。

---

## v2.3.1 — 2026-05-03

**v2.3.0 原子发布之后的打磨补丁。** 落地 5 件事：

1. **原子库 258 → 276** —— 把单条蒸馏超时从 90s 提到 180s，重跑了 26 条首次失败的推文，回收了其中 18 条（多数是长的中文 thread，需要更多推理时间）。
2. **每个技能现在都有原子加载提示** —— 每一个非路由技能在文件顶部都有一条 Standard-startup 提示，声明它要加载哪个原子切片，并提醒 AI 在直接由原子驱动建议时用 `A-{id}` 引用。之前这条规约只写在 `skills/money/SKILL.md` 里、下游技能隐式继承；现在每个文件自包含。
3. **发布工作流步骤顺序修复** —— 自动发布工作流里 `Extract release notes` 现在跑在 `Publish to npm` **之前**。修之前如果 notes 抽取失败，会留下一个"已发到 npm 但没有 GitHub Release"的孤儿版本（v2.3.0 上线时就遇到了这个问题）。现在 notes 失败可以干净回滚。
4. **中文 README 完整对齐** —— `README.zh-CN.md` 之前还是 v1.x 时代的页面（14 个技能、无 banner、无战绩叙事）。已与英文版逐行对齐，包含 v2.1/2.2/2.3 的所有发布说明和创始人战绩数据。
5. **`printf -- '...'` 修复** —— 已在 2.3.0 中发布，值得再点一下：自动发布工作流里的 `printf '----...'` 分隔符在第一次真实运行时撞上 bash 的选项解析，npm 发布前就退出了。现在防弹。

没有新技能、没有从 #1 之外来源新增的原子。属于纯库健康度补丁。

---

## v2.3.0 — 2026-05-03

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

## v2.2.0 — 2026-04

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

## v2.1.0

**跨会话状态管理。** 三个技能 —— `/money-save`、`/money-restore`、`/money-report` —— 把每一次对话变成一个检查点。上周敲定的定价、被排除的方向、正在测的假设，全部跨 Claude Code 会话留存。

```
session 1  →  /money-discover  →  /money-save     ✅ 切入点已锁定
   …一周过去…
session 2  →  /money-restore   →  从这里继续        📦 不需要重新解释
           →  /money-strategy  →  /money-save     ✅ 定价已锁定
   …一个月过去…
session N  →  /money-report                        📄 全量交付物
```
