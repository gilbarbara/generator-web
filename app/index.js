'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

	this.config.defaults({
		appName: this.appname
	});
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);
    console.log('HTML5 Boilerplate, jQuery and Bootstrap 3 are included out of the box.');

    var prompts = [
        {
            type: 'checkbox',
            name: 'features',
            message: 'What more would you like?',
            choices: [
                {
                    name: 'Modernizr',
                    value: 'includeModernizr',
                    checked: true
                },
                {
                    name: 'Underscore',
                    value: 'includeUnderscore',
                    checked: true
                },
                {
                    name: 'FontAwesome',
                    value: 'includeFontAwesome',
                    checked: true
                },
                {
                    name: 'LessHat',
                    value: 'includeLesshat',
                    checked: true
                }
            ]
        },
        {
            type: 'checkbox',
            name: 'IE8Support',
            message: 'Do you want to add support for IE 8?',
            choices: [
                {
                    name: 'Respond',
                    value: 'includeRespond',
                    checked: false
                },
                {
                    name: 'html5shiv',
                    value: 'includeHtml5shiv',
                    checked: false
                }
            ]
        }
    ];

    this.prompt(prompts, function (props) {
        var features = props.features;

        function hasFeature(feat) {
            return features.indexOf(feat) !== -1;
        }

        // manually deal with the response, get back and store the results.
        // we change a bit this way of doing to automatically do this in the self.prompt() method.
        this.includeModernizr = hasFeature('includeModernizr');
        this.includeUnderscore = hasFeature('includeUnderscore');
        this.includeFontAwesome = hasFeature('includeFontAwesome');
        this.includeLesshat = hasFeature('includeLesshat');

        var IE8Support = props.IE8Support;

        function hasIE8Support(feat) {
            return IE8Support.indexOf(feat) !== -1;
        }

        // manually deal with the response, get back and store the results.
        // we change a bit this way of doing to automatically do this in the self.prompt() method.
        this.includeRespond = hasIE8Support('includeRespond');
        this.includeHtml5shiv = hasIE8Support('includeHtml5shiv');

		this.config.set({
			includeModernizr: this.includeModernizr,
			includeUnderscore: this.includeUnderscore,
			includeFontAwesome: this.includeFontAwesome,
			includeLesshat: this.includeLesshat,
			includeRespond: this.includeRespond,
			includeHtml5shiv: this.includeHtml5shiv
		});

        cb();
    }.bind(this));
};

Generator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

Generator.prototype.git = function git() {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
    this.copy('_bower.json', 'bower.json');
};

Generator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.h5bp = function h5bp() {
	this.copy('index.html', 'app/index.html');
    this.copy('favicon.ico', 'app/favicon.ico');
    this.copy('robots.txt', 'app/robots.txt');
    this.copy('htaccess', 'app/.htaccess');
};

Generator.prototype.mainStylesheet = function mainStylesheet() {
    this.copy('main.less', 'app/styles/main.less');
};

Generator.prototype.setupEnv = function setupEnv() {
    this.mkdir('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/media');
    this.copy('main.js', 'app/scripts/main.js');
    this.copy('mixins.js', 'app/scripts/mixins.js');
};

Generator.prototype.install = function () {
    if (this.options['skip-install']) {
        return;
    }

    this.installDependencies({
        skipInstall: this.options['skip-install'],
        callback: function() {
			// Emit a new event - dependencies installed
			this.async();
		}.bind(this)
    });
};
