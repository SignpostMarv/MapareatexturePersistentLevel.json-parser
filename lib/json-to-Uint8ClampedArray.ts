import assert from 'assert';
import {
	existsSync,
} from 'fs';
import {
	readFile,
	writeFile,
} from 'fs/promises';

const here_is_one_we_made_earlier = `${
	import.meta.dirname
}/../data/MapareatexturePersistentLevel.bin`;

export const mDataWidth = 4096;

/*
// type too complex
type hexadecimal = (
	'0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'A'|'B'|'C'|'D'|'E'|'F'
);
type hexadecimal_pair = `${hexadecimal}${hexadecimal}`;
type hexadecimal_R = hexadecimal_pair;
type hexadecimal_G = hexadecimal_pair;
type hexadecimal_B = hexadecimal_pair;
type hexadecimal_A = hexadecimal_pair;
type Hex = `${hexadecimal_A}${hexadecimal_R}${hexadecimal_G}${hexadecimal_B}`;
*/

export async function json_to_Uint8ClampedArray(
): Promise<Uint8ClampedArray| Buffer> {
	if (!existsSync(here_is_one_we_made_earlier)) {
		const json_promise = import(
			// todo: check this with Ajv first
			`${
				import.meta.dirname
			}/../data/MapareatexturePersistentLevel.json`,
			{
				with: {
					type: 'json',
				},
			}
		) as Promise<{
			default: [{
				Properties: {
					mAreaData: number[],
					mColorPalette: {
						B: number,
						G: number,
						R: number,
						A: number,
						/*
						// type too complex
						Hex: `${Hex}`
						*/
						Hex: string,
					}[],
					mDataWidth: number,
				}
			}]
		}>;

		const {default: [{
			Properties: {
				mAreaData,
				mColorPalette,
				mDataWidth: mDataWidth_from_json,
			},
		}]} = await json_promise;

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
}
