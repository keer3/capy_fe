'use strict'
const pkg = require('../package')

module.exports = {
  port: 4000,
  title: 'capy_fe',
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  publicPath: './',
  // disable babelrc by default
  babel: {
    babelrc: false,
    presets: ['es2015', 'stage-2'],
    'plugins': ['transform-runtime', ['transform-runtime', [{
      'libraryName': 'element-ui',
      'styleLibraryName': 'theme-default'
    }]]]
  },
  postcss: [
    // add prefix via postcss since it's faster
    require('autoprefixer')({
      // Vue does not support ie 8 and below
      browsers: ['last 2 versions', 'ie > 8']
    }),
    require('postcss-nested')
  ],
  electron: true
}
