import * as vscode from 'vscode';

const items:vscode.CompletionItem[] = [
	{
		label: "sample1",
		detail: "detail1",
		documentation: new vscode.MarkdownString("### title\ndocument"),
		kind: vscode.CompletionItemKind.Variable,
	},
	{
		label: "sample2",
		detail: "detail2",
		documentation: new vscode.MarkdownString("### title\ndocument"),
		kind: vscode.CompletionItemKind.Variable,
	}
];

/**
 * コード補完
 */
export class MyExtCompletionItemProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {

        // オートコンプリート用アイテムリスト
        const completionList = new vscode.CompletionList<vscode.CompletionItem>();

        // 最後に入力されたと思われる文字、もしくはCTRL+SPACEで呼び出された場合の直前の文字
        const ch = document.lineAt(position.line).text.substring(position.character - 1, position.character);

        // 入力されたキー文字
        if(ch === ".") {
			completionList.items.push(...items);
        }

        return completionList;

    }

    /**
     * 種別を返す
     * @param type 
     * @returns 
     */
    private getKind(type:string | undefined): vscode.CompletionItemKind {
        let kind = vscode.CompletionItemKind.Variable;
        if(type === "struct") kind = vscode.CompletionItemKind.Struct;
        if(type === "function") kind = vscode.CompletionItemKind.Function;
        if(type === "inile") kind = vscode.CompletionItemKind.Function;
        return kind;
    }

}

