const merge = require("webpack-merge");
const common = require("./webpack.common.js");
// const TerserPlugin = require("terser-webpack-plugin");

var config = {
  mode: "production",
  // devtool: "nosource-source-map",
  // optimization: {
  //   minimizer: [
  //     new TerserPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true, // Must be set to true if using source-maps in production
  //       terserOptions: {
  //         // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
  //       },
  //     }),
  //   ],
  // },
};

module.exports = merge(common, config);