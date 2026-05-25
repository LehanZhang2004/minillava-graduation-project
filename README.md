# Mini-LLaVA 毕业设计展示网站

这是一个纯静态的答辩展示网站，风格类似 PPT，可直接部署到 GitHub Pages。

## 本地预览

直接双击 `index.html` 即可打开。也可以在项目根目录运行：

```bash
python -m http.server 8000
```

然后访问：

```text
http://127.0.0.1:8000
```

## 文件结构

```text
minillava-defense-site/
├── index.html
├── assets/
│   ├── images/
│   │   ├── clip.svg
│   │   ├── stage1.svg
│   │   └── stage2.svg
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── README.md
```

## GitHub Pages 部署

1. 新建 GitHub 仓库，例如 `minillava-defense-site`。
2. 把 `index.html`、`assets/`、`README.md` 上传到仓库根目录。
3. 进入 `Settings` → `Pages`。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/(root)`，保存。
6. 等待 GitHub 生成访问地址。

> 注意：本展示站只需要上传静态网页文件。训练代码目录 `AiClass-llava-2026/` 可以不上传；如果要开源完整项目，也可以另建仓库或放在同一仓库的子目录中。

## 使用方式

- 鼠标滚动切换页面。
- 点击左侧目录跳转。
- 使用键盘 `↑` / `↓` / `PageUp` / `PageDown` 切换幻灯片。
- 使用浏览器打印功能可以导出 PDF。

## 修改建议

- 如果要替换实验数值，修改 `index.html` 中 Stage 1、Stage 2 和结果表格部分。
- 如果要加入真实系统截图，可以放入 `assets/images/`，再在对应 slide 中插入 `<img>` 标签。
- 如果想改主题色，修改 `assets/css/style.css` 中 `:root` 下的变量。
