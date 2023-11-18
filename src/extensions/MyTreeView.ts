import * as vscode from "vscode";

export interface MyTreeViewItem {
    label: string;
}

export class MyTreeViewProvider
    implements vscode.TreeDataProvider<MyTreeViewItem>
{
    getTreeItem(element: MyTreeViewItem): vscode.TreeItem {
        return {
            label: element.label,
        };
    }

    getChildren(
        element?: MyTreeViewItem
    ): MyTreeViewItem[] | Thenable<MyTreeViewItem[]> {
        if (!element) {
            return [
                { label: "MyTreeView Item 1" },
                { label: "MyTreeView Item 1" },
            ];
        } else {
            return [];
        }
    }
}
