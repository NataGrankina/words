"use strict";
const webpack = require('webpack');
const fs = require('fs');
const env = require('node-env-file');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');

if (fs.existsSync(__dirname + '/.env' )) {
  env(__dirname + '/.env')
}

module.exports = {
  entry:  ['babel-polyfill','./src/index'],
  output: { 
    filename: 'bundle.js' 
  },
  externals: {
    'auth0-lock': 'Auth0Lock'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }, {
        test: /\.css$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ])
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID),
      'AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN)
    })
  ],
  devtool: 'cheap-inline-module-source-map'
};