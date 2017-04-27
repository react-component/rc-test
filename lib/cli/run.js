#!/usr/bin/env node

require('colorful').colorful();

var program = require('commander');

program.on('--help', () => {
  console.log('  Usage:'.to.bold.blue.color);
  console.log();
  console.log('    $', 'rc-test run chrome-test'.to.magenta.color, 'run chrome tests');
  console.log();
});

program.parse(process.argv);

var task = program.args[0];

if (!task) {
  program.help();
} else {
  console.log('rc-tools run', task);
  var gulp = require('gulp');
  require('../gulpfile');
  gulp.start(task);
}
