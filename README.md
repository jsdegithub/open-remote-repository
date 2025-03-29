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
3. 你可以在设置中配置远程仓库地址模板，使用 `${repoName}` 作为占位符（注意：`${repoName}`不是一个变量，不需要你动态填写成项目名，只需要写死成`${repoName}`即可），它后续将被替换成当前项目的本地文件夹名，详见[配置选项](#配置选项)。本插件支持任意代码托管仓跳转，仅需配置对应托管仓库地址即可。

## <a id="配置选项">配置选项</a>

- `openRemoteRepository.repoUrl`: 远程仓库地址模板。

eg1：`https://github.com/yourUsername/${repoName}`

```json
// 注意：`${repoName}`不是一个变量，不需要你动态填写成项目名，只需要写死成`${repoName}`即可。
// yourUsername 是你的 GitHub 用户名，需要手动替换。
"openRemoteRepository": {
  "repoUrl": "https://github.com/yourUsername/${repoName}"
}
```

eg2：`https://gitee.com/yourUsername/${repoName}`

```json
// ${repoName}写死不要动
// yourUsername 是你的 Gitee 用户名，需要手动替换。
"openRemoteRepository": {
  "repoUrl": "https://gitee.com/yourUsername/${repoName}"
}
```

## 更新日志

### 1.0.0

- 初始版本发布

## 许可证

MIT
