/*jshint node:true*/

var config = {
  reporters:  [
    "BeyondCompare",
    "opendiff",
    "p4merge",
    "tortoisemerge",
    "nodediff",
    "gitdiff"

/* OR a custom reporter object. Below describes the reporter object interface:

  // If you want to provide a custom reporter
  // you can't do this with the config yml file
  // but can be passed anywhere a config object is accepted
  // and must have the following interface
  {

    // this is used in exception reporting etc. Just give it a name :)
    name: string;

    // This is used to determine if the reporter can report on the specified file
    // EX: an image differ vs a txt differ...
    canReportOn(receivedFilePath: string): boolean;

    // Actually execute the diff against the two files
    report(approvedFilePath: string, receivedFilePath: string): void;
  }
*/
  ]
};

module.exports = config;
