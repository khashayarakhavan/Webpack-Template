
  const path = require("path");
  const webpack = require("webpack");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const { CleanWebpackPlugin } = require("clean-webpack-plugin");
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const Dotenv = require("dotenv-webpack");
  const devMode = process.env.NODE_ENV === "development";
 
  module.exports = {
    entry: {
      app: "./src/index.js",
      alert: "./src/alert.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      // the filename template for entry chunks
      publicPath: "/assets/", // string
      // the url to the output directory resolved relative to the HTML page
      library: "MyLibrary", // string,
      // the name of the exported library
      libraryTarget: "umd", // universal module definition
      // the type of the exported library
      /* Advanced output configuration (click to show) */
      /* Expert output configuration (on own risk) */
    },
    resolve: {
      alias: {
        Utilities: path.resolve(__dirname, "src/Utilities/"),
        Images: path.resolve(__dirname, "src/Images/"),
        Templates: path.resolve(__dirname, "src/Templates/"),
      },
    },
    devtool: "inline-source-map",
    devServer: {
      contentBase: "./dist",
      hot: true,
    },

    plugins: [
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify("development"),
        PRODUCTION: JSON.stringify("PRODUCTION"),
        VERSION: JSON.stringify("5fa3b9"),
        BROWSER_SUPPORTS_HTML5: true,
        TWO: "1+1",
        "typeof window": JSON.stringify("object"),
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        SERVICE_URL: JSON.stringify("https://dev.example.com"),
        NICE_FEATURE: JSON.stringify(true),
        EXPERIMENTAL_FEATURE: JSON.stringify(false),
      }),
      new Dotenv({
        path: "./.env", // load this now instead of the ones in '.env'
        safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        silent: true, // hide any errors
        defaults: false, // load '.env.defaults' as the default values if empty.
      }),
      new MiniCssExtractPlugin({
        moduleFilename: ({ name }) => `${name.replace("/js/", "/css/")}.css`,
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: devMode ? "[name].css" : "[name].[hash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: "Output Management",
      }),
    ],
    module: {
      rules: [
      //   {
      //   test: /\.jsx?$/,
      //   include: [
      //     path.resolve(__dirname, "app")
      //   ],
      //   exclude: [
      //     path.resolve(__dirname, "app/demo-files")
      //   ],
      //   // these are matching conditions, each accepting a regular expression or string
      //   // test and include have the same behavior, both must be matched
      //   // exclude must not be matched (takes preferrence over test and include)
      //   // Best practices:
      //   // - Use RegExp only in test and for filename matching
      //   // - Use arrays of absolute paths in include and exclude
      //   // - Try to avoid exclude and prefer include
      //   issuer: { test, include, exclude },
      //   // conditions for the issuer (the origin of the import)
      //   enforce: "pre",
      //   enforce: "post",
      //   // flags to apply these rules, even if they are overridden (advanced option)
      //   loader: "babel-loader",
      //   // the loader which should be applied, it'll be resolved relative to the context
      //   options: {
      //     presets: ["es2015"]
      //   },
      //   // options for the loader
      // },
      // {
      //   test: /\.html$/,
      //   use: [
      //     // apply multiple loaders and options
      //     "htmllint-loader",
      //     {
      //       loader: "html-loader",
      //       options: {
             
      //       }
      //     }
      //   ]
      // },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // only enable hot in development
                hmr: process.env.NODE_ENV === "development",
                // if hmr does not work, this is a forceful method.
                reloadAll: true,
              },
            },
            "css-loader",
            // "postcss-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"],
        },
        {
          test: /\.(csv|tsv)$/,
          use: ["csv-loader"],
        },
        {
          test: /\.xml$/,
          use: ["xml-loader"],
        },
      ],
    },
  };