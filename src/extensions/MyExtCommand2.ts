import * as vscode from "vscode";
import { getUri } from "../utilities/getUri";
import { getNonce } from "../utilities/getNonce";

export class MyExtCommand2 {

    execute(extensionUri:vscode.Uri) {
        try {
            // 開いているエディターのファイルを保存
            // vscode.workspace.saveAll(false);

            this.createEditor(extensionUri);

            // 正常時
            vscode.window.showInformationMessage("コマンドを実行しました");
        } catch(e) {
            vscode.window.showErrorMessage(
                "エラーが発生しました"
            );
        }
    }

	createEditor(extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		const panel = vscode.window.createWebviewPanel(
			"HelloWorld",
			"Hello World",
			column || vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [
				  vscode.Uri.joinPath(extensionUri, 'out'),
				  vscode.Uri.joinPath(extensionUri, 'style'),
				  vscode.Uri.joinPath(extensionUri, 'node_modules'),
				]
			}			
		);

		panel.webview.html = this._getHtmlForWebview(panel.webview, extensionUri);
	}

	_getHtmlForWebview(webview: vscode.Webview, extensionUri: vscode.Uri):string {

		const textSetting = vscode.workspace.getConfiguration('MyExt').get('textSetting');
		const booleanSetting = vscode.workspace.getConfiguration('MyExt').get('booleanSetting');
	
		const scriptUri = this.getUri(webview, extensionUri, "out/scripts", "index.js");
		const codiconsUri = this.getUri(webview, extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css');
	
		const nonce = getNonce();
	
		// 画面デザインのガイドライン
		//   https://github.com/microsoft/vscode-webview-ui-toolkit/blob/main/docs/components.md
		// WebViewで表示したいHTMLを設定します
		return /* html */ `
		  <!DOCTYPE html>
		  <html lang="ja">
		  <head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
			<title>WebView Example</title>
	
			<link rel="stylesheet" href="${codiconsUri}" />
			<script type="module" nonce="${nonce}" src="${scriptUri}"></script>
		  </head>
		  <body>
			<h1>MySidebar Webview</h1>
			<h2>extensions configuration</h2>
			<p>textSetting: ${textSetting}</p>
			<p>booleanSetting: ${booleanSetting}</p>
			<h2>script test</h2>
			<vscode-button id="button">Click me!</vscode-button>
			<p id="message"></p>
			<h2>components</h2>
	
			<fieldset>
			  <legend>vscode-button</legend>
			  <vscode-button appearance="primary">Button Text</vscode-button>
			  <vscode-button appearance="secondary">Button Text</vscode-button>
			  <vscode-button>
				<span class="codicon codicon-check"></span>
					  Button Text
			  </vscode-button>
				  <vscode-button type="submit">Submit Button</vscode-button>
			</fieldset>
	
			<fieldset>
			  <legend>vscode-badge</legend>
			  <vscode-badge>1</vscode-badge>
			</fieldset>
	
			<fieldset>
			  <legend>vscode-checkbox</legend>
			  <vscode-checkbox checked required>Checked + Required</vscode-checkbox>
			  <vscode-checkbox checked readonly>Checked + Readonly</vscode-checkbox>
			  <vscode-checkbox autofocus>Autofocus</vscode-checkbox>
			  <vscode-checkbox disabled>Disabled</vscode-checkbox>
			  <vscode-checkbox value="baz">Value Set To "baz"</vscode-checkbox>
			</fieldset>
	 
			<fieldset>
			  <legend>vscode-divider</legend>
			  <vscode-divider></vscode-divider>
			</fieldset>
	
			<fieldset>
			  <legend>vscode-link</legend>
			  <vscode-link href="#">Link Text</vscode-link>
			</fieldset>
	
			<fieldset>
			  <legend>vscode-dropdown</legend>
			  <vscode-dropdown>
				<vscode-option>Option Label #1</vscode-option>
				<vscode-option>Option Label #2</vscode-option>
				<vscode-option>Option Label #3</vscode-option>
			  </vscode-dropdown>
			</fieldset>
	
			<fieldset>
			<legend>vscode-panels</legend>
			  <vscode-panels>
				<vscode-panel-tab id="tab-1">PROBLEMS</vscode-panel-tab>
				<vscode-panel-tab id="tab-2">OUTPUT</vscode-panel-tab>
				<vscode-panel-tab id="tab-3">DEBUG CONSOLE</vscode-panel-tab>
				<vscode-panel-tab id="tab-4">TERMINAL</vscode-panel-tab>
				<vscode-panel-view id="view-1">
				  <section style="display: flex; flex-direction: column; width: 100%;">
					<h1 style="margin-top: 0;">Smoothie Maker 🍓</h1>
					<vscode-checkbox>Apples</vscode-checkbox>
					<vscode-checkbox>Oranges</vscode-checkbox>
					<vscode-checkbox>Grapes</vscode-checkbox>
					<vscode-checkbox disabled>Blueberries</vscode-checkbox>
					<vscode-checkbox>Pineapple</vscode-checkbox>
					<vscode-checkbox>Mango</vscode-checkbox>
					<vscode-checkbox>Lemon</vscode-checkbox>
					<vscode-button>Make Smoothie!</vscode-button>
				  </section>
				</vscode-panel-view>
				<vscode-panel-view id="view-2"> ... Insert Complex Content ... </vscode-panel-view>
				<vscode-panel-view id="view-3"> ... Insert Complex Content ... </vscode-panel-view>
				<vscode-panel-view id="view-4"> ... Insert Complex Content ... </vscode-panel-view>
			  </vscode-panels>
			</fieldset>
	
			<fieldset>
			  <legend>vscode-progress-ring</legend>
			  <vscode-progress-ring></vscode-progress-ring>
			</fieldset>
	
			<fieldset>
			  <legend>vscode-radio</legend>
			  <vscode-radio-group name="example-radio-group">
				<vscode-radio value="1">Radio Label1</vscode-radio>
				<vscode-radio value="2">Radio Label2</vscode-radio>
			  </vscode-radio-group>
			</fieldset>
			
			<fieldset>
			  <legend>vscode-tag</legend>
			  <vscode-tag>Tag Text</vscode-tag>
			</fieldset>
	
			<fieldset>
			  <legend>vscode-text-area</legend>
			  <vscode-text-area form="sample-form" rows="5">Text Area</vscode-text-area>
			</fieldset>
	
			<fieldset>
			  <legend>vscode-text-field</legend>
			  <vscode-text-field>
				Text Field
				<span slot="start" class="codicon codicon-search"></span>
			  </vscode-text-field>
			</fieldset>
			</body>
		  </html>
		`;
	  }
	
	 /**
	   * パスリストを指すURIを取得する
	   * @param pathList 
	   * @returns 
	  */
	  private getUri(webview: vscode.Webview, extensionUri:vscode.Uri, ...pathList: string[]): vscode.Uri {
		return getUri(webview, extensionUri, pathList);
	  }

}
