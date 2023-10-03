import * as vscode from 'vscode';

/**
 * パラメータヒント
 */
export class MyExtSignatureHelpProvider implements vscode.SignatureHelpProvider {

    provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.SignatureHelpContext): vscode.ProviderResult<vscode.SignatureHelp> {
        const signatureHelp = new vscode.SignatureHelp();

        signatureHelp.activeParameter = 0;
        signatureHelp.activeSignature = 0;

		const markdown = new vscode.MarkdownString();

		markdown.appendMarkdown(`function document`);

		const signature1 = new vscode.SignatureInformation("param1:string, param2:string", markdown);
		signature1.parameters = [
			new vscode.ParameterInformation("param1:string", new vscode.MarkdownString("param1 document")), // activeParameter = 0
			new vscode.ParameterInformation("param2:string", new vscode.MarkdownString("param2 document"))  // activeParameter = 1
		];

		const signature2 = new vscode.SignatureInformation("param1:number, param2:number", markdown);
		signature2.parameters = [
			new vscode.ParameterInformation("param1:string", new vscode.MarkdownString("param1 document")),  // activeParameter = 0
			new vscode.ParameterInformation("param2:string", new vscode.MarkdownString("param2 document"))   // activeParameter = 1
		];

		signatureHelp.signatures = [
			signature1,   // activeSignature = 0
			signature2    // activeSignature = 1
		];

		return signatureHelp;
    }

}
