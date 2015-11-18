module.exports = {
  entry: __dirname + '/dist/knuckles.js',
  devtool: 'source-map',
  cache: true,
  debug: true,
  output: {
    path: __dirname + '/dist',
    filename: 'knuckles.browser.js',
    library: 'Knuckles',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?presets[]=es2015&plugins[]=transform-runtime'
      }
    ]
  }
};