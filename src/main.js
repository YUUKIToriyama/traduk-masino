// Translation APIにアクセスするためのライブラリを読み込みます。
const { Translate } = require("@google-cloud/translate").v2;

// 翻訳機を準備します。
const translator = new Translate({
	projectId: "torichan-0129", // プロジェクトIDを指定します。
	keyFilename: "./secret.json" // 秘密鍵の保存された場所を指定します。
});

// 任意のテキストを受け取って英語に変換する関数を作ります。
const translateText = async (text) => {
	const target = "en"; // 何語に翻訳したいかを指定します。今回は英語を指定。
	const result = await translator.translate(text, target); // translate関数で翻訳を実行。
	console.log(result); // 結果をコンソールに表示します。
};

// 実行例
translateText("好きな食べ物はハンバーグです。");