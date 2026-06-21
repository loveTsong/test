# 个人作品展示网站 — 使用指南

## 目录结构

```
personal_site/
├── index.html              # 页面模板（无需修改）
├── styles.css              # 样式文件（无需修改）
├── script.js               # 渲染引擎（无需修改）
├── config.json             # ★ 个人信息配置文件
├── README.md               # 本指南
└── projects/               # ★ 作品资源目录
    ├── project-1/
    │   ├── info.json       #   作品信息
    │   └── images/         #   作品图片（可选）
    ├── project-2/
    │   ├── info.json
    │   └── images/
    └── ...
```

> 你只需要编辑 `config.json` 和管理 `projects/` 目录下的作品资源即可，**无需修改 HTML / CSS / JS**。

---

## 一、配置个人信息

打开 **`config.json`**，按字段说明填写：

### 1. 站点基本信息

```json
{
  "site": {
    "title": "个人作品展示",   // 浏览器标签页标题
    "logo": "Portfolio"        // 导航栏左上角 Logo 文字
  }
}
```

### 2. 导航栏

```json
{
  "nav": {
    "links": [
      { "label": "关于我", "href": "#about" },
      { "label": "经历",   "href": "#experience" },
      { "label": "作品",   "href": "#projects" },
      { "label": "技能",   "href": "#skills" },
      { "label": "联系",   "href": "#contact" }
    ]
  }
}
```

可增删导航项，`href` 值对应页面中 section 的 `id`。

### 3. 首屏 Hero

```json
{
  "hero": {
    "greeting": "Hello, 我是",
    "name": "你的名字",          // 会逐字弹出动画
    "tagline": "用代码与创意构建精彩数字体验",
    "cta_primary": "浏览作品",
    "cta_secondary": "联系我",
    "avatar_emoji": "👨‍💻"     // 头像 emoji
  }
}
```

### 4. 关于我

```json
{
  "about": {
    "tag": "关于我",
    "title": "个人简介",
    "subtitle": "个人优势",
    "advantages": [
      "第一条优势描述",
      "第二条优势描述"
    ],
    "stats": [
      { "value": "5+",   "label": "年开发经验" },
      { "value": "30+",  "label": "完成项目" },
      { "value": "杭州", "label": "当前位置" },
      { "value": "在职", "label": "当前状态" }
    ]
  }
}
```

`stats` 可增删，每个卡片显示一个数值 + 标签。

### 5. 工作经历

```json
{
  "experience": {
    "tag": "工作经历",
    "title": "职业历程",
    "items": [
      {
        "date": "2022.6 - 至今",
        "type": "全职",
        "role": "高级前端开发工程师",
        "company": "某互联网科技公司",
        "details": [
          "工作内容 1",
          "工作内容 2"
        ]
      }
    ]
  }
}
```

`items` 数组可添加多条经历，按时间顺序从上到下排列。

### 6. 项目清单

```json
{
  "projectList": {
    "tag": "项目清单",
    "title": "项目案例",
    "desc": "参与设计开发的项目清单",
    "groups": [
      {
        "name": "Web 应用",
        "items": [
          "项目名称 1",
          "项目名称 2"
        ]
      },
      {
        "name": "小程序",
        "items": [ "项目名称 3" ]
      }
    ]
  }
}
```

可自由增删分组和项目名称。

### 7. 技能标签

```json
{
  "skills": {
    "tag": "技术栈",
    "title": "专业技能",
    "items": [
      "JavaScript", "TypeScript", "Vue.js", "React"
    ]
  }
}
```

`items` 数组中增减技能名称即可。

### 8. 联系方式

```json
{
  "contact": {
    "tag": "开始合作",
    "title": "联系我",
    "desc": "有项目想法或合作意向？随时与我联系。",
    "items": [
      { "icon": "📧", "label": "example@email.com",  "href": "mailto:example@email.com" },
      { "icon": "📞", "label": "138 0000 0000",      "href": "tel:13800000000" },
      { "icon": "💬", "label": "微信联系",           "href": "#" }
    ]
  }
}
```

可增删联系方式卡片，`href` 支持 `mailto:` / `tel:` / 普通链接。

### 9. 页脚

```json
{
  "footer": "© 2026 Portfolio. All rights reserved."
}
```

---

## 二、管理作品

每个作品对应 `projects/` 下的一个独立目录。

### 添加新作品步骤

**1. 创建目录**

```
projects/你的项目目录名/
├── info.json
└── images/
```

**2. 编写 info.json**

```json
{
  "name": "数据可视化大屏",
  "description": "实时数据监控与可视化展示平台，支持多维度数据呈现与交互。",
  "category": "Web 应用",
  "icon": "🖥️",
  "gradient": ["#667eea", "#764ba2"],
  "images": ["1.jpg", "2.jpg"]
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 作品名称 |
| `description` | string | 简短描述 |
| `category` | string | 分类标签（显示在卡片角标） |
| `icon` | string | 缩略图显示的 emoji 图标 |
| `gradient` | [string, string] | 缩略图渐变颜色（两端 hex 色值） |
| `images` | string[] | 详情弹窗中展示的图片文件名（放 images/ 目录下） |

**3. 注册到 config.json**

在 `config.json` 的 `projects.dirs` 数组中添加目录名：

```json
{
  "projects": {
    "dirs": [
      "project-1",
      "project-2",
      "你的项目目录名"
    ]
  }
}
```

> 作品卡片的显示顺序与 `dirs` 数组中的顺序一致。

### 添加作品图片

将图片放入 `projects/你的项目目录名/images/` 目录，然后在 `info.json` 的 `images` 字段中列出文件名。

> 如果 `images` 数组为空，弹窗中会显示占位提示，不会报错。

### 删除作品

- 从 `config.json` 的 `projects.dirs` 中移除目录名
- 可选：删除对应的 `projects/xxx/` 目录

---

## 三、部署上线

### 方式一：直接使用（静态文件）

将整个 `personal_site/` 目录放到任意静态文件服务器（Nginx、Apache、GitHub Pages、Vercel 等）即可。

> 由于使用了 `fetch` 加载本地 JSON 文件，**不能直接用 `file://` 协议打开 index.html**，需要通过本地服务器预览。

### 方式二：本地预览（推荐）

使用 VSCode 的 **Live Server** 插件：

1. 在 VSCode 中打开 `personal_site/` 目录
2. 右键 `index.html` → **Open with Live Server**
3. 浏览器自动打开，实时预览效果

或者使用 Node.js 自带服务器：

```bash
npx serve .
```

---

## 四、自定义主题

如需修改颜色主题，编辑 `styles.css` 开头的 CSS 变量：

```css
:root {
  --primary: #ff6b6b;        /* 主色调 */
  --primary-light: #ff8e8e;  /* 主色亮色 */
  --secondary: #ffa502;      /* 辅色 */
  --purple: #a855f7;         /* 紫色强调 */
  --bg: #0f0f1a;            /* 背景色 */
  --text: #f1f5f9;          /* 文字色 */
  --text-muted: #94a3b8;    /* 次要文字色 */
}
```

也可以直接替换 `styles.css` 中的其他样式来调整布局、间距、动画等。

---

## 五、常见问题

**Q: 页面空白，控制台报错 "Failed to load config.json"**

A: 直接用浏览器打开 `index.html` 会导致跨域问题。请使用 Live Server 或本地 HTTP 服务器预览。

**Q: 如何修改作品卡片的尺寸或列数？**

A: 编辑 `styles.css` 中的 `.project-grid`，修改 `grid-template-columns` 的值（如 `repeat(2, 1fr)` 改为 2 列）。

**Q: 如何添加新的页面区块？**

A: 在 `index.html` 中添加对应的 `<section>` 标签，然后在 `script.js` 中新增渲染函数，并在 `config.json` 中添加对应配置项。

**Q: 作品图片支持什么格式？**

A: 支持 JPG、PNG、WebP、GIF 等常见图片格式，直接写在 `images` 数组的文件名中即可。