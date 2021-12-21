import { v3 } from '@google-cloud/translate';
import { GCPSecretKey } from './main';

export const translateWithGlossary = (text: string, glossaryId: string, secret: GCPSecretKey) => {
	const translator = new v3.TranslationServiceClient({
		projectId: secret.project_id,
		key: secret.private_key
	});
	return translator.translateText({
		parent: `projects/${secret.project_id}/locations/us-central1`,
		contents: [text],
		sourceLanguageCode: "ja",
		targetLanguageCode: "en",
		glossaryConfig: {
			glossary: glossaryId
		}
	});
}