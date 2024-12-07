const vscode = require('vscode');

// 使用全大写使输出通道更容易识别
const CHANNEL_NAME = 'OPEN REMOTE REPOSITORY';
const outputChannel = vscode.window.createOutputChannel(CHANNEL_NAME);

function activate(context) {
  // 确保输出面板立即可见
  outputChannel.clear(); // 清除旧日志
  outputChannel.show(true); // true参数会强制面板获得焦点

  outputChannel.appendLine('============= 扩展激活日志 =============');
  outputChannel.appendLine(`[${new Date().toLocaleTimeString()}] 开始激活扩展`);

  try {
    // 主动检查输出通道是否创建成功
    const channels = vscode.window.outputChannel;
    outputChannel.appendLine(`当前输出通道名称: ${CHANNEL_NAME}`);

    // 添加更多关键点的日志
    outputChannel.appendLine('▶ 创建状态栏项...');
    // 立即创建状态栏项，不要等待窗口事件
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);

    statusBarItem.text = '$(github) GitHub';
    statusBarItem.command = 'openRemoteRepository.openRepo';
    statusBarItem.tooltip = '点击打开远程仓库';
    statusBarItem.show();
    outputChannel.appendLine('✓ 状态栏项创建成功');
    outputChannel.appendLine('状态栏项已创建');

    // 显示一个通知确认扩展已激活
    vscode.window.showInformationMessage('扩展已激活！请查看输出面板');

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

    // 确保状态栏项被释放
    context.subscriptions.push(statusBarItem);
    context.subscriptions.push(disposable);
    context.subscriptions.push(configWatcher);

    outputChannel.appendLine('扩展激活成功 - 所有组件已注册');
  } catch (error) {
    console.error('扩展激活错误:', error); // 同时输出到开发者工具控制台
    outputChannel.appendLine('❌ 错误信息:');
    outputChannel.appendLine(error.stack || error.message);
    outputChannel.appendLine(`错误堆栈: ${error.stack}`);
    outputChannel.appendLine(`扩展激活出错: ${error}`);
    vscode.window.showErrorMessage('扩展激活失败: ' + error.message);
  }
}

exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;
