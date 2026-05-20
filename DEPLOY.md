# 三明泰宁旅游攻略 - GitHub Pages 部署指南

## 📁 准备文件

确保你有以下文件：
- `index.html` - 主页面
- `style.css` - 样式文件
- `script.js` - 交互脚本

## 🚀 部署步骤

### 第一步：创建 GitHub 仓库

1. 访问 https://github.com 并登录账号
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `taining-travel-guide`（或其他你喜欢的名字）
   - Description: `三明泰宁旅游攻略 - 探索世界自然遗产地`
   - 选择 Public（公开仓库）
   - **不需要**勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 第二步：上传文件

你可以选择以下任一方式上传：

#### 方式 A：通过网页界面上传（最简单）

1. 在新建的仓库页面，点击 "uploading an existing file"
2. 将你的三个文件（index.html、style.css、script.js）拖到上传区域
3. 在底部的 "Commit changes" 区域填写提交信息，例如：
   - 第一行：`Initial commit - 泰宁旅游攻略网站`
4. 点击 "Commit changes"

#### 方式 B：使用 Git 命令（推荐）

如果你在本地有 Git 环境：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add index.html style.css script.js

# 提交更改
git commit -m "Initial commit - 泰宁旅游攻略网站"

# 关联远程仓库（替换为你的用户名和仓库名）
git remote add origin https://github.com/你的用户名/仓库名.git

# 推送到 GitHub
git push -u origin master
# 或者如果使用 main 分支
git push -u origin main
```

### 第三步：启用 GitHub Pages

1. 在你的仓库页面，点击顶部的 "Settings"
2. 在左侧菜单中找到 "Pages"（在 "Code and automation" 部分）
3. 在 "Build and deployment" 部分：
   - Source: 选择 "Deploy from a branch"
   - Branch: 选择 `main` 或 `master` 分支
   - 文件夹选择 `/ (root)`
4. 点击 "Save"

### 第四步：等待部署完成

- GitHub Pages 通常需要 1-5 分钟来部署你的网站
- 刷新 "Pages" 页面，当看到绿色的 "Your site is live at" 提示时，部署就完成了！
- 你的网站地址将是：`https://你的用户名.github.io/仓库名/`

## ✨ 查看效果

部署完成后，在浏览器中访问你的网站地址即可看到效果！

## 📝 后续更新

如果需要修改网站内容：

1. 编辑本地文件
2. 提交并推送到 GitHub
3. GitHub Pages 会自动重新部署（通常需要几分钟）

## 🎯 网站特色

- ✅ 响应式设计，支持手机、平板、电脑
- ✅ 6 个必游景点详细介绍
- ✅ 6 种特色美食推荐
- ✅ 实用旅行贴士
- ✅ 优雅的动画和交互效果
- ✅ 自然清新的配色风格

## 📞 常见问题

**Q: 网站部署后图片不显示？**

A: 本网站使用的是动态生成的图片 URL，无需额外配置图片文件，确保网络连接正常即可。

**Q: 部署后页面显示 404？**

A: 请确保：
1. 文件名正确（必须是 index.html）
2. 文件在仓库的根目录
3. 等待 5-10 分钟让部署完成

**Q: 如何自定义网站内容？**

A: 直接编辑 index.html 文件中的文字和图片链接即可！

---

祝你在泰宁有一个美好的旅程！🏞️✨