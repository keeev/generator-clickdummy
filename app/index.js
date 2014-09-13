'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ClickdummyGenerator = module.exports = function ClickdummyGenerator(args, options, config) {
    var self = this;

    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ClickdummyGenerator, yeoman.generators.Base);

ClickdummyGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log("Frontend Clickdummy Generator");

    var prompts = [{
        name: 'projectName',
        message: 'The name of your project'
    },{
        type: 'confirm',
        message: 'Include autoprefixer?',
        name: 'includeAutoprefixer',
        default: true
    },{
        type: 'confirm',
        message: 'Include basic proxy configuration for connect?',
        name: 'includeProxy',
        default: false
    }];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.includeAutoprefixer = props.includeAutoprefixer;
        this.includeProxy = props.includeProxy;

        cb();
    }.bind(this));
};

ClickdummyGenerator.prototype.app = function app() {
    this.mkdir('app');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
};

ClickdummyGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('_readme.md', 'Readme.md');
};


ClickdummyGenerator.prototype.setupScripts = function setupScripts() {
    this.mkdir('app/scripts');
    this.template('main.js', 'app/scripts/main.js')
};

ClickdummyGenerator.prototype.setupStyles = function setupStyles() {
    this.mkdir('app/styles');
    /* create folders in the following structure
    this.mkdir('app/styles/util');*/

    this.copy('main.less', 'app/styles/main.less');
};

ClickdummyGenerator.prototype.setupDirectories = function setupDirectories() {
    this.mkdir('app/images');
    this.mkdir('app/scripts');
    this.mkdir('app/fonts');
};

ClickdummyGenerator.prototype.setupViews = function setupViews() {
    this.mkdir('app/views/includes');

    this.copy('index.php','app/views/index.php');
    this.copy('header.php','app/views/includes/header.php');
};
