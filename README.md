# Sabogr

a [Sails](http://sailsjs.org) application template
with [AngularJS](https://angularjs.org/), [Bootstrap](http://getbootstrap.com/).

## Getting started

You need to have node and sails installed globaly. 
[Node.js](https://nodejs.org/en/) and [Sails.js](http://sailsjs.org/).

Go to your project or working directory and run the following command.

`sails new yourProjectName`

Now simply merge this project into yours.

## assets folder

This folder is your public resource which gets pushed into the .tmp folder.

### Installing bower components

Make sure you have bower installed globally.

`npm install -g bower`

Inside of the assets folder you can now install new bower packages with

`bower install package-name --save`

Your packages are saved inside of the 'assets/bower_components' directory.

### Load only the needed recources to .tmp

Next step is to install 'bower-installer'

`npm install -g bower-installer`

We use bower installer to load the needed resources to our 'assets/_js' and 'assets/_css' directory.

Call the following command in your assets folder

`bower-installer`

Now only angular.js and bootstra.css is loaded in the folders that gets loaded into the .tmp folder.

### Sails lift grunt tasks

What happens when you `sails lift` your server?

When you run `grunt` or `sails lift`the Gruntfile.js in your root directory gets executed.

Which files and in what order your files should get loaded are defined in the pipline.js in your tasks folder.

The author changed the files which should get loaded in this file and in that order that your angular app will work instantly.

```js

// The CSS files from our bower components
var cssFilesToInject = [
  '_css/**/*.css'
];

// The Js files from our bower components
var jsFilesToInject = [
  // Dependencies like Angular and Bootstrap are brought in here,
  // this loads all our js files which gets automatically
  // loaded into the _js dir when you execute bower-installer
  '_js/**/*.js',

  //load all modules for angular, to make sure your angular model exists,
  // since grunt loads the files in alapetical order
  'js/modules/**/*.js',

  // All source files for angular are inside here
  //the rest of our application
  'src/**/*.js',
  'src/*.js',

];```

