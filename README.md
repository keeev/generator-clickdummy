# generator-Pulpmedia [![Build Status](https://secure.travis-ci.org/ddprrt/generator-Pulpmedia.png?branch=master)](https://travis-ci.org/ddprrt/generator-Pulpmedia)

A generator for [Yeoman](http://yeoman.io), for [Pulpmedia](http://Pulpmedia.com) front-end projects.


## Getting Started

To install generator-Pulpmedia from npm, run:

```
$ npm install -g generator-Pulpmedia
```

Finally, initiate the generator:

```
$ yo Pulpmedia
```

Pulpmedia's generator prompts you for your project name and if you want to use Autoprefixer.
If you install any bower dependencies, be sure to run

```
grunt bower-install
```

after scaffolding

## What's in the package?

Pulpmedia's front-end generator sets up a project including:

* [connect](http://www.senchalabs.org/connect/) Server
* [Sass](http://sass-lang.com) compilation
* Minifaction
* [Assemble](http://assemble.io) for template generation
* SMACSS based Sass folders, including [Normalize.css](http://necolas.github.io/normalize.css/)
* Optional autoprefixer


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
