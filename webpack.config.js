const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    devServer: {
        static: './public',
        hot: true,
        port: 8080,
    },
    plugins: [
    ],
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js',
    }
}