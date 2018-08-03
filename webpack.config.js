const path = require('path');
const webpack = require('webpack');
const NotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
	return {
    mode: 'production',
    entry: {
      "background": "./src/js/background.js",
      "options": "./src/js/options.js",
      "content": "./src/js/content.js"
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build/js')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: '/node_modules/'
        },
        {
          test: /.(png|jpg|gif|woff(2)?|eot|ttf|svg)$/,
          loader: 'file-loader',
          query: {
            emitFile: false,
            name: "[name].[ext]",
            useRelativePath: true
          }
        },
        {
          test: /.less$/,
					use: [
						{ loader: MiniCssExtractPlugin.loader },
            'cee-loader',
						'less-loader'
					]
        },
      ],
    },
    plugins: [
      new NotifierPlugin({
        alwaysNotify: true,
        skipFirstNotification: true
      }),
      new MiniCssExtractPlugin({
        filename: "dist/css/style.min.css"
      }),
    ],
    performance: { hints: false }  }
}
