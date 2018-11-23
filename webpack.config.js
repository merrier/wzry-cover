const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
    filename: '[name].[chunkhash]-css.css',
    allChunks: true,
});
const extractLESS = new ExtractTextPlugin({
    filename: '[name].[chunkhash]-less.css',
    allChunks: true,
});

const commonConfig = {
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader?cacheDirectory',
                options: {
                    presets: [
                        ['es2015', { module: false }],
                        'react', 'stage-0',
                    ],
                    plugins: ['add-module-exports', 'transform-runtime', ['import', { libraryName: 'antd', style: 'css' }]],
                },
            },
        }, {
            test: /\.(png|jpe?g|gif|eot|svg|ttf|woff|woff2|mp4)\??.*$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name]_[hash:8].[ext]',
                },
            }],
            exclude: /node_modules/,
        }, {
            test: /\.yml$/,
            use: ['json-loader', 'yaml-frontmatter-loader'],
            exclude: /node_modules/,
        }],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.less', '.json', '.yml'],
        alias: {
            components: path.resolve(__dirname, './client/src/components'),
            containers: path.resolve(__dirname, './client/src/containers'),
            apis: path.resolve(__dirname, './client/src/apis'),
            middleware: path.resolve(__dirname, './client/src/middleware'),
            static: path.resolve(__dirname, './client/src/static'),
            plugins: path.resolve(__dirname, './client/src/plugins'),
            constants: path.resolve(__dirname, './client/src/constants'),
        },
    },
    // See: https://github.com/request/request/issues/1529#issuecomment-271740446
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};

module.exports = (env, argv) => {
    let mode = (argv && argv.mode) || 'development';
    console.log('mode =>', mode);
    let config = {};
    if (mode === 'production') {
        config = Object.assign({}, commonConfig, {
            entry: {
                app: ['./client/src/index.js'],
            },
            output: {
                filename: '[name].[chunkhash].js',
                publicPath: '//s3a.pstatp.com/toutiao/xigua_short_video_admin/dist/',
                path: path.resolve(__dirname, './dist/'),
            },
            optimization: {
                runtimeChunk: {
                    name: 'manifest',
                },
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendor',
                            chunks: 'all',
                        },
                    },
                },
            },
        });
        config.plugins = config.plugins.concat([
            new CleanWebpackPlugin(['./dist']),
            new HtmlWebpackPlugin({
                filename: '../server/views/index.ejs',
                template: './server/templates/index.html',
                inject: 'body',
                htmlContent: '<%- __html__ %>',
                hash: false,
                minify: {
                    removeComments: false,
                    collapseWhitespace: false,
                },
            }),
            extractCSS,
            extractLESS,
        ]);
        config.module.rules = config.module.rules.concat([{
            test: /\.css$/,
            use: extractCSS.extract(['css-loader?minimize'/* , 'postcss-loader' */]),
        }, {
            test: /\.less$/i,
            use: extractLESS.extract(['css-loader?minimize', /* , 'postcss-loader' */'less-loader']),
        }]);
    } else {
        config = Object.assign({}, commonConfig, {
            devtool: 'source-map',
            entry: {
                app: ['./client/src/index.js'],
            },
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, './dist/'),
                publicPath: '/static/',
            },
        });
        config.plugins = config.plugins.concat([
            new CleanWebpackPlugin(['./dist']),
            new HtmlWebpackPlugin({
                filename: '../server/views/index.ejs',
                template: './server/templates/index.html',
                inject: 'body',
                htmlContent: '<%- __html__ %>',
                hash: false,
                minify: {
                    removeComments: false,
                    collapseWhitespace: false,
                },
            }),
            new webpack.HotModuleReplacementPlugin(),
        ]);
        config.module.rules = config.module.rules.concat([{
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        }, {
            test: /\.less$/i,
            use: ['style-loader', 'css-loader', 'less-loader'],
        }]);
    }
    return config;
};
