var webpack = require('webpack');
var path = require('path');

var APP_LOCATION = path.join(__dirname, 'app');

module.exports = {
    devtool: 'eval',
    context: APP_LOCATION,
    entry: {
        app: ['webpack/hot/only-dev-server', './index.js'],
        vendor: ['angular', 'angular-ui-router', 'oclazyload']
    },
    output: {
        path: APP_LOCATION,
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    module: {
        preLoaders: [
            {test: /\/index.js$/, loader: path.join(APP_LOCATION, '../angular-hot-loader'), exclude: /node_module/}
        ],
        loaders: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style!css!sass'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'ng-annotate!babel'
            },
            {
                test: /\.html$/,
                loader: 'raw',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        })
    ]
};
