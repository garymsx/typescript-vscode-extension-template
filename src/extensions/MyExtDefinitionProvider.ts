import * as vscode from 'vscode';

/**
 * 定義位置へジャンプ
 */
export class MyExtDefinitionProvider implements vscode.DefinitionProvider {

    provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Definition | vscode.LocationLink[]> {
		// ファイルの先頭へジャンプ
		const pos = new vscode.Position(0,0);
		const loc = new vscode.Location(document.uri, pos);
		return Promise.resolve(loc);
    }
}