const globImporter = require("node-sass-glob-importer")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require('autoprefixer')
const path = require("path")

module.exports = {
  entry: {
    frontend: [
      "./../assets/script/frontend.js",
      "./../assets/style/frontend.scss" 
    ],
    backend: [ 
      "./../assets/script/backend.js",
      "./../assets/style/backend.scss" 
    ]
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                importer: globImporter()
              }
            }
          },
        ]
      },
      {
        test: /\.js?x/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { shippedProposals: true }]
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: "file-loader",
          options: {
            esModule: false,
            name: "[path][name].[ext]"
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        use: {
          loader: "file-loader",
          options: {
            esModule: false,
            name: "[path][name].[ext]"
          }
        }
      }
    ]
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "node_modules")],
    extensions: [".scss", ".js", ".jsx", ".json"]
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname + '/../../../../public', 'assets')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ]
}


