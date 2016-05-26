/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 *
 * For more information see:
 *   https://github.com/balderdashy/sails-docs/blob/master/anatomy/myApp/tasks/pipeline.js.md
 */


// The CSS files from our bower components
var cssFilesToInject = [
  '_css/bootstrap/*.css',
  '_css/**/*.css',
  'style/**/*.css'
];

// The Js files from our bower components
//And our Angular application
var jsFilesToInject = [

  // Dependencies like Angular and Bootstrap are brought in here
  '_js/angular/*.js',
  '_js/jquery/*.js',
  '_js/bootstrap/*.js',
  '_js/**/*.js',

  //load our application init file and all modules for angular
  'src/app/*.js',
  'src/modules/**/*.js',

  // All source files for angular are inside here
  'src/**/*.js',
  'src/*.js',

];

var templateFilesToInject = [
  'src/**/*.html',
  'src/*.html'
];







// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(cssPath) {
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(jsPath) {
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(tplPath) {
  return require('path').join('assets/',tplPath);
});


