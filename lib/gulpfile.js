'use strict';

const gulp = require('gulp');
const path = require('path');
const resolveCwd = require('./resolveCwd');
const shelljs = require('shelljs');
const fs = require('fs-extra');
const argv = require('minimist')(process.argv.slice(2));

function runCmd(cmd, args, fn) {
  args = args || [];
  const runner = require('child_process').spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
  });
  runner.on('close', (code) => {
    if (fn) {
      fn(code);
    }
  });
}

gulp.task('test', (done) => {
  const karmaBin = require.resolve('karma/bin/karma');
  const karmaConfig = path.join(__dirname, './karma.phantomjs.conf.js');
  const args = [karmaBin, 'start', karmaConfig];
  runCmd('node', args, done);
});

gulp.task('chrome-test', (done) => {
  const karmaBin = require.resolve('karma/bin/karma');
  const karmaConfig = path.join(__dirname, './karma.chrome.conf.js');
  const args = [karmaBin, 'start', karmaConfig];
  runCmd('node', args, done);
});

gulp.task('coverage', (done) => {
  if (fs.existsSync(resolveCwd('coverage'))) {
    shelljs.rm('-rf', resolveCwd('coverage'));
  }
  const karmaBin = require.resolve('karma/bin/karma');
  const karmaConfig = path.join(__dirname, './karma.phantomjs.coverage.conf.js');
  const args = [karmaBin, 'start', karmaConfig];
  runCmd('node', args, done);
});

gulp.task('saucelabs', (done) => {
  const karmaBin = require.resolve('karma/bin/karma');
  const karmaConfig = path.join(__dirname, './karma.saucelabs.conf.js');
  const args = [karmaBin, 'start', karmaConfig];
  runCmd('node', args, done);
});

gulp.task('karma', (done) => {
  const karmaBin = require.resolve('karma/bin/karma');
  const karmaConfig = path.join(__dirname, './karma.conf.js');
  const args = [karmaBin, 'start', karmaConfig];
  if (argv['single-run']) {
    args.push('--single-run');
  }
  runCmd('node', args, done);
});
