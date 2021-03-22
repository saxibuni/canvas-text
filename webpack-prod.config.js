const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/main.ts",
  },
  output: {
    path: __dirname + "/dist",
    filename: "js/[name].[hash:8].js",
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          output: {
            beautify: false,
            comments: false,
          },
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      root: path.resolve(__dirname, "./src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png|jpeg|svg|woff)$/,
        type: "javascript/auto",
        use: {
          loader: "file-loader",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist/*"],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      chunks: ["index"],
    }),
  ],
};
