import fs from 'fs';
import { translate } from './translate';
import { setGlossary } from './setGlossary';
import { translateWithGlossary } from './translateWithGlossary';

export interface GCPSecretKey extends Record<string, string> {
	project_id: string
	private_key_id: string
	private_key: string
	client_id: string
}

export class Translator {
	secret: GCPSecretKey

	constructor(options: { keyFilePath: string }) {
		const secretKeyfile = fs.readFileSync(options.keyFilePath, "utf-8");
		this.secret = JSON.parse(secretKeyfile);
	}

	translate = async (text: string) => {
		const result = await translate(text, this.secret);
		console.log(result);
	}

	setGlossary = async (csvUri: string, glossaryId: string) => {
		const result = await setGlossary(csvUri, glossaryId, this.secret);
		console.log(result);
	}

	translateWithGlossary = async (text: string, glossaryId: string) => {
		const [result] = await translateWithGlossary(text, glossaryId, this.secret);
		console.log({
			translation: result.translations,
			glossaryTranslation: result.glossaryTranslations
		});
	}
}