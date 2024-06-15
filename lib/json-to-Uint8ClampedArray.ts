import assert from 'assert';
import {
	existsSync,
} from 'fs';
import {
	readFile,
	writeFile,
} from 'fs/promises';

const here_is_one_we_made_earlier = `${import.meta.dirname}/../data/MapareatexturePersistentLevel.bin`

export const mDataWidth = 4096;

export async function json_to_Uint8ClampedArray(): Promise<Uint8ClampedArray|Buffer> {
	if (!existsSync(here_is_one_we_made_earlier)) {
		const {default: [{
			Properties: {
				mAreaData,
				mColorPalette,
				mDataWidth: mDataWidth_from_json,
			},
		}]} = await import(
			// todo: check this with Ajv first
			`${import.meta.dirname}/../data/MapareatexturePersistentLevel.json`,
			{
				with: {
					type: 'json',
				},
			}
		);

		assert.strictEqual(mDataWidth, mDataWidth_from_json, new Error(
			`mDataWidth changed!`
		))

	const data = new Uint8ClampedArray(mDataWidth * mDataWidth * 4);

	for (let index=0; index < mAreaData.length; ++index) {
		if (mAreaData[index] >= mColorPalette.length) {
			throw new Error(`No palette at index ${index}`);
		}
		const {R, G, B, A} = mColorPalette[mAreaData[index]];

		data.set([R, G, B, A], index * 4);
	}

	await writeFile(here_is_one_we_made_earlier, data);

	return data;
	} else {
		return readFile(here_is_one_we_made_earlier);
	}
};
