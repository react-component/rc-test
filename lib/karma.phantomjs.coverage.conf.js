'use strict';

var getKarmaConfig = require('./getKarmaConfig');
var resolveCwd = require('./resolveCwd');
var getKarmaCommonConfig = require('./getKarmaCommonConfig');
var getWebpackCommonConfig = require('rc-tools/lib/getWebpackCommonConfig');

module.exports = function conf(config) {
  var commonConfig = getKarmaCommonConfig();
  var preprocessors = {};
  preprocessors[commonConfig.files[commonConfig.files.length - 1]] = 'webpack';
  var reporters = ['progress', 'coverage-istanbul'];
  var coverageIstanbulReporter = {
    // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
    reports: ['html', 'lcovonly', 'text'],
    // if using webpack and pre-loaders, work around webpack breaking the source path
    fixWebpackSourcePaths: true,

    // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
    skipFilesWithNoCoverage: true,

    // Most reporters accept additional config options.
    // You can pass these through the `report-config` option
    'report-config': {

      // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137
      html: {
        // outputs the report in ./coverage/html
        subdir: 'html',
      },
    },
    dir: resolveCwd('coverage/'),
  };
  if (process.env.TRAVIS_JOB_ID) {
    reporters = ['coverage-istanbul', 'coveralls'];
  }
  commonConfig.webpack.module.rules = getWebpackCommonConfig
  // I do not know why commonjs does not work!!!
    .getLoaders('amd')
    .concat(getWebpackCommonConfig.getCssLoaders())
    .concat({
      enforce: 'post',
      test: /\.(j|t)sx?$/,
      include: /src\//,
      loader: require.resolve('istanbul-instrumenter-loader'),
    });
  config.set(getKarmaConfig('coverage', {
    preprocessors,
    webpack: commonConfig.webpack,
    reporters,
    coverageIstanbulReporter,
    browsers: ['PhantomJS'],
    singleRun: true,
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered
      // (useful if karma exits without killing phantom)
      exitOnResourceError: true,
    },
  }));
}
;
