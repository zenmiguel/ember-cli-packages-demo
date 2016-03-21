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
  it('contains package1.js', function () {
    this.verifyFileContent('.approvals-dist/assets/package1.js');
  });
  it('contains package1.css', function () {
    this.verifyFileContent('.approvals-dist/assets/package1.css');
  });
  it('contains package2.js', function () {
    this.verifyFileContent('.approvals-dist/assets/package2.js');
  });
  it('contains package1.js', function () {
    this.verifyFileContent('.approvals-dist/assets/package1.js');
  });
  it('contains package2.css', function () {
    this.verifyFileContent('.approvals-dist/assets/package2.css');
  });
  it('contains ember-cli-packages-demo.js', function () {
    this.verifyFileContent('.approvals-dist/assets/ember-cli-packages-demo.js');
  });
  it('contains ember-cli-packages-demo.css', function () {
    this.verifyFileContent('.approvals-dist/assets/ember-cli-packages-demo.css');
  });
});
