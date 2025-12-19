import fs from 'fs-extra';
import { runCLI } from 'jest';
import path from 'path';

const ALIAS = {
  t: 'testNamePattern',
  w: 'maxWorkers',
  u: 'updateSnapshot',
};

export function getConfig() {
  const cwd = process.cwd();
  const pkg = require(path.resolve(cwd, 'package.json'));

  const setupFiles = [require.resolve('./setup.js')];

  if (pkg.devDependencies['enzyme']) {
    if (
      !pkg.dependencies['enzyme-adapter-react-16'] &&
      !pkg.devDependencies['enzyme-adapter-react-16']
    ) {
      console.log(
        '[rc-test] Legacy "enzyme-adapter-react-16" is not in the deps. Please install in dev deps!',
      );
    }
    setupFiles.push(require.resolve('./setupEnzyme.js'));
  }

  const config = {
    rootDir: cwd,
    testEnvironment: 'jsdom',
    setupFiles,
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

  // Merge Jest config file (support .js, .ts, .json)
  let userJestConfigFile = null;
  const possibleConfigFiles = [
    'jest.config.js',
    'jest.config.ts',
    'jest.config.json',
    '.jest.config.js',
    '.jest.config.ts',
    '.jest.config.json',
  ];

  for (let i = 0; i < possibleConfigFiles.length; i++) {
    const configPath = path.resolve(cwd, possibleConfigFiles[i]);
    if (fs.existsSync(configPath)) {
      userJestConfigFile = configPath;
      break;
    }
  }

  if (userJestConfigFile) {
    let userConfig = require(userJestConfigFile);
    userConfig = userConfig.default || userConfig;

    const { setupFiles = [], setupFilesAfterEnv = [], ...restConfig } = userConfig;
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
