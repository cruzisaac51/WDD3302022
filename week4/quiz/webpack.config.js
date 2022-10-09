const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
    mode: 'development',
    context: __dirname + '/src',
    entry: './main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.min.js'
},

module: {
    rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
        loader: 'babel-loader',
        options: {
            presets: ["@babel/preset-env" ]
        }
        }
    }
    ]
},
plugins: [
    new WebpackShellPluginNext({
        onBuildStart:{
          scripts: ['echo "===> Starting packing with WEBPACK 5"'],
          blocking: true,
          parallel: false
        },
        onBuildEnd:{
          blocking: false,
          parallel: true
        }
      })
    ]
};