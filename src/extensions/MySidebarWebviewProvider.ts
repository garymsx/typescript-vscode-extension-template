import * as vscode from "vscode";

export class MySidebarWebviewProvider implements vscode.WebviewViewProvider {
  constructor(private extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true
    };

    // Add reload button
    webviewView.webview.onDidReceiveMessage(data => {
      if (data.type === 'reload') {
          this.getHtmlForWebview(webviewView);
      }
    });

    this.getHtmlForWebview(webviewView);
  }

  getHtmlForWebview(webviewView: vscode.WebviewView) {
    const textSetting = vscode.workspace.getConfiguration('MyExt').get('textSetting');
    const booleanSetting = vscode.workspace.getConfiguration('MyExt').get('booleanSetting');

    // WebViewで表示したいHTMLを設定します
    webviewView.webview.html = `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WebView Example</title>
      </head>
      <body>
        <h1>MySidebar Webview</h1>
        textSetting: ${textSetting} <br/>
        booleanSetting: ${booleanSetting}
      </body>
      </html>
    `;
}
}