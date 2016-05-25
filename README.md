# Sabogr
####Sails Angular Bower Grunt
#####Ready to use Sails Angular App with authentication

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
The .tmp folder is visible for your clients.

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

Every time you install new components run this command again.

## Bower Installer does not load every file to my folder

If that is the case you can specify your file that is not loading into the right folder manually.

open the bower.json file in your assets folder.

Bootstrap.css does not load automatically in that folder so I configured it manually.
If some packages you installed does not load automatically simply add your name and
the path to your file under the bootstrap line (see example).
```json
"sources" : {
      "bootstrap" : "bower_components/bootstrap/dist/css/bootstrap.css",
      "example": "bower_components/example/css/example.css"
    }
```

Run `bower-installer` again.

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
```

