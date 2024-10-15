import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as util from 'util';

// ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// ref: https://github.com/jsdom/jsdom/issues/2524
Object.defineProperty(global, 'TextEncoder', {
  writable: true,
  value: util.TextEncoder,
});

Object.defineProperty(global, 'TextDecoder', {
  writable: true,
  value: util.TextDecoder,
});

/* eslint-disable import/first */
global.requestAnimationFrame =
  global.requestAnimationFrame ||
  function requestAnimationFrame(callback) {
    setTimeout(callback, 0);
  };
