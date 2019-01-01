const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: ['babel-polyfill','./src/app.js'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
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
                                    sourcemap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourcemap: true
                                }
                            }
                        ]
                })
            }]
        },
        plugins: [ CSSExtract ],
        // devtool: 'cheap-module-eval-source-map',
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            publicPath: '/dist/' 
        }
    }
}