import path from "path";
export default {
  process: function process(src, filename) {
    var assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      return "module.exports = {\n        __esModule: true,\n        default: ".concat(assetFilename, ",\n        ReactComponent: ({ svgRef, ...props }) => ({\n          $$typeof: Symbol.for('react.element'),\n          type: 'svg',\n          ref: svgRef || null,\n          key: null,\n          props: Object.assign({}, props, {\n            children: ").concat(assetFilename, "\n          })\n        }),\n      };");
    }

    return "module.exports = ".concat(assetFilename, ";");
  }
};