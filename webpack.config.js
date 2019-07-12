const path = require('path');

module.exports = {
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [path.resolve('./src'), 'node_modules']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loaders: 'ts-loader' },
            { test: /\.html$/, loader: 'html' }
        ]
    },
    mode: 'development',
    devServer: {
        inline: true,
        port: 4040
    },
    devtool: "source-map"
}