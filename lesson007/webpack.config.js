const path = require("path");
const webpack = require("webpack");

const envVariables = new webpack.DefinePlugin({
  ENV: JSON.stringify(process.env.ENV)
});

module.exports = {
  mode: process.env.ENV,
  entry: ["babel-polyfill", "./src/main.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/js")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.sol/,
        use: [
          {
            loader: "json-loader"
          },
          {
            loader: "turffle-solidity-loader",
            options: {
              network: process.env.ENV,
              migrations_directory: path.resolve(__dirname, "./migrations"),
              contracts_build_directory: path.resolve(__dirname, "../build/contracts")
            }
          }
        ]
      }
    ]
  },
  plugins: [
    envVariables,
  ],
}