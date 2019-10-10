var Plugin = require('./')

new Plugin({
    file: './test/target.scss',
    appendFile: './test/append.scss',
    prependFile: './test/prepend.scss',
}).apply()

setInterval(t => {
}, 1000)
