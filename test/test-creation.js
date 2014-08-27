/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('clickdummy generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('clickdummy:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            'package.json',
            'bower.json',
            '.editorconfig',
            '.jshintrc',
            '.bowerrc',
            '.gitignore',
            'Gruntfile.js',
            'app/scripts/main.js',
            'app/styles/main.scss',
            'app/templates/layouts/layout.hbs',
            'app/templates/pages/index.hbs',
            'app/templates/partials/scripts.hbs'
        ];

        helpers.mockPrompt(this.app, {
            'projectName': 'test-project'
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
