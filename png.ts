import {
	json_to_sharp,
} from './';

await json_to_sharp().png({
	progressive: true,
	compressionLevel: 9,
	adaptiveFiltering: true,
	quality: 100,
	effort: 10,
	palette: true,
}).toFile(`${import.meta.dirname}/data/MapareatexturePersistentLevel.png`);
