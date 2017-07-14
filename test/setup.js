import fs from 'fs';
import path from 'path';
import register from 'babel-core/register';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

// Ignore all node_modules except these
const modulesToCompile = [
  'react-native',
  'react-native-router-flux',
  'react-native-vector-icons',
  'react-native-mock',
].map(moduleName => new RegExp(`/node_modules/${moduleName}`));

const rcPath = path.join(__dirname, '..', '.babelrc');
const source = fs.readFileSync(rcPath).toString();
const config = JSON.parse(source);
config.ignore = (filename) => {
  if (!(/\/node_modules\//).test(filename)) {
    return false;
  }

  const matches = modulesToCompile.filter(regex => regex.test(filename));
  const shouldIgnore = matches.length === 0;
  return shouldIgnore;
};

register(config);
// Setup globals / chai
global.__DEV__ = true;
global.expect = chai.expect;
chai.use(chaiEnzyme());
// Setup mocks
require('react-native-mock/mock');

const React = require('react-native');

React.NavigationExperimental = {
  AnimatedView: React.View
};
