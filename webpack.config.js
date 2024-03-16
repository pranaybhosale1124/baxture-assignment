const path = require('path');

module.exports = {
  mode: 'production',
  entry: './bin/www.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'final.js',
  },
  target: 'node',
};