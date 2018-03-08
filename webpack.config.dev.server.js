var webpack = require('webpack');
var path = require('path');

module.exports = function (env) {
  return {
    entry: {
      render: ['./server/render/src/render.js']
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './server/render/dist/'),
      publicPath: '/'
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV_CLIENT__: false,
        __DEV_SERVER__: true,
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ],
    module: {
      rules: [{
        test: /.jsx?$/,
        loader: 'babel-loader?cacheDirectory',
        exclude: /node_modules/,
        options: {
          presets: [
            ['es2015', { module: false }],
            'react', 'stage-0'
          ]
        }
      }, {
        test: require.resolve('prop-types'),
        loader: 'expose-loader?PropTypes'
      }, {
        test: /\.(png|jpe?g|gif|eot|svg|ttf|woff|woff2)\??.*$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]?[hash]'
          }
        }, {
          loader: 'image-webpack-loader',
          query: {
            gifsicle: {
              optimizationLevel: 7,
              interlaced: false
            },
            mozjepg: {
              progressive: true
            },
            pngquant: { quality: "65-90", speed: 4 }
          }
        }],
        exclude: /node_modules/,
      }]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        client: path.resolve(__dirname, './client'),
        server: path.resolve(__dirname, './server')
      }
    },
    externals: {
      'isomorphic-fetch': {
        root: 'isomorphic-fetch',
        commonjs2: 'isomorphic-fetch',
        commonjs: 'isomorphic-fetch',
        amd: 'isomorphic-fetch'
      }
    }
  };
};
