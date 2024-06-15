// todo: check this with Ajv first
import json from '../data/MapareatexturePersistentLevel.json' with {
	type: 'json'
}

const [{
	Properties: {
		mAreaData,
		mColorPalette,
		mDataWidth,
	},
}] = json;

export function json_to_Uint8ClampedArray(): Uint8ClampedArray {

	const data = new Uint8ClampedArray(mDataWidth * mDataWidth * 4);

	for (let index=0; index < mAreaData.length; ++index) {
		if (mAreaData[index] >= mColorPalette.length) {
			throw new Error(`No palette at index ${index}`);
		}
		const {R, G, B, A} = mColorPalette[mAreaData[index]];

		data.set([R, G, B, A], index * 4);
	}

	return data;
};

export {
	mDataWidth,
}
