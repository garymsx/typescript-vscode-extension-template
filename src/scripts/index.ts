declare const acquireVsCodeApi: any;

const vscode = acquireVsCodeApi();

const button = document.getElementById('button') as HTMLButtonElement;
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