const vscode = require('vscode');

function activate(context) {
  // 监听配置变化
  let configWatcher = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration('openRemoteRepository.repoUrl')) {
      repoUrl = vscode.workspace.getConfiguration('openRemoteRepository').get('repoUrl');
      console.log('配置已更新，扩展重新加载...');
      vscode.window.showInformationMessage('扩展配置已更新');
    }
  });

  let repoUrl = vscode.workspace.getConfiguration('openRemoteRepository').get('repoUrl');
  let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);

  // 立即更新状态栏显示
  updateStatusBarItem();

  function updateStatusBarItem() {
    statusBarItem.text = '$(repo) 打开远程仓库';
    statusBarItem.command = 'openRemoteRepository.openRepo';
    statusBarItem.show();
  }

  let disposable = vscode.commands.registerCommand('openRemoteRepository.openRepo', () => {
    if (repoUrl) {
      vscode.env.openExternal(vscode.Uri.parse(repoUrl));
    } else {
      vscode.window.showWarningMessage('请在设置中配置远程仓库地址。');
    }
  });

  context.subscriptions.push(statusBarItem);
  context.subscriptions.push(disposable);
  context.subscriptions.push(configWatcher);
}
exports.activate = activate;

function deactivate() {
  // ...existing code...
}
exports.deactivate = deactivate;
