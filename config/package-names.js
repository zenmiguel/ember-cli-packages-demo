var fs = require('fs'),
    path = require('path');

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

module.exports = getDirectories('app').filter(function(directory) {
    switch (directory) {
        case 'boot':
        case 'initializers':
        case 'resolvers':
        case 'mirage':
            return false;
        default:
            return true;
    }
});
