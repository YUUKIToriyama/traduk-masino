// Translation APIにアクセスするためのライブラリを読み込みます。
const { TranslationServiceClient } = require("@google-cloud/translate");
const fs = require('fs');
const secret = JSON.parse(fs.readFileSync('./secret.json', 'utf8'));

// 翻訳機を準備します。
const translator = new TranslationServiceClient({
	keyFilename: "./secret.json" // 秘密鍵の保存された場所を指定します。
});

// 任意のテキストを受け取って英語に変換する関数を作ります。
const translateText = async (glossaryId, text) => {
	const projectId = secret["project_id"];
	const [response] = await translator.translateText({
		parent: `projects/${projectId}/locations/us-central1`,
		contents: [text],
		sourceLanguageCode: "ja",
		targetLanguageCode: "en",
		glossaryConfig: {
			glossary: glossaryId
		}
	});
	console.log(response.translations);
	console.log(response.glossaryTranslations);
};

// 実行例
translateText(process.argv[2], process.argv[3]);