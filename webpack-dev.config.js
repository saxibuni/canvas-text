const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ErudaWebpackPlugin = require("eruda-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/main.ts",
  },
  output: {
    path: __dirname + "/dist",
    filename: "js/[name].[hash:8].js",
  },

  devtool: "cheap-module-eval-source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      root: path.resolve(__dirname, "./src"),
    },
  },

  devServer: {
    open: true,
    contentBase: path.join(__dirname, "dist"),
    host: "0.0.0.0",
    useLocalIp: true
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
      chunks: ["index"]
    }),
    new ErudaWebpackPlugin(),
  ],
};