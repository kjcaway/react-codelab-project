var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        './src/index.js',
        './src/style.css'
    ],

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    resolve: {
        root: path.resolve('./src')
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    "plugins": ["emotion"]
                })],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ]
};
