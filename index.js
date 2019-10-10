'use strict';
var Handler = require('./Handler')

class joinFileContent {
    constructor(options) {
        this.handler = new Handler(options)
    }

    // getBinder(compiler, event) {
    //     return compiler.hooks
    //         ? compiler.hooks[event].tapAsync.bind(compiler.hooks[event], 'joinFileContent')
    //         : compiler.plugin.bind(compiler, event)
    // }

    apply(compiler) {
        this.handler.handle(compiler)
    }
}

module.exports = joinFileContent;
