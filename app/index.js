"use strict";
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var WebGenerator = module.exports = function WebGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WebGenerator, yeoman.generators.Base);

WebGenerator.prototype.askFor = function askFor() {
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
                    checked: true
                },
                {
                    name: 'html5shiv',
                    value: 'includeHtml5shiv',
                    checked: true
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

        cb();
    }.bind(this));
};

WebGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js');
};

WebGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

WebGenerator.prototype.git = function git() {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
};

WebGenerator.prototype.bower = function bower() {
    this.copy('_bower.json', 'bower.json');
};

WebGenerator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

WebGenerator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

WebGenerator.prototype.h5bp = function h5bp() {
    this.copy('favicon.ico', 'app/favicon.ico');
    this.copy('robots.txt', 'app/robots.txt');
    this.copy('htaccess', 'app/.htaccess');
};

WebGenerator.prototype.mainStylesheet = function mainStylesheet() {
    this.copy('main.less', 'app/styles/main.less');
};

WebGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/media');
    this.copy('index.html', 'app/index.html');
    this.copy('main.js', 'app/scripts/main.js');
    this.copy('mixins.js', 'app/scripts/mixins.js');
};

WebGenerator.prototype.install = function () {
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
