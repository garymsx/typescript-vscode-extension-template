import * as vscode from "vscode";
import * as MyExt from "./extensions";

const selector:vscode.DocumentSelector = {
    scheme: 'file',
    language: 'myext'
};

export function activate(context: vscode.ExtensionContext) {
    const activeEditor = vscode.window.activeTextEditor;

    // セマンティックハイライト拡張
    context.subscriptions.push(
        vscode.languages.registerDocumentSemanticTokensProvider(
            { language: "myext" },
            new MyExt.MyExtSemanticTokensProvider(),
            MyExt.MyExtLegend
        )
    );

    // オートコンプリート拡張
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, new MyExt.MyExtCompletionItemProvider(), '.'));

    // 定義ジャンプ拡張
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(selector, new MyExt.MyExtDefinitionProvider()));

    // マウスホバー拡張
    context.subscriptions.push(vscode.languages.registerHoverProvider(selector, new MyExt.MyExtHoverProvider()));    

    // パラメータヒント拡張
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(selector, new MyExt.MyExtSignatureHelpProvider(), '(', ','));    

    // コマンド拡張
    context.subscriptions.push(vscode.commands.registerCommand(
        'mySidebar.myext',
        () => {
            const command = new MyExt.MyExtCommand();
            command.execute();
        })
    );

    // コマンド拡張
    context.subscriptions.push(vscode.commands.registerCommand(
        'myExt.myExtCommand2',
        () => {
            const command = new MyExt.MyExtCommand2();
            command.execute(context.extensionUri);
        })
    );

    // TreeViewの作成と登録
    const myTreeView = vscode.window.createTreeView("mySidebar", {
        treeDataProvider: new MyExt.MySidebarTreeViewProvider(),
    });
    // 後片付け
    context.subscriptions.push(myTreeView);

    const webviewView = new MyExt.MySidebarWebviewProvider(context.extensionUri);
    // WebView を登録
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "mySidebarWebView", // package.json で設定した`id`と同じ値にして下さい
            webviewView
        )
    );

    // コマンド拡張
    context.subscriptions.push(vscode.commands.registerCommand(
        'mySidebarWebView.myext',
        () => {
            const command = new MyExt.MyExtWebViewCommand(webviewView);
            command.execute();
        })
    );

    // ファイルが作成、削除されたらファイルリストを更新する
    const folders = vscode.workspace.workspaceFolders;
    if (folders) {
        const watcher = vscode.workspace.createFileSystemWatcher("**/*.*");
            // ファイル追加
            watcher.onDidCreate((uri) => {
                console.log("file create event");
            });

            // ファイル更新
            watcher.onDidChange((uri) => {
                console.log("file change event");
            });

            // ファイル削除
            watcher.onDidDelete((uri) => {
                console.log("file delete event");
            });
    }
    
}
