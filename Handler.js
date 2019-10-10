'use strict';
var path = require('path'), fs = require('fs')
var throttleDebounce = require('throttle-debounce')

module.exports = class Handler {
    constructor(options) {
        // Default options
        this.options = Object.assign({
            encoding: 'utf-8',
            cwd: '.',
        }, options);
    }

    handle(compiler) {
        var cwd = this.options.cwd
        var file = path.resolve('.', this.options.file)
        var appendFile = path.resolve('.', this.options.appendFile)
        var prependFile = path.resolve('.', this.options.prependFile)

        var backupFile = this.doBackupFile(file)
        this.changeFile(file, backupFile, prependFile, appendFile)
    }

    changeFile(file, backupFile, prependFile, appendFile) {
        var encoding = this.options.encoding

        this.replaceFile(backupFile, file, content => {
            if (prependFile) {
                content = fs.readFileSync(prependFile, encoding) + content;
            }
            if (appendFile) {
                content += fs.readFileSync(appendFile, encoding);
            }
            return content
        })

        //console.log('replaced:', file)
        this.watchFile(file, backupFile, prependFile, appendFile)
    }

    doBackupFile(file) {
        var backupFile = file + '.bck'
        //原始文件备份
        if (!fs.existsSync(backupFile)) {
            this.replaceFile(file, backupFile, null)
        }
        return backupFile
    }

    watchFile(file, backupFile, prependFile, appendFile) {
        var it = this;

        (it.watches || []).map(watch => watch.close())
        it.watches = []
        var debounceCall = throttleDebounce.debounce(100, onChange)
        //if (this.options.isDev) {
        if (prependFile) it.watches.push(fs.watch(prependFile, debounceCall))
        if (appendFile) it.watches.push(fs.watch(appendFile, debounceCall))
        //}

        function onChange(type, name) {
            // console.log(type,name)
            if (fs.existsSync(file)) {
                it.changeFile(file, backupFile, prependFile, appendFile)
            }
        }
    }

    replaceFile(srcFile, targetFile, replaceFn) {
        var encoding = this.options.encoding
        var content = fs.readFileSync(srcFile, encoding);
        if (replaceFn) content = replaceFn(content);
        fs.writeFileSync(targetFile || srcFile, content, encoding)
    }
}
