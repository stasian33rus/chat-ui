/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { existsSync, readFileSync } = require("fs");
const { load } = require("js-yaml");
const path = require("path");
const createStyledComponentsTransformer =
  require("typescript-plugin-styled-components").default;
const styledComponentsTransformer = createStyledComponentsTransformer();
let userEnv = {};

if (existsSync("env.yaml")) {
  userEnv = load(readFileSync("env.yaml", "utf8"));
}

module.exports = {
  mode: userEnv.MODE || "development",
  entry: "./index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: {
          loader: "ts-loader",
          options: {
            getCustomTransformers: () => ({
              before: [styledComponentsTransformer],
            }),
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        // type: "asset/fonts",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9200,
  },
};
