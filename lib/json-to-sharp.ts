import {
	json_to_Uint8ClampedArray,
	mDataWidth,
} from './json-to-Uint8ClampedArray';
import sharp, {
	type Sharp,
} from 'sharp';

export function json_to_sharp(): Sharp
{
	return sharp(json_to_Uint8ClampedArray(), {
		raw: {
			premultiplied: false,
			width: mDataWidth,
			height: mDataWidth,
			channels: 4,
		},
	});
}
