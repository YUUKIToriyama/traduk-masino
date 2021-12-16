const { TranslationServiceClient } = require("@google-cloud/translate").v3;
const fs = require('fs');
const secret = JSON.parse(fs.readFileSync('./secret.json', 'utf8'));

// 用語集を設定
const setGlossary = async (glossaryUri) => {
	const projectId = secret["project_id"];
	const location = "us-central1";
	const glossaryId = "my-custom-glossary";

	const translationClient = new TranslationServiceClient({
		keyFilename: "./secret.json"
	});
	const [operation] = await translationClient.createGlossary({
		parent: `projects/${projectId}/locations/${location}`,
		glossary: {
			languageCodesSet: {
				languageCodes: ["ja", "en"]
			},
			inputConfig: {
				gcsSource: {
					inputUri: glossaryUri
				}
			},
			name: `projects/${projectId}/locations/${location}/glossaries/${glossaryId}`
		}
	});
	const result = await operation.promise();
	console.log(result[0].name);
}

setGlossary(process.argv[2]);