<div align="center">
  <h1>rc-test</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Ant Design 生态的一部分。</sub></p>
  <p>🧪 rc-component 包共享的 Jest 测试运行器与 GitHub Actions 工作流。</p>

  <p>
    <a href="https://npmjs.org/package/rc-test"><img alt="NPM version" src="https://img.shields.io/npm/v/rc-test.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/rc-test"><img alt="npm downloads" src="https://img.shields.io/npm/dm/rc-test.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/rc-test"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/rc-test?style=flat-square"></a>
    <a href="https://github.com/react-component/rc-test/actions/workflows/test.yml"><img alt="build status" src="https://github.com/react-component/rc-test/actions/workflows/test.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/rc-test"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/rc-test/main.svg?style=flat-square"></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>

## 亮点

| 方向 | 支持                                                            |
| ---- | --------------------------------------------------------------- |
| 定位 | rc-component 包共享的 Jest 测试运行器与 GitHub Actions 工作流。 |
| 包名 | `rc-test`                                                       |
| 发布 | `@rc-component/np` / `rc-np`                                    |

## 安装

```bash
npm install rc-test --save-dev
```

## 用法

```bash
npx rc-test --coverage
```

## API

| 名称                 | 说明                                  |
| -------------------- | ------------------------------------- |
| `rc-test`            | 使用 rc-component 默认配置运行 Jest。 |
| `rc-test --coverage` | 运行测试并收集覆盖率。                |

## 本地开发

```bash
ut install
npm run compile
npm run test:only
```

## 发布

```bash
npm run prepublishOnly
```

发布流程通过 `@rc-component/np` 提供的 `rc-np` 命令处理。

## 许可证

rc-test 基于 [MIT](./LICENSE) 协议发布。
