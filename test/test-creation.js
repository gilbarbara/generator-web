/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('web generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('web:app', [
                '../../app', [
					helpers.createDummyGenerator(),
					'mocha:app'
				]
            ]);
			this.app.options['skip-install'] = true;

			helpers.mockPrompt(this.app, {
				features: [],
				IE8Support: []
			});


            done();
        }.bind(this));
    });

	describe('creates expected files', function () {
		it('without any options', function (done) {
			var expected = [
				// add files you expect to exist here.
				'bower.json',
				'package.json',
				'Gruntfile.js',
				'package.json',
				'app/index.html',
				'app/scripts/main.js',
				'app/styles/main.less',
				'app/favicon.ico',
				'app/robots.txt',
				'app/.htaccess',
				'.gitignore',
				'.gitattributes',
				'.jshintrc',
				'.editorconfig'
			];

			this.app.run({}, function () {
				helpers.assertFiles(expected);
				done();
			});
		});
	});
});
