const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const PROD = true;

module.exports = {
  entry: {
    "bundle": "./bms-map-js-sdk.js",
    "bundle.min": "./bms-map-js-sdk.js",
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: PROD ? 'bms-map-js-sdk.min.js' : 'bms-map-js-sdk.js'
  },
  optimization: {
    minimize: PROD,
    minimizer: [
      new TerserPlugin({ parallel: true })
    ]
  }
};
