const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  // Add a rule to ignore the source map warning from @mediapipe/tasks-vision
  addWebpackModuleRule({
    test: /vision_bundle\.mjs$/,
    resolve: {
      fullySpecified: false,
    },
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: [/node_modules\/@mediapipe\/tasks-vision/],
  })
);