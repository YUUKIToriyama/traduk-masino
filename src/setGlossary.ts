import { v3 } from '@google-cloud/translate';
import { GCPSecretKey } from './main';

export const setGlossary = async (csvUri: string, glossaryId: string, secret: GCPSecretKey) => {
	const location = "us-central1";
	const translationClient = new v3.TranslationServiceClient({
		key: secret.private_key,
		projectId: secret.project_id
	});
	const [operation] = await translationClient.createGlossary({
		parent: `projects/${secret.project_id}/locations/${location}`,
		glossary: {
			languageCodesSet: {
				languageCodes: ["ja", "en"]
			},
			inputConfig: {
				gcsSource: {
					inputUri: csvUri
				}
			},
			name: `projects/${secret.project_id}/locations/${location}/glossaries/${glossaryId}`
		}
	});
	return operation.promise();
}