# 个人简历网页

一个美观、响应式的个人简历静态网页，可直接部署到 GitHub Pages。

## 项目结构

```
resume/
├── index.html        # 简历主页面
├── css/
│   └── style.css     # 所有样式（含响应式、动画、打印）
├── js/
│   └── main.js       # 交互逻辑（菜单、滚动动画、导航高亮）
├── assets/           # 静态资源（头像图片等，可自行添加）
├── .gitignore        # Git 忽略规则
└── README.md         # 本文件
```

## 快速开始

### 本地预览

用浏览器直接打开 `index.html` 即可预览。

如果需要本地服务器（推荐，部分功能在 `file://` 协议下可能受限）：

```bash
# 方式一：Python
python -m http.server 8080

# 方式二：Node.js (需先安装 npx serve)
npx serve -p 8080
```

然后访问 `http://localhost:8080`。

### 自定义内容

打开 `index.html`，修改以下内容为你自己的信息：

| 需要修改的位置 | 说明 |
|---|---|
| `<title>` 标签 | 浏览器标签页标题 |
| Hero 区域 | 姓名、职位、简介 |
| `#about` 区块 | 个人介绍、核心能力 |
| `#education` 区块 | 教育背景 |
| `#experience` 区块 | 工作经历 |
| `#projects` 区块 | 项目经验 |
| `#skills` 区块 | 技能展示 |
| `#contact` 区块 | 联系方式（邮箱、GitHub、LinkedIn 等） |
| Favicon SVG | `<link rel="icon">` 中的字母 |

---

## 部署到 GitHub Pages（完整步骤）

### 前置准备

1. 注册一个 [GitHub](https://github.com) 账号（已有则跳过）
2. 安装 [Git](https://git-scm.com/downloads)（已有则跳过）
   - 安装后在终端执行 `git --version` 确认可用
3. （可选）安装 [GitHub Desktop](https://desktop.github.com/) 图形化工具，适合不熟悉命令行的用户

### 第一步：在 GitHub 上创建仓库

1. 登录 GitHub，点击右上角 **+** → **New repository**
2. 填写仓库名称：
   - 方式 A（推荐）：`resume` 或 `my-resume` 等任意名称
   - 方式 B：`你的用户名.github.io`（这种命名方式可以获得 `https://用户名.github.io` 的根路径域名）
3. Description 填写简介，如"个人简历网页"
4. 选择 **Public**（公开，GitHub Pages 免费版要求公开仓库）
5. **不要**勾选 "Add a README file"（我们已有本地文件）
6. 点击 **Create repository**

### 第二步：初始化本地 Git 仓库并推送

在项目根目录（`resume/` 文件夹）打开终端，依次执行：

```bash
# 1. 初始化 Git 仓库
git init

# 2. 添加所有文件
git add .

# 3. 首次提交
git commit -m "初始化个人简历网页"

# 4. 设置默认分支为 main
git branch -M main

# 5. 关联远程仓库（把 YOUR-USERNAME 替换为你的 GitHub 用户名，YOUR-REPO 替换为仓库名）
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# 6. 推送到 GitHub
git push -u origin main
```

> 如果使用 GitHub Desktop：打开 GitHub Desktop → File → New Repository → 选择 `resume` 文件夹 → Publish repository → 勾选 Public → Publish。

### 第三步：启用 GitHub Pages

1. 在 GitHub 上打开你的仓库页面
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. 在 **Source** 下拉菜单中选择 **Deploy from a branch**
5. 在 **Branch** 下选择 `main`，文件夹选 `/ (root)`
6. 点击 **Save**

等待 1-2 分钟，刷新 Pages 设置页面，你会看到：

```
Your site is live at https://YOUR-USERNAME.github.io/YOUR-REPO/
```

点击链接即可访问你的简历网页！

> 如果仓库名为 `用户名.github.io`，则访问地址为 `https://用户名.github.io/`

### 第四步：后续更新

每次修改简历内容后，重新推送即可自动更新：

```bash
git add .
git commit -m "更新简历内容"
git push
```

GitHub Pages 会在 1-2 分钟内自动重新部署。

---

## 自定义域名（可选）

### 1. 购买域名

在阿里云万网、腾讯云 DNSPod、GoDaddy、Namecheap 等域名注册商购买域名。

### 2. 配置 DNS 解析

在你的域名 DNS 管理面板添加以下记录：

**方式 A：使用子域名（如 www.example.com）**

| 记录类型 | 主机记录 | 记录值 |
|---|---|---|
| CNAME | www | `YOUR-USERNAME.github.io` |

**方式 B：使用根域名（如 example.com）**

添加 4 条 A 记录：

| 记录类型 | 主机记录 | 记录值 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

同时添加一条 CNAME 记录（可选，用于 www 跳转）：

| 记录类型 | 主机记录 | 记录值 |
|---|---|---|
| CNAME | www | `YOUR-USERNAME.github.io` |

### 3. 在 GitHub 仓库中添加自定义域名

1. 打开仓库 → **Settings** → **Pages**
2. 在 **Custom domain** 输入框中填入你的域名（如 `www.example.com`）
3. 点击 **Save**
4. 勾选 **Enforce HTTPS**（建议开启，GitHub 会自动申请 SSL 证书，可能需要等待几分钟到几小时）

### 4. 创建 CNAME 文件（推荐）

在仓库根目录创建一个名为 `CNAME`（无扩展名）的文件，内容为你的域名：

```
www.example.com
```

这样可以防止每次部署时自定义域名设置被重置。

> DNS 生效通常需要几分钟到 48 小时，请耐心等待。可以使用 `dig example.com` 或在线工具检查解析是否生效。

---

## 技术说明

- **纯静态**：HTML + CSS + JavaScript，无需构建工具，无需后端
- **响应式设计**：移动端 / 平板 / 桌面端自适应
- **无障碍**：支持键盘导航，遵循 WCAG 基本规范
- **性能优化**：使用 Intersection Observer 实现懒加载动画，尊重 `prefers-reduced-motion`
- **打印友好**：支持 Ctrl+P 直接打印为 PDF
- **零依赖**：不依赖任何第三方库（仅引用 Google Fonts）

## License

MIT — 自由使用和修改。
