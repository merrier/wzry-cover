var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: '[name].[chunkhash]-css.css',
  allChunks: true
});
const extractLESS = new ExtractTextPlugin({
  filename: '[name].[chunkhash]-less.css',
  allChunks: true
});

module.exports = function (env) {
  return [{
    entry: {
      app: ['./client/src/index.js'],
      vendor1: ['react', 'react-dom', 'react-redux', 'react-router', 'redux-thunk'],
      vendor2: ['moment', 'classnames', 'prop-types'],
      vendor3: ['babel-polyfill']
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, './client/dist/'),
      publicPath: '/static/'
    },
    plugins: [
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
      }),
      new webpack.DefinePlugin({
        __DEV_CLIENT__: false,
        __DEV_SERVER__: false,
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      extractCSS,
      extractLESS,
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor1', 'vendor2', 'vendor3'],
        minChunks: 3
          // minChunks: function(module) {
          //   return module.context && module.context.indexOf('node_modules') !== -1;
          // }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: { 
          warnings: false, 
          drop_console: true, 
          collapse_vars: true,
          reduce_vars: true
        }
      }),
      new HtmlWebpackPlugin({
        title: '全网视频资源覆盖可视化',
        template: path.join(__dirname, './server/templates/index.html'),
        filename: '../../server/views/index.ejs',
        inject: 'body',
        htmlContent: '<%- __html__ %>',
        hash: false,
        minify: {
          removeComments: false,
          collapseWhitespace: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: function () {
            return [
              require("autoprefixer")({
                browsers: [ 'iOS >= 7', 'Android >= 4' ]
              })
            ];
          }
        }
      })
    ],
    module: {
      rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['es2015', { module: false }],
            'react', 'stage-0'
          ],
          plugins: ['add-module-exports', 'transform-runtime', ["import", { libraryName: "antd", style: "css" }]]
        }
      },  {
        test: require.resolve('prop-types'),
        loader: 'expose-loader?PropTypes'
      }, {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader?minimize', 'postcss-loader'])
      }, {
        test: /\.less$/i,
        use: extractLESS.extract(['css-loader?minimize', 'less-loader'])
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
      }],
      noParse: /node_modules\/(moment\.js)/
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss', '.less', '.json'],
      alias: {
        client: path.resolve(__dirname, './client'),
        server: path.resolve(__dirname, './server'),
        components: path.resolve(__dirname, './client/src/components'),
        containers: path.resolve(__dirname, './client/src/containers'),
        actions: path.resolve(__dirname, './client/src/actions'),
        constants: path.resolve(__dirname, './client/src/constants'),
        middleware: path.resolve(__dirname, './client/src/middleware'),
        reducers: path.resolve(__dirname, './client/src/reducers'),
        routes: path.resolve(__dirname, './client/src/routes'),
        static: path.resolve(__dirname, './client/src/static'),
        plugins: path.resolve(__dirname, './client/src/plugins'),
      }
    }
  }];
};
