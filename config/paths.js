const path = require('path');

module.exports = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../dist'),
  public: path.resolve(__dirname, '../public'),
  ASSETS: path.resolve(__dirname, '../src/assets'),
  CONSTS: path.resolve(__dirname, '../src/consts'),
  COMPONENTS: path.resolve(__dirname, '../src/components'),
  CONTAINERS: path.resolve(__dirname, '../src/containers'),
  REDUX: path.resolve(__dirname, '../src/redux'),
  SAGA: path.resolve(__dirname, '../src/saga'),
  UTILS: path.resolve(__dirname, '../src/utils'),
  API: path.resolve(__dirname, '../src/api'),
};
