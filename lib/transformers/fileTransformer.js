"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _default = {
  process: function process(src, filename) {
    var assetFilename = JSON.stringify(_path.default.basename(filename));

    if (filename.match(/\.svg$/)) {
      return "module.exports = {\n        __esModule: true,\n        default: ".concat(assetFilename, ",\n        ReactComponent: ({ svgRef, ...props }) => ({\n          $$typeof: Symbol.for('react.element'),\n          type: 'svg',\n          ref: svgRef || null,\n          key: null,\n          props: Object.assign({}, props, {\n            children: ").concat(assetFilename, "\n          })\n        }),\n      };");
    }

    return "module.exports = ".concat(assetFilename, ";");
  }
};
exports.default = _default;