// Karma configuration
// Generated on Sat Dec 31 2022 20:27:09 GMT+0200 (Eastern European Standard Time)

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-coverage"),
      require("karma-jsdom-launcher"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    preprocessors: {
      'src/**/*.html': ['coverage'],
    },
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      includeAllSources: true,
      dir: 'coverage',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
      ],
      // instrumenterOptions: {
      //   istanbul: { noCompact: true }
      // }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: true,
    progress: true,
  });
};
