const vscode = require('vscode');

function activate(context) {
  const repoUrl = vscode.workspace.getConfiguration('openRemoteRepository').get('repoUrl');

  let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBarItem.text = '$(repo) 打开远程仓库';
  statusBarItem.command = 'openRemoteRepository.openRepo';
  statusBarItem.show();

  let disposable = vscode.commands.registerCommand('openRemoteRepository.openRepo', () => {
    if (repoUrl) {
      vscode.env.openExternal(vscode.Uri.parse(repoUrl));
    } else {
      vscode.window.showWarningMessage('请在设置中配置远程仓库地址。');
    }
  });

  context.subscriptions.push(statusBarItem);
  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
  // ...existing code...
}
exports.deactivate = deactivate;
