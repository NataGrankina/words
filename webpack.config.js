"use strict";


module.exports = {
  entry:  ['babel-polyfill','./src/index'],
  output: { 
    filename: 'bundle.js' 
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
  devtool: 'cheap-inline-module-source-map'
};