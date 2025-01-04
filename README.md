# Open Remote Repository

一个 VSCode 插件，添加一个状态栏按钮以打开远程仓库。

## 功能特性

- 在状态栏显示一个按钮，点击后打开配置的远程仓库地址
- 支持通过配置项自定义远程仓库地址模板

## 安装

在 VSCode 中搜索 "Open Remote Repository" 或直接访问 [Marketplace 链接](https://marketplace.visualstudio.com/)

## 使用方法

1. 安装插件后，状态栏会显示一个 GitHub 图标按钮。
   ![使用指南](https://raw.githubusercontent.com/jsdegithub/open-remote-repository/master/images/guides1.png)
2. 点击按钮，将打开配置的远程仓库地址。
3. 你可以在设置中配置远程仓库地址模板，使用 `${repoName}` 作为占位符（请注意：${repoName} 是固定要加的占位符，不是变量，不要将它替换为你的项目名），它将被你本地项目的文件夹名称替换，从而实现配置一个模板链接就可以访问对应平台下的所有仓库，详见[配置选项](#配置选项)。
本插件支持任意代码托管仓跳转，仅需配置对应托管仓库地址即可。

## <a id="配置选项">配置选项</a>

- `openRemoteRepository.repoUrl`: 远程仓库地址模板。
例如：`https://github.com/username/${repoName}`，其中，username 是你的 github 用户名，`${repoName}` 会被本地项目的文件夹名自动替换，只需固定填写即可。

**settings.json**
```json
"openRemoteRepository": {
  "repoUrl": "https://github.com/username/${repoName}"
}
```
**注意**：${repoName} 是固定要加的占位符，不是变量，不要将它替换为你的项目名，只需把 username 替换成你的 github 用户名即可。

## 更新日志

### 1.0.0

- 初始版本发布

## 许可证

MIT
