import { runCLI } from 'jest';

const ALIAS = {
  t: 'testNamePattern',
  w: 'maxWorkers',
  u: 'updateSnapshot',
};

export default function (originOpts: any = {}) {
  const opts = { ...originOpts };
  const cwd = process.cwd();

  // Fill jest alias
  Object.keys(ALIAS).forEach((key) => {
    if (opts[key]) {
      opts[ALIAS[key]] = opts[key];
      delete opts[key];
    }
  });

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

  return runCLI(
    {
      config: JSON.stringify(config),
      ...opts,
    },
    [cwd],
  );
}
