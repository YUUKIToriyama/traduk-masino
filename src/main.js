const { Translate } = require("@google-cloud/translate").v2;

const translator = new Translate({
	projectId: "",
	keyFilename: "./secret.json"
});

const translateText = async (text) => {
	const target = "en";
	const result = await translator.translate(text, target);
	console.log(result);
};

const textList = [
	"こんにちは",
	"私の名前は田中です。",
	"好きな食べ物はハンバーグです。",
	"どうぞよろしくお願いします。"
];

for (let text in textList) {
	translateText(text);
}