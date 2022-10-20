"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _babelJest = _interopRequireDefault(require("babel-jest"));

var _path = require("path");

var _umiUtils = require("umi-utils");

var cwd = process.cwd();
module.exports = _babelJest.default.createTransformer({
  presets: [require.resolve('@babel/preset-typescript'), [require.resolve('babel-preset-umi'), {
    transformRuntime: false
  }]],
  plugins: [[require.resolve('babel-plugin-module-resolver'), {
    alias: {
      // Projects don't need to install react, react-dom and enzyme
      react: (0, _umiUtils.compatDirname)('react/package', cwd, (0, _path.dirname)(require.resolve('react/package.json'))),
      'react-dom': (0, _umiUtils.compatDirname)('react-dom/package', cwd, (0, _path.dirname)(require.resolve('react-dom/package.json'))) // enzyme: compatDirname(
      //   'enzyme/package.json',
      //   cwd,
      //   dirname(require.resolve('enzyme/package.json')),
      // ),
      // 'enzyme-adapter-react-16': compatDirname(
      //   'enzyme-adapter-react-16/package.json',
      //   cwd,
      //   dirname(require.resolve('enzyme-adapter-react-16/package.json')),
      // ),

    }
  }, 'umi-test']]
});