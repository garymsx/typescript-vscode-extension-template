import * as vscode from 'vscode';
import { MySidebarWebviewProvider } from './MySidebarWebviewProvider';

export class MyExtWebViewCommand {
    sidebarWebview: MySidebarWebviewProvider;

    constructor(sidebarWebview: MySidebarWebviewProvider) {
        this.sidebarWebview = sidebarWebview;
    }

    execute() {
        try {
            // WebView にイベントを送信します
            this.sidebarWebview.webviewView?.webview.postMessage({ type: "post", text: "post message" });
        } catch(e) {
            vscode.window.showErrorMessage(
                "エラーが発生しました"
            );
        }
    }

}
