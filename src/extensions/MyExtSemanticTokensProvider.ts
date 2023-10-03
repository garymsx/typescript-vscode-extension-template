import * as vscode from "vscode";


const patternMap:[pattern:RegExp, type:string][] = [
    [/\/\/.*/                            , "comment"],      // コメント
	[/(while|for|if|return)\b/           , "keyword"],      // 制御文
	[/function\b/                        , "keyword"],      // 関数宣言
	[/const|let|var\b/                   , "type"],         // 変数宣言
	[/\.[A-Za-z_]\w*/                    , "method"],       // メソッド
	[/==|\+=|-=|<=|>=|!=|\+\+|--/        , "operator"],     // ２文字の演算子
	[/=|<|>|\+|-|\*|\/|%/                , "operator"],     // １文字の演算子
	[/[0-9]+/                            , "number"],       // 数値
	[/".*?"|'.*?'/                       , "string"],       // 文字列(エスケープ省略)
	[/[A-Za-z_]\w*/                      , "variable"],     // キーワード以外の単語は変数として扱う
	[/\s+/                               , ""],             // 空白
	[/.+?/                               , ""],             // それ以外の単語(日本語とか)
];

const keywordPattern = new RegExp(
	patternMap.map(it => it[0].source).join("|"),
	"g"
);

// トークンにindexをマップしておきたい
const tokenTypes = new Map<string, number>();
const tokenModifiers = new Map<string, number>();

export const MyExtLegend = (function () {
    const tokenTypesLegend = [
        "namespace",          // 名前空間、モジュール、またはパッケージを宣言または参照する識別子用。
        "class",              // クラス型を宣言または参照する識別子用。
        "enum",               // 列挙型を宣言または参照する識別子用。
        "interface",          // インターフェイス型を宣言または参照する識別子用。
        "struct",             // 構造体型を宣言または参照する識別子用。
        "typeParameter",      // 型パラメーターを宣言または参照する識別子の場合。
        "type",               // 上記でカバーされていない型を宣言または参照する識別子の場合。
        "parameter",          // 関数またはメソッドのパラメーターを宣言または参照する識別子用。
        "variable",           // ローカル変数またはグローバル変数を宣言または参照する識別子用。
        "property",           // メンバー プロパティ、メンバー フィールド、またはメンバー変数を宣言または参照する識別子の場合。
        "enumMember",         // 列挙プロパティ、定数、またはメンバーを宣言または参照する識別子の場合。
        "decorator",          // デコレータとアノテーションを宣言または参照する識別子用。
        "event",              // イベント プロパティを宣言する識別子用。
        "function",           // 関数を宣言する識別子用。
        "method",             // メンバー関数またはメソッドを宣言する識別子用。
        "macro",              // マクロを宣言する識別子用。
        "label",              // ラベルを宣言する識別子用。
        "comment",            // コメントを表すトークン用。
        "string",             // 文字列リテラルを表すトークンの場合。
        "keyword",            // 言語キーワードを表すトークンの場合。
        "number",             // 数値リテラルを表すトークンの場合。
        "regexp",             // 正規表現リテラルを表すトークンの場合。
        "operator",           // オペレーターを表すトークンの場合。
    ];
    tokenTypesLegend.forEach((tokenType, index) =>
        tokenTypes.set(tokenType, index)
    );

    // このサンプルでは使っていない
    const tokenModifiersLegend = [
        "declaration",        // シンボルの宣言用。
        "definition",         // ヘッダー ファイルなどのシンボルの定義用。
        "readonly",           // 読み取り専用変数およびメンバー フィールド (定数) の場合。
        "static",             // クラス メンバー (静的メンバー) の場合。
        "deprecated",         // 使用されなくなったシンボル用。
        "abstract",           // 抽象型およびメンバー関数の場合。
        "async",              // 非同期とマークされた関数用。
        "modification",       // 変数が割り当てられている変数参照用。
        "documentation",      // ドキュメント内のシンボルの出現。
        "defaultLibrary",     // 標準ライブラリの一部であるシンボル用。
    ];
    tokenModifiersLegend.forEach((tokenModifier, index) =>
        tokenModifiers.set(tokenModifier, index)
    );

    return new vscode.SemanticTokensLegend(
        tokenTypesLegend,
        tokenModifiersLegend
    );
})();

/**
 * セマンティックハイライト
 */
export class MyExtSemanticTokensProvider
    implements vscode.DocumentSemanticTokensProvider
{
    async provideDocumentSemanticTokens(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): Promise<vscode.SemanticTokens> {

        try {
			const builder = new vscode.SemanticTokensBuilder();

			const text = document.getText();
			const tokens:string[] = [];

            let row = 0;
			for(const line of text.split(/\r\n|\n/)) {
				let match:RegExpExecArray | null;
				while((match = keywordPattern.exec(line))) {
                    const token = match[0];
                    const col = match.index;

                    builder.push(
                        row,
                        col,
                        token.length,
                        this.encodeTokenType(token),
                        tokenModifiers.size + 2       // modifierは省略
                    );
                }
                row++;
			}

			return builder.build();
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    private encodeTokenType(token: string): number {
        let patternName = "";
        for(const [pattern, type] of patternMap) {
            if(pattern.test(token)) {
                // 確認用
                // console.log(`token: "${token}", type: "${type}"`);
                patternName = type;
                break;
            }
        }

        if(tokenTypes.has(patternName)) {
            return tokenTypes.get(patternName)!;
        }
        else {
            return tokenTypes.size + 2; // typeの割り当てなし
        }
    }
}
