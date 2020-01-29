const { typescriptCypressTranspiler } = require('typescript-cypress')
const _module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              '@babel/preset-typescript',
              ['@babel/preset-react', { development: true }]
            ],
            plugins: [
              '@babel/plugin-transform-destructuring',
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
}

module.exports = (on, config) =>
  on('file:preprocessor', typescriptCypressTranspiler(_module))
