'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var PulpmediaGenerator = module.exports = function PulpmediaGenerator(args, options, config) {
    var self = this;

    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PulpmediaGenerator, yeoman.generators.Base);

PulpmediaGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log("Hello Adventurer, welcome to Pulpmedia's Frontend-Clickdummy Generator");

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
        message: 'Include Pulpmedia company notice in JS?',
        name: 'includePulpmediaNotice',
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
        this.includePulpmediaNotice = props.includePulpmediaNotice;
        this.includeProxy = props.includeProxy;

        cb();
    }.bind(this));
};

PulpmediaGenerator.prototype.app = function app() {
    this.mkdir('app');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
};

PulpmediaGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('_readme.md', 'Readme.md');
};


PulpmediaGenerator.prototype.setupScripts = function setupScripts() {
    this.mkdir('app/scripts');
    this.template('main.js', 'app/scripts/main.js')
};

PulpmediaGenerator.prototype.setupStyles = function setupStyles() {
    this.mkdir('app/styles');
    //this.mkdir('app/styles/base');

    this.copy('main.less', 'app/styles/main.less');
};


PulpmediaGenerator.prototype.setupDirectories = function setupDirectories() {
    this.mkdir('app/views');
    this.mkdir('app/images');
    this.mkdir('app/scripts');
    this.mkdir('app/fonts');
};


PulpmediaGenerator.prototype.setupViews = function setupViews() {
    this.mkdir('app/views/includes');
    
    this.copy('index.php','app/views/index.php');
    this.copy('header.php','app/views/includes/header.php');
};

// PulpmediaGenerator.prototype.setupTemplates = function setupTemplates() {
//     this.mkdir('app/templates');
//     this.mkdir('app/templates/layouts');
//     this.mkdir('app/templates/pages');
//     this.mkdir('app/templates/partials');
//     this.mkdir('app/data');
// 
//     this.template('layout.hbs','app/templates/layouts/layout.hbs');
//     this.template('index.hbs','app/templates/pages/index.hbs');
//     this.template('scripts.hbs','app/templates/partials/scripts.hbs');
// };
