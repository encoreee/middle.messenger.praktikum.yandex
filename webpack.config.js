/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '.pscc'],
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Messenger',
      template: 'index.ejs',
      inject: false,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css|pcss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          'postcss-loader',
        ],
      },

      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },

      {
        test: /\.hbs/,
        use: [
          {
            loader: 'handlebars-loader',
          },
        ],
      },

      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
};
