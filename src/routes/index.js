const path = require('path');

const glob = require('glob');

const basename = path.basename(__filename);

module.exports = (router) => {
    glob
        .sync(`${__dirname}/**/*.js`)
        .filter((file) => {
            const fileName = file.split('/');
            return (
                fileName[fileName.length - 1].indexOf('.') !== 0 &&
                fileName[fileName.length - 1] !== basename &&
                fileName[fileName.length - 1].slice(-3) === '.js'
            );
        })
        .forEach((file) => {
            require(file)(router);
        });
};
