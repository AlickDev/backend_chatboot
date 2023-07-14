const path = require('path');
const fs = require('fs-extra');

exports.uploadFile = async (files, _path) => {

    if (files != null) {
        const fileType = path.extname(files.originalname).toLowerCase();

        doc = `hello.${fileType}`;

        const newPath = path.resolve("uploads/images") + _path + "/" + doc;

        if (await fs.exists(newPath)) {
            await fs.remove(newPath);
        }

        await fs.moveSync(files.filepath, newPath);
        return doc;
    }
};


exports.deleteFile = async (path, img) => {
    let result = await fs.remove(path + img);
    return result;
}
