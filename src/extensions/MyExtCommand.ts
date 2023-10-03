import * as vscode from 'vscode';

export class MyExtCommand {

    execute() {
        try {
            // 開いているエディターのファイルを保存
            // vscode.workspace.saveAll(false);

            this.createEditor("Hello World.");

            // 正常時
            vscode.window.showInformationMessage("コマンドを実行しました");
        } catch(e) {
            vscode.window.showErrorMessage(
                "エラーが発生しました"
            );
        }
    }

    /**
     * エディタを新規に作成する
     * @param document 
     */
    private createEditor(document:string) {
        vscode.workspace.openTextDocument().then((doc) => {
            const edit = new vscode.WorkspaceEdit();
            const textEdit = new vscode.TextEdit(
                new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0)), document
            );
            edit.set(doc.uri, [textEdit]);

            vscode.workspace.applyEdit(edit).then((success) => {
                if (success) {
                    vscode.window.showTextDocument(doc);
                } else {
                    vscode.window.showErrorMessage('ファイルの作成に失敗しました。');
                }
            });
        });
    }

}
