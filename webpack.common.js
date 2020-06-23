// NodeJS
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// Webpack plugins
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ASSETS_PATH = process.env.ASSETS_PATH; // relative path to address static content.
// i.e. images or other static content such as fonts and data.
// Helper Variables
const paths = {
  entryClient: path.resolve(__dirname, "src", "client", "index.js"),
  alertClient: path.resolve(__dirname, "src", "client", "alert.js"),
  
  src: path.resolve(__dirname, "src", "client", "index.html"),
  // dest: path.resolve(__dirname, "public/assets"),
  dest: path.resolve(__dirname, 'dist/build-1/assets/'), // where Bundles are saved.
  // destHtml: path.resolve(__dirname, "public/assets", "index.html"),
  destHtml: path.resolve(__dirname, "dist/build-1/assets", "index.html"), // where final HTML is saved.
  // contentBase: path.join(__dirname, "public/assets"),
  contentBase: path.join(__dirname, "dist/build-1/"),
};

module.exports = {
  devtool: "source-map",
  
  entry: {
    app: [("@babel/polyfill", "react-hot-loader/patch", paths.entryClient)],
    alert: [("@babel/polyfill", "react-hot-loader/patch", paths.alertClient)],
  },
  output: {
    path: paths.dest,
    filename: "[name].bundle.js",
    publicPath: ASSETS_PATH,
    libraryTarget: "umd",
  },
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, "src/Utilities/"),
      Images: path.resolve(__dirname, "src/Images/"),
      Templates: path.resolve(__dirname, "src/Templates/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          // {
          //   loader: "sass-loader",
          //   options: {
          //     sourceMap: true,
          //   },
          // },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.ASSETS_PATH": JSON.stringify(ASSETS_PATH),
    }),
    // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: paths.src,
      filename: paths.destHtml,
    }),
  ],
  performance: {
    hints: "warning",
    maxAssetSize: 2000000, // Bytes..
    maxEntrypointSize: 4000000, // Bytes..
    assetFilter: function (filename) {
      // If you would like to, you can exclude file types, names, etc here by providing an expression.
      return true;
    },
  },
  devServer: {
    proxy: {
      // proxy URLs to backend development server
      "/api": "http://localhost:3000",
    },
    contentBase: paths.contentBase,
    compress: true, // enable gzip compression
    disableHostCheck: true, // this can be dangerous, do not use unless on a private LAN in a safe network
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    host: "127.0.0.1", // listen on all interfaces
    https: false, // true for self-signed, object for cert authority
    noInfo: false, // only errors & warns on hot reload
    // port: 8080,
  },
  // advance misc config
  cache: false,
  bail: true,
  profile: true,
  watch: false,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: true,
    poll: 500,
  },
};
