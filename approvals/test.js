/*jshint node:true*/
/* global before, describe, it */
var approvals = require('approvals');
var config = require('./config');
var fs = require('fs');
var childProcess = require('child_process');

approvals.configure(config);
approvals.mocha();

before(function () {
  this.verifyFileContent = function (fileName) {
    this.verify(fs.readFileSync(fileName));
  };
});
describe('Dist contents for a dev builds', function () {
  before(function() {
    this.timeout(10000);
    childProcess.execSync('ember build --environment development --output-path .approvals-dist/');
  });
  it('should contain an index file', function () {
    this.verifyFileContent('.approvals-dist/index.html');
  });

  var assetsToVerify = ['package1.js',
    'package1.css',
    'package2.js',
    'package1.js',
    'package2.css',
    'ember-cli-packages-demo.js',
    'ember-cli-packages-demo.css'];
  assetsToVerify.forEach(function (file) {
    it(`contains ${file}`, function () {
      this.verifyFileContent(`.approvals-dist/assets/${file}`);
    });
  });
});
