var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
    filename: '[name]-css.css',
    allChunks: true
});
const extractLESS = new ExtractTextPlugin({
    filename: '[name]-less.css',
    allChunks: true
});

module.exports = function (env) {
    return {
        devtool: 'cheap-module-eval-source-map',
        entry: {
            app: ['./server/bin/dev-client', './client/src/index.js']
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, './client/dist/'),
            publicPath: '/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                __DEV_CLIENT__: true,
                __DEV_SERVER__: false,
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            extractCSS,
            extractLESS,
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: function () {
                        return [
                            require("autoprefixer")({
                                browsers: ['iOS >= 7', 'Android >= 4']
                            })
                        ];
                    }
                }
            })
        ],
        module: {
            rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['es2015', {module: false}],
                        'react', 'stage-0', 'react-hmre'
                    ],
                    plugins: ['add-module-exports', 'transform-runtime', ['import', {
                        libraryName: 'antd',
                        libraryDirectory: 'lib',
                        style: true
                    }]]
                }
            }, {
                test: require.resolve('prop-types'),
                loader: 'expose-loader?PropTypes',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: extractCSS.extract(['css-loader?minimize', 'postcss-loader']),
                exclude: /node_modules/
            }, {
                test: /\.less$/i,
                use: extractLESS.extract(['css-loader?minimize', 'less-loader']),
            }, {
                test: /\.(png|jpe?g|gif|eot|svg|ttf|woff|woff2)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name]_[hash:8].[ext]'
                    }
                }],
                exclude: /node_modules/
            }]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css', '.scss', '.less', '.json'],
            alias: {
                client: path.resolve(__dirname, './client'),
                server: path.resolve(__dirname, './server'),
                components: path.resolve(__dirname, './client/src/components'),
                containers: path.resolve(__dirname, './client/src/containers'),
                constants: path.resolve(__dirname, './client/src/constants'),
                middleware: path.resolve(__dirname, './client/src/middleware'),
                routes: path.resolve(__dirname, './client/src/routes'),
                static: path.resolve(__dirname, './client/src/static'),
                plugins: path.resolve(__dirname, './client/src/plugins'),
                api: path.resolve(__dirname, './server/controllers/api'),
            }
        }
    };
};