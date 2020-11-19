/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const isDev = process.env.NODE_ENV === "development"

const plugins = [
  new HtmlWebpackPlugin({ template: "./src/index.html" }),
  new CssMinimizerPlugin(),
].concat(isDev ? [] : [new MiniCssExtractPlugin()])

module.exports = {
  mode: isDev ? "development" : "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css"],
    fallback: {
      path: require.resolve("path-browserify"),
      fs: require.resolve("./fallback/fs"),
    },
  },
  plugins,
}
