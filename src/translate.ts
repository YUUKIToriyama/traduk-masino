import { GCPSecretKey } from './main';
import { v2 } from '@google-cloud/translate';

export const translate = (text: string, secret: GCPSecretKey) => {
	const target = "en";
	const translator = new v2.Translate({
		key: secret.private_key,
		projectId: secret.project_id
	});
	return translator.translate(text, target);
}