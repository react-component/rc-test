#!/usr/bin/env node

const path = require("path");
const semver = require("semver");
const fs = require("fs-extra");

const VER_FATHER = "father";
const RM_DEPS = ["jest", "father-build", "react-test-renderer"];

const pkg = require(path.resolve(process.cwd(), "package.json"));

// ==================================================================
// Upgrade father version if exist
const fatherVer = pkg.devDependencies[VER_FATHER];
if (fatherVer) {
  const fatherMajor = semver.major(semver.minVersion(fatherVer));

  if (fatherMajor < 4) {
    console.log("Upgrading father version to ^4.0.0 ...");
    pkg.devDependencies[VER_FATHER] = "^4.0.0";

    console.log("Override .fatherrc...");
    fs.writeFileSync(
      path.resolve(process.cwd(), ".fatherrc.js"),
      `
import { defineConfig } from 'father';

export default defineConfig({
  platform: 'browser',
  cjs: { output: 'lib' },
  esm: {
    output: 'es',
    alias: { 'rc-util/lib': 'rc-util/es' },
  },
});
`.trim(),
      "utf-8"
    );

    // Clean up father v2 hooks
    fs.removeSync(path.resolve(process.cwd(), ".git/hooks/pre-commit"));
  }
}

// ==================================================================
// Update script
pkg.scripts.test = "rc-test";

// Remove origin test content
RM_DEPS.forEach((dep) => {
  delete pkg.devDependencies[dep];
});

fs.writeFileSync(
  path.resolve(process.cwd(), "package.json"),
  JSON.stringify(pkg, null, 2),
  "utf-8"
);

// ==================================================================
// Print Tips
console.log("更新完成，请检查以下内容：");
console.log(" - 更新 .github/workflows 中 CI node 版本至 16");
console.log(
  " - 移除 jest.config.js 中关于 @testing-library/jsdom 的 setupFilesAfterEnv 配置"
);
console.log(
  " - 重新安装依赖 node_modules"
);
