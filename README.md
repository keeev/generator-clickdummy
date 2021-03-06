# generator-clickdummy [![Build Status](https://travis-ci.org/keeev/generator-clickdummy.svg?branch=master)](https://travis-ci.org/keeev/generator-clickdummy) [ ![Codeship Status for keeev/generator-clickdummy](https://codeship.io/projects/362c3ee0-0ff3-0132-92f1-725c5371edc1/status)](https://codeship.io/projects/32752)

A generator for [Yeoman](http://yeoman.io), for [clickdummy](http://clickdummy.com) front-end projects.


## Getting Started

To install generator-clickdummy from npm, run:

```
$ npm install -g generator-clickdummy
```

Finally, initiate the generator:

```
$ yo clickdummy
```

clickdummy's generator prompts you for your project name and if you want to use Autoprefixer.
If you install any bower dependencies, be sure to run

```
grunt bower-install
```

after scaffolding

## What's in the package?

clickdummy's front-end generator sets up a project including:

* [connect](http://www.senchalabs.org/connect/) Server
* Optional autoprefixer


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
