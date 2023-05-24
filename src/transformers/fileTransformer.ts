import path from "path";

// Jest 28 has breaking change of this.
const jestPkg = require('jest/package.json');
const aboveJest28 = parseFloat(jestPkg.version) >= 28;

export default {
  process(src: string, filename: string) {
    const assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      const code = `module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ReactComponent: ({ svgRef, ...props }) => ({
          $$typeof: Symbol.for('react.element'),
          type: 'svg',
          ref: svgRef || null,
          key: null,
          props: Object.assign({}, props, {
            children: ${assetFilename}
          })
        }),
      };`;

      return aboveJest28 ? { code } : code;
    }

    const rawCode = `module.exports = ${assetFilename};`;
    return aboveJest28 ? { code: rawCode } : rawCode;
  },
};
