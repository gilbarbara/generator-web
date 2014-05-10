// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);

	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
		yeoman: yeomanConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
			scripts: {
				files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
				tasks: ['jshint', 'uglify'],
				options: {
					livereload: true
				}
			},
            gruntfile: {
                files: ['Gruntfile.js']
            },
			compass: {
				files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass']
			},
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%%= yeoman.app %>/media/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // The actual grunt server settings
		connect: {
			options: {
				port: SERVER_PORT,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'bower_components'),
							mountFolder(connect, yeomanConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, yeomanConfig.dist)
						];
					}
				}
			}
		},

		//Open in a new browser window
		open: {
			server: {
				path: 'http://localhost:<%%= connect.options.port %>'
			}
		},

        useminPrepare: {
            html: '<%%= yeoman.app %>/index.html',
            options: {
                dest: '<%%= yeoman.dist %>'
            }
        },

        usemin: {
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%%= yeoman.dist %>']
            }
        },

		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '<%%= yeoman.app %>',
					src: '*.html',
					dest: '<%%= yeoman.dist %>'
				}]
			}
		},

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/media',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%%= yeoman.dist %>/media'
                }]
            }
        },

        cssmin: {
			dist: {
				files: {
					'<%%= yeoman.dist %>/styles/main.min.css': ['.tmp/styles/main.css']
				}
			}
        },

		// Empties folders to start fresh
		clean: {
			dist: ['.tmp', '<%%= yeoman.dist %>/*'],
			server: '.tmp'
		},

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        cwd: '<%%= yeoman.app %>/',
                        dest: '<%%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess'
                        ]
					},
					{
						expand: true,
						flatten: true,
						cwd: 'bower_components/',
						dest: '<%%= yeoman.dist %>/styles/fonts/',
						src: ['bootstrap-sass/vendor/assets/fonts/bootstrap/*.*'<% if (includeFontAwesome) { %>, 'font-awesome/fonts/*.*'<% } %>]

					}<% if (includeRespond || includeHtml5shiv) { %>,
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        cwd: 'bower_components/',
                        dest: '<%%= yeoman.dist %>/scripts',
                        src: [<% if (includeRespond) { %>
							'respond/dest/respond.min.js'<% } %><% if (includeHtml5shiv) { %>,
							'html5shiv/dist/html5shiv.js'<% } %>
                        ]
                    }<% } %><% if (includeModernizr) { %>,
					{
						expand: true,
						flatten: true,
						src: ['.tmp/scripts/modernizr.js'],
						dest: '<%%= yeoman.dist %>/scripts/'
					}<% } %>
                ]
            },
			server: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: 'bower_components/',
						dest: '.tmp/styles/fonts/',
						src: ['bootstrap-sass/vendor/assets/fonts/bootstrap/*.*'<% if (includeFontAwesome) { %>, 'font-awesome/fonts/*.*'<% } %>]
					}
				]
			}
        },

		compass: {
			options: {
				sassDir: '<%%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				imagesDir: '<%%= yeoman.app %>/images',
				javascriptsDir: '<%%= yeoman.app %>/scripts',
				fontsDir: '<%%= yeoman.app %>/styles/fonts',
				importPath: 'bower_components',
				relativeAssets: true
			},
			dist: {},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        }<% if (includeModernizr) { %>,

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            dist: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: '.tmp/scripts/modernizr.js',
                files: {
					src: [
						'.tmp/scripts/{,*/}*.js',
						'.tmp/styles/{,*/}*.css'
					]
				},
                uglify: true
            }
        }<% } %>
    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'clean:server',
            'copy:server',<% if (includeModernizr) { %>
            'modernizr',<% } %>
            'compass:server',
            'jshint',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',<% if (includeModernizr) { %>
        'modernizr',<% } %>
        'compass:dist',
		'useminPrepare',
		'htmlmin',
		'cssmin',
		'imagemin',
		'jshint',
		'concat',
		'uglify',
		'usemin',
        'copy:dist'
    ]);

    grunt.registerTask('default', [
        'compass',
        'jshint'
    ]);
};