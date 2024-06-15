import {
	json_to_Uint8ClampedArray,
	mDataWidth,
} from './json-to-Uint8ClampedArray';
import sharp, {
	type Sharp,
} from 'sharp';

export async function json_to_sharp(): Promise<Sharp>
{
	return sharp(await json_to_Uint8ClampedArray(), {
		raw: {
			premultiplied: false,
			width: mDataWidth,
			height: mDataWidth,
			channels: 4,
		},
	});
}
