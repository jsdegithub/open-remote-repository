const vscode = require('vscode');

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
      if (!repoUrl) {
        vscode.window.showWarningMessage('请在设置中配置远程仓库地址');
        return;
      }
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
