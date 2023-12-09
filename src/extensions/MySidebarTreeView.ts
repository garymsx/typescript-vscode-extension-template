import * as vscode from "vscode";

export interface MySidebarTreeViewItem {
    label: string;
}

export class MySidebarTreeViewProvider
    implements vscode.TreeDataProvider<MySidebarTreeViewItem>
{
    getTreeItem(element: MySidebarTreeViewItem): vscode.TreeItem {
        return {
            label: element.label,
        };
    }

    getChildren(
        element?: MySidebarTreeViewItem
    ): MySidebarTreeViewItem[] | Thenable<MySidebarTreeViewItem[]> {
        if (!element) {
            return [
                { label: "MyTreeView Item 1" },
                { label: "MyTreeView Item 2" },
            ];
        } else {
            return [];
        }
    }
}
