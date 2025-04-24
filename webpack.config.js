const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,   // handles .js and .jsx files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'], // allow importing .jsx files without specifying the extension
    },
    devServer: {
      static: './dist',
      hot: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html')
      })
    ]
  };
  