const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const workboxPlugin = require('workbox-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: ['@babel/polyfill','./src/app.js'],
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'app.bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                })
            }]
        },
        plugins: [ 
            CSSExtract,
            new workboxPlugin.GenerateSW({
                cacheId: 'react-calculator',
                swDest: 'sw.js',
                navigateFallback: '/index.html',
                clientsClaim: true,
                skipWaiting: true
              })
        ],
        // devtool: 'cheap-module-eval-source-map',
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            publicPath: '/' 
        }
    }
}