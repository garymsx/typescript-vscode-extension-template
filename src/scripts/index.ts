/**
 * WebViewから呼ばれるスクリプト
 */
import {
	provideVSCodeDesignSystem,
	allComponents, // すべてのUIコンポーネントが使えるようになる。vsCodeButtonのような難読の指定も可能
	Button         // HTML要素のButtonコンポーネントが使えるようになる
} from "@vscode/webview-ui-toolkit";

// 使用するコンポーネントを登録する
provideVSCodeDesignSystem().register(allComponents);

// VSCodeと通信を行うAPI
const vscode = acquireVsCodeApi();

// HTMLのJavaScriptと同じようにイベントを登録する
window.addEventListener("load", onload);

function onload() {
	const button = document.getElementById('button') as Button;
	button.addEventListener('click', () => {
		const message = document.getElementById('message') as HTMLSpanElement;
		message.textContent = 'clicked!';
		vscode.postMessage({ type: "clicked", text: "botton click" });
	});
	
	window.addEventListener("message", (event) => {
		if(event.data.type === "post") {
			const message = document.getElementById('message') as HTMLSpanElement;
			message.textContent = event.data.text;
		}
	});
}

