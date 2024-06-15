import {
	json_to_sharp,
	setup_PerformanceObserver,
} from './';

setup_PerformanceObserver();

performance.mark('start');

await (await json_to_sharp()).png({
	progressive: true,
	compressionLevel: 9,
	adaptiveFiltering: true,
	quality: 100,
	effort: 10,
	palette: true,
}).toFile(`${import.meta.dirname}/data/MapareatexturePersistentLevel.png`);

performance.measure('done', 'start');
