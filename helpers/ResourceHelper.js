const fs = require('fs');
const path = require('path');

class ResourceHelper {

	static uploadsPath() {
		return process.env.UPLOAD_FOLDER || path.join(__basedir, 'tmp');
	}

	static fontsPath() {
		return path.join(__basedir, 'static', 'fonts');
	}

	static uploadedFilePath(filename) {
		return path.join(ResourceHelper.uploadsPath(), filename);	
	}

	static fontPath(fontName) {
		return path.join(ResourceHelper.fontsPath(), fontName);	
	}

	static deleteUploadedFileWithPath(filepath) {
		fs.unlinkSync(filepath);
	}

	static deleteUploadedFile(filename) {
		fs.unlinkSync(`${ResourceHelper.uploadsPath()}/${filename}`);
	}

}

module.exports = ResourceHelper;