import path from 'path';
import webpack from 'webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

export default {
  entry: {
    "background": "./src/js/background.js",
    "options": "./src/js/options.js",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js')
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: "css-loader!less-loader"
        }),
      },
    ],
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.js$/,
      minimize: true
    }),
    new ExtractTextPlugin('style.css'),
    new ExtractTextPlugin('style.min.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g,
      cssProcessorOptions: { discardComments: { removeAll: true } }
    })
  ]
};
