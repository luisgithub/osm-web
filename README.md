# Angular_Seed_Project_Gulp
=====================================

## install gulp
npm install -g gulp

## install bower
npm install -g bower

## get all dependencies
npm install
bower install

## gulp commands
Gulp file is based on angular gulp generator (https://github.com/Swiip/generator-gulp-angular). There are few main task that you can do:

gulp or gulp build to build an optimized version of your application in /dist
gulp serve to launch a browser sync server on your source files
gulp serve:dist to launch a server on your optimized application
gulp test to launch your unit tests with Karma
gulp test:auto to launch your unit tests with Karma in watch mode
gulp protractor to launch your e2e tests with Protractor
gulp protractor:dist to launch your e2e tests with Protractor on the dist files
In bower.js file there are specify needed resources for Seed Project. As your project will grow you will need to add new resources. Look at the full version of bower file in bower_all_dependencies.json to get resources that you need.
