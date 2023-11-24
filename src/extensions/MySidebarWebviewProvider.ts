import * as vscode from "vscode";

export class MySidebarWebviewProvider implements vscode.WebviewViewProvider {
  webviewView?: vscode.WebviewView;

  constructor(private extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.extensionUri, 'out/scripts'),
        vscode.Uri.joinPath(this.extensionUri, 'style'),
      ]
    };

    this.webviewView = webviewView;

    webviewView.webview.onDidReceiveMessage((data) => {
      switch(data.type){
        case "clicked":
          console.log(data.text);
          break;
      }
    });

    this.getHtmlForWebview(webviewView);
  }

  getHtmlForWebview(webviewView: vscode.WebviewView) {
    const textSetting = vscode.workspace.getConfiguration('MyExt').get('textSetting');
    const booleanSetting = vscode.workspace.getConfiguration('MyExt').get('booleanSetting');

    const scriptUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "out/scripts", "index.js")
    );

    const cssUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "style", "index.css")
    );

    // WebViewで表示したいHTMLを設定します
    webviewView.webview.html = `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WebView Example</title>
        <link rel="stylesheet" type="text/css" href="${cssUri}"/>
      </head>
      <body>
        <h1>MySidebar Webview</h1>
        <h2>extensions configuration</h2>
        <p>textSetting: ${textSetting}</p>
        <p>booleanSetting: ${booleanSetting}</p>
        <h2>script</h2>
        <button id="button" class="button">OK</button>
        <script src="${scriptUri}"></script>
        <p id="message"></p>
      </body>
      </html>
    `;
  }
}