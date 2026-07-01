<div align="center">
  <h1>rc-test</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Part of the Ant Design ecosystem.</sub></p>
  <p>🧪 Shared Jest workflow and test runner for rc-component packages.</p>

  <p>
    <a href="https://npmjs.org/package/rc-test"><img alt="NPM version" src="https://img.shields.io/npm/v/rc-test.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/rc-test"><img alt="npm downloads" src="https://img.shields.io/npm/dm/rc-test.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/rc-test"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/rc-test?style=flat-square"></a>
    <a href="https://github.com/react-component/rc-test/actions/workflows/test.yml"><img alt="build status" src="https://github.com/react-component/rc-test/actions/workflows/test.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/rc-test"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/rc-test/main.svg?style=flat-square"></a>
  </p>
</div>

<p align="center">English | [简体中文](./README.zh-CN.md)</p>

## Highlights

| Area    | Support                                                         |
| ------- | --------------------------------------------------------------- |
| Purpose | Shared Jest workflow and test runner for rc-component packages. |
| Package | `rc-test`                                                       |
| Release | `@rc-component/np` / `rc-np`                                    |

## Install

```bash
npm install rc-test --save-dev
```

## Usage

```bash
npx rc-test --coverage
```

## API

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `rc-test`            | Run Jest with rc-component defaults. |
| `rc-test --coverage` | Run tests and collect coverage.      |

## Development

```bash
npm install
npm run compile
npm run test:only
```

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command when the package uses the shared release flow.

## License

rc-test is released under the [MIT](./LICENSE) license.
