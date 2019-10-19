## join-file-content-plugin
A webpack plugin, auto prepend or append file to a target file while webpack starting.    
When the prepending or appending file changed, do this again.

#### sapmle
For `element-ui`, we need to prepend some customized variables before the `element-ui` variable [scss] file `node_modules/element-theme-chalk/src/common/var.scss` (`sass-loader` can do this but does't support file).    

We can set the customized variables in a file `theme-changed.scss`, and use this plugin to prepend this file to the `var.scss` of element-ui.    

Config webpack like this:

````js
// webpack-config.js
const JoinFileContentPlugin = require('join-file-content-plugin')

module.exports = {
    /* other configs here */
    plugins:[
        /* other plugins here */
        new JoinFileContentPlugin({
            file: 'node_modules/element-theme-chalk/src/common/var.scss', // target file for changing.
            prependFile: 'src/css/element-theme/theme-changed.scss', // file for prepending before the target file. optional.
            // appendFile: '', // file for appending to the target file. optional.
            // cwd: '.', // relative to this path. optional.
            // encoding: 'utf-8', // text encoding. optional.
        }),
    ]
}
````

After we change the variables in `theme-changed.scss`, webpack will hot-reload it for preview.

[Here](https://github.com/hzsrc/vue-element-ui-scaffold-webpack4) is the whole project for this sample.
