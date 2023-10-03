import * as vscode from 'vscode';

/**
 * ホバー表示
 */
export class MyExtHoverProvider implements vscode.HoverProvider {

	provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
		const hover: vscode.ProviderResult<vscode.Hover> = new vscode.Hover(
			new vscode.MarkdownString(
						`### title\n` +
						`text`
				)
		);
        return hover;
    }

}