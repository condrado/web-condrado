const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var baseScript = {
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          knownHelpersOnly: false,
          inlineRequires: /\/assets\/images\/(:?images|audio|video)\//gi,
          helperDirs: [path.join(__dirname, 'src/views/modules/helpers/')],
          partialDirs: [
            path.join(process.cwd(), 'src', 'views', 'pages', 'layouts'),
            path.join(process.cwd(), 'src', 'views', 'pages', 'modules'),
            path.join(process.cwd(), 'src', 'views', 'pages', 'css'),
            path.join(process.cwd(), 'src', 'views', 'pages'),
            path.join(__dirname, 'src/views/partial/'),
          ],
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browsers: ['last 2 versions'],
              },
              sourceMap: true,
              ident: 'postcss',
              publicPath: '/assets/css/',
              plugins: () => [autoprefixer, cssnano],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: '../images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './assets/css/app.css',
      chunkFilename: './assets/css/[id].css',
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), 'src', 'assets', 'javascript', 'libs'),
        to: path.join(process.cwd(), 'build', 'assets', 'javascript', 'libs'),
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), 'src', 'assets', 'images'),
        to: path.join(process.cwd(), 'build', 'assets', 'images'),
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), 'src', 'assets', 'fonts'),
        to: path.join(process.cwd(), 'build', 'assets', 'fonts'),
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), 'src', 'assets', 'data'),
        to: path.join(process.cwd(), 'build', 'assets', 'data'),
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), 'src', 'assets', 'javascript', 'utils'),
        to: path.join(process.cwd(), 'build', 'assets', 'javascript', 'utils'),
      },
    ]),
    new webpack.DefinePlugin({
      COOKIES_PORT: JSON.stringify(''),
    }),
    new HandlebarsPlugin({
      // path to hbs entry file(s)
      entry: path.join(process.cwd(), 'src', 'views', 'pages', '*.hbs'),
      // output path and filename(s). This should lie within the webpacks output-folder
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(process.cwd(), 'build', '[name].html'),
      // data passed to main hbs template: `main-template(data)`
      data: path.join(__dirname, './src/assets/data/data.json'),
      //data: require('./src/assets/data/*.json'),
      //data: mergeJSON(path.join(process.cwd(), 'src', 'data', '**', '*.json')),
      // globbed path to partials, where folder/filename is unique
      partials: [
        path.join(process.cwd(), 'src', 'views', 'pages', 'layouts', '*.hbs'),
        path.join(process.cwd(), 'src', 'views', 'pages', 'modules', '*.hbs'),
        path.join(process.cwd(), 'src', 'views', 'pages', 'css', '*.hbs'),
        path.join(process.cwd(), 'src', 'views', 'pages', '*.hbs'),
      ],
      helpers: {
        nameOfHbsHelper: Function.prototype,
        projectHelpers: path.join(
          process.cwd(),
          'src',
          'views',
          'helpers',
          '*.js',
        ),
      },
    }),
  ],
};

var baseConfig = Object.assign({}, baseScript, {
  entry: [
    './src/assets/javascript/initScript.js',
    './src/assets/stylesheet/app.scss',
  ],
  output: {
    filename: 'assets/javascript/app.js',
    path: path.resolve(__dirname, 'build/'),
    //TODO: dynamic imports
    //publicPath: '/build',

  },
  devServer: {
    port: 4000,
    open: true
  },
});

// Return Array of Configurations
module.exports = [baseConfig];
