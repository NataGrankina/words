"use strict";
const webpack = require('webpack');
const fs = require('fs');
const env = require('node-env-file');

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
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID),
      'AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN)
    }),
  ],
  devtool: 'cheap-inline-module-source-map'
};