module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.pug$/,
        loader: "pug-plain-loader"
      }
    ]
  }
};
