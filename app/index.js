"use strict";
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var WebGenerator = module.exports = function WebGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

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
            name: 'appname',
            message: 'What\'s the name of this project?'
        },
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
                    name: 'aight',
                    value: 'includeAight',
                    checked: true
                }
            ]
        }
    ];

    this.prompt(prompts, function (props) {
        this.appname = props.appname;

        var features = props.features;

        function hasFeature(feat) {
            return features.indexOf(feat) !== -1;
        }

        // manually deal with the response, get back and store the results.
        // we change a bit this way of doing to automatically do this in the self.prompt() method.
        this.includeModernizr = hasFeature('includeModernizr');
        this.includeUnderscore = hasFeature('includeUnderscore');
        this.includeLesshat = hasFeature('includeLesshat');
        this.includeFontAwesome = hasFeature('includeFontAwesome');

        var IE8Support = props.IE8Support;

        function hasIE8Support(feat) {
            return IE8Support.indexOf(feat) !== -1;
        }

        // manually deal with the response, get back and store the results.
        // we change a bit this way of doing to automatically do this in the self.prompt() method.
        this.includeRespond = hasIE8Support('includeRespond');
        this.includeAight = hasIE8Support('includeAight');

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
    this.copy('favicon.ico', 'assets/favicon.ico');
    this.copy('robots.txt', 'assets/robots.txt');
    this.copy('htaccess', '.htaccess');
};

WebGenerator.prototype.mainStylesheet = function mainStylesheet() {
    this.copy('main.less', 'assets/styles/main.less');
};

WebGenerator.prototype.app = function app() {
    this.mkdir('assets');
    this.mkdir('assets/scripts');
    this.mkdir('assets/styles');
    this.mkdir('assets/images');
    this.copy('index.html', 'index.html');
    this.copy('main.js', 'assets/scripts/main.js');
    this.copy('mixins.js', 'assets/scripts/mixins.js');
};

WebGenerator.prototype.install = function () {
    if (this.options['skip-install']) {
        return;
    }

    var done = this.async();
    this.installDependencies({
        skipInstall: this.options['skip-install'],
        callback: done
    });
};
