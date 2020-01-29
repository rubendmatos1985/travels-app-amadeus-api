const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

var config = {
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 2 }],
                '@babel/preset-typescript',
                ['@babel/preset-react', { development: true }]
              ],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-typescript',
                '@babel/plugin-transform-parameters',
                '@babel/plugin-proposal-export-default-from',
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: 2
                  }
                ]
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['src', 'node_modules']
  }
}

var client = Object.assign({}, config, {
  name: 'client',
  target: 'web',
  entry: path.resolve(__dirname, 'src/client/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
})

var server = Object.assign({}, config, {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'src/server/index.tsx'),
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  }
})

module.exports = [client, server]
