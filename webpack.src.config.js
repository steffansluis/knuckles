module.exports = {
  entry: __dirname + '/dist/knuckles.js',
  cache: true,
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
        exclude: /(node_modules(?!\/sonic)|bower_components)/,
        loader: 'babel?presets[]=es2015&plugins[]=transform-runtime'
      }
    ]
  }
};
