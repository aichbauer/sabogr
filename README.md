# Sabogr
####Sails Angular Bower Grunt
#####Ready to use Sails Angular App with authentication

a [Sails](http://sailsjs.org) application template
with [AngularJS](https://angularjs.org/), [Bootstrap](http://getbootstrap.com/).

## Getting started

You need to have node, sails installed globaly.
[Node.js](https://nodejs.org/en/) and [Sails.js](http://sailsjs.org/).

Go to your project or working directory and run the following command.

`sails new yourProjectName`

Now simply fork this repo and merge it.

## Let bower-installer and grunt do the magic

Have bower, bower-installer installed globally.
[bower](http://bower.io/) and [bower-installer](https://github.com/blittle/bower-installer).

`npm install -g bower` and `npm install -g bower-installer`

#####  assets folder

This folder is your public resource which gets pushed by the Gruntfile.js in you root folder into the .tmp folder.
The .tmp folder is visible for your clients.

Run `bower install` and `sails lift` and your Sails.js, AngularJS app is ready.

### Installing bower components

Inside of the assets folder you can now install new bower packages with

`bower install package-name --save`

Your packages are saved inside of the 'assets/bower_components' directory.

### Load only the needed recources to .tmp

We use bower-installer to load the needed resources to our 'assets/_js', 'assets/_css' directory.

Call the following command in your assets folder

`bower-installer`

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

Which files and in what order your files should get loaded are defined in the pipeline.js in your tasks folder.

The author changed the files which should get loaded in this file and in that order that your angular app will work instantly. Also our own styles, which live in our assets/style folder are loaded to the .tmp folder.

```js
// The CSS files from our bower components
var cssFilesToInject = [
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
```

