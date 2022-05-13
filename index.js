'use strict';

const through = require('through2');
const cheerio = require('cheerio');
const objectAssign = require('object-assign');

const defaultOptions = {
	decodeEntities: false,

	suffix: {
		1: '',
		2: '@2x'
	},

	reImageSrc: /^((?:(?:http|https):\/\/)?(?:.+))(\.(?:gif|png|jpg|jpeg|webp))$/
}

const imageRetina = function (options) {

	options = objectAssign({}, defaultOptions, options);

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-img-retina', 'Streaming not supported'));
			return;
		}

		const content = file.contents.toString();

		const $ = cheerio.load(content, options);

		const imgList = $('img');
		const sourceList = $('source');

		function imageList(list, option) {
			list.each(function () {
				const _this = $(this);
				const src = _this.attr(option);
	
				const tmpSrc = [];
				const match = src.match(options.reImageSrc);
	
				if (match === null) {
					return true;
				}
	
				for (let key in options.suffix) {
					tmpSrc.push(match[1] + options.suffix[key] + match[2] + ' ' + key + 'x');
				}
	
				_this.attr('srcset', tmpSrc.join(', '));
	
			});
		}

		imageList(imgList, 'src')
		imageList(sourceList, 'srcset')

		file.contents = new Buffer($.html());

		cb(null, file);
	});
}


module.exports = imageRetina;