module.exports = {
  entry: "./client/index.js",
  mode: "development",
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/bundle.js"
  },
  devtool: "source-maps",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};