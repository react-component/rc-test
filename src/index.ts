import { runCLI } from 'jest';
import path from 'path';
import fs from 'fs-extra';

const ALIAS = {
  t: 'testNamePattern',
  w: 'maxWorkers',
  u: 'updateSnapshot',
};

export function getConfig() {
  const config = {
    rootDir: process.cwd(),
    testEnvironment: 'jsdom',
    setupFiles: [require.resolve('./setup.js')],
    setupFilesAfterEnv: [require.resolve('./setupAfterEnv.js')],
    transform: {
      '\\.(t|j)sx?$': require.resolve('./transformers/jsTransformer'),
      '\\.svg$': require.resolve('./transformers/fileTransformer'),
    },
    // transformIgnorePatterns: [
    //   // 加 [^/]*? 是为了兼容 tnpm 的目录结构
    //   // 比如：_umi-test@1.5.5@umi-test
    //   `node_modules/(?!([^/]*?umi|[^/]*?umi-test|[^/]*?enzyme-adapter-react-16|${transformInclude.join(
    //     '|',
    //   )})/)`,
    // ],
    testMatch: ['**/?*.(spec|test|e2e).(j|t)s?(x)'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    // moduleNameMapper: {
    //   '\\.(css|less|sass|scss)$': require.resolve('identity-obj-proxy'),
    //   '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    //     require.resolve('./fileMock.js'),
    //   ...(moduleNameMapper || {}),
    //   ...(userModuleNameMapper || {}),
    // },
    testPathIgnorePatterns: ['/node_modules/'],
    // 用于设置 jest worker 启动的个数
  };

  return config;
}

export default function (originOpts: any = {}) {
  const opts = { ...originOpts };
  const cwd = process.cwd();

  let config = getConfig();

  // Merge `jest.config.js`
  const userJestConfigFile = path.resolve(cwd, 'jest.config.js');
  if (fs.existsSync(userJestConfigFile)) {
    const { setupFiles = [], setupFilesAfterEnv = [], ...restConfig } = require(userJestConfigFile);
    config = {
      ...config,
      ...restConfig,
      setupFiles: [...config.setupFiles, ...setupFiles],
      setupFilesAfterEnv: [...config.setupFilesAfterEnv, ...setupFilesAfterEnv],
    };
  }

  // Fill jest alias
  Object.keys(ALIAS).forEach((key) => {
    if (opts[key]) {
      opts[ALIAS[key]] = opts[key];
      delete opts[key];
    }
  });

  return new Promise((resolve, reject) => {
    const originEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';

    runCLI(
      {
        config: JSON.stringify(config),
        ...opts,
      },
      [cwd],
    )
      .then((result) => {
        const results = result.results;

        if (results.success) {
          resolve(results);
        } else {
          reject(new Error('Jest failed'));
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        process.env.NODE_ENV = originEnv;
      });
  });
}
