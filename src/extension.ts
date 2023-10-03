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
        'myext',
        () => {
            const command = new MyExt.MyExtCommand();
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
