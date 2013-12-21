# generator-web [![Build Status](https://secure.travis-ci.org/gilbarbara/generator-web.png?branch=master)](https://travis-ci.org/gilbarbara/generator-web) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Web generator

Build a modern website with h5bp, bootstrap 3, jquery (and modernizr, underscore, respond, Font Awesome, lesshat).
Uses bower for dependencies and grunt for tasks.

## Features

* Built-in preview server with LiveReload
* Automagically compile Less
* Automagically concatenate, lint and compress your scripts
* Optional - Modernizr builds
* Optional - Underscore.js + custom mixins
* Optional - Font Awesome
* Optional - Less Hat
* Optional - Respond.js (for IE8)
* Optional - html5shiv (for IE8)

For more information on what `generator-webapp` can do for you, take a look at the [Grunt tasks](https://github.com/gilbarbara/generator-web/blob/master/app/templates/_package.json) used in our `package.json`.

## Getting Started

- Install: `npm install -g generator-web`
- Run: `yo web`
- Run `grunt build` for building and `grunt serve` for preview


## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
