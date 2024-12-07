const vscode = require('vscode');
const path = require('path');

function activate(context) {
  try {
    // 创建状态栏项
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    statusBarItem.text = '$(github)';
    statusBarItem.command = 'openRemoteRepository.openRepo';
    statusBarItem.tooltip = '点击打开远程仓库';
    statusBarItem.show();

    // 获取配置
    let repoUrl = vscode.workspace.getConfiguration('openRemoteRepository').get('repoUrl');

    // 注册命令
    let disposable = vscode.commands.registerCommand('openRemoteRepository.openRepo', () => {
      // 获取配置的URL模板
      let repoUrlTemplate = vscode.workspace.getConfiguration('openRemoteRepository').get('repoUrl');

      if (!repoUrlTemplate || !repoUrlTemplate.includes('${repoName}')) {
        vscode.window.showWarningMessage('请在设置中配置有效的远程仓库地址模板，需包含 ${repoName} 占位符');
        return;
      }

      // 获取当前工作区
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage('请打开一个项目文件夹');
        return;
      }

      // 获取项目根目录的文件夹名并替换模板中的变量
      const projectName = path.basename(workspaceFolders[0].uri.fsPath);
      const repoUrl = repoUrlTemplate.replace('${repoName}', projectName);

      vscode.env.openExternal(vscode.Uri.parse(repoUrl));
    });

    // 监听配置变化
    let configWatcher = vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('openRemoteRepository.repoUrl')) {
        repoUrl = vscode.workspace.getConfiguration('openRemoteRepository').get('repoUrl');
        vscode.window.showInformationMessage('远程仓库地址已更新');
      }
    });

    context.subscriptions.push(statusBarItem);
    context.subscriptions.push(disposable);
    context.subscriptions.push(configWatcher);
  } catch (error) {
    vscode.window.showErrorMessage('扩展激活失败: ' + error.message);
  }
}

exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;
