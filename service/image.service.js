const Jimp = require('jimp');

class ImageService {
	rotateImage() {}

	optimazeImage(buffer, filePath, withOutCrop = false) {
		Jimp.read(buffer)
			.then((image) => {
				if ((image.bitmap.width > 1920 || image.bitmap.height > 1080) && !withOutCrop) {
					image.cover(1920, 1080, Jimp.HORIZONTAL_ALIGN_CENTER);
				}
				image.quality(40);

				return image;
			})
			.then((image) => {
				image.quality(40).write(filePath);
				return image;
			})
			.catch((err) => {
				return err;
			});
	}

	optimazeAndCopyBlurImage(buffer, filePath, blurFilePath) {
		Jimp.read(buffer)
			.then((image) => {
				if (image.bitmap.width > 1920 || image.bitmap.height > 1080) {
					image.cover(1920, 1080, Jimp.HORIZONTAL_ALIGN_CENTER);
				}
				image.quality(40).write(filePath);
				return image;
			})
			.then((image) => {
				image.blur(50).write(blurFilePath);
				return image;
			})
			.catch((err) => {
				return err;
			});
	}
}

module.exports = new ImageService();
