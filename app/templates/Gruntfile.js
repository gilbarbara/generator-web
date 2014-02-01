// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

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
			html: {
				files: ['<%%= yeoman.app %>/{,*/}*.html'],
				tasks: ['copy:html']
			},
            gruntfile: {
                files: ['Gruntfile.js']
            },
            less: {
				files: '<%%= yeoman.app %>/styles/main.less',
				tasks: ['less']
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        'dist',
                        ''
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%%= yeoman.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: ['.tmp', '<%%= yeoman.dist %>/*'],
            server: '.tmp'
        },
		less: {
            main: {
                options: {
                    paths: ['<%%= yeoman.app %>/styles'],
                    cleancss: true
                },
                files: {
                    '<%%= yeoman.dist %>/styles/main.min.css': ['<%%= yeoman.app %>/styles/main.less']
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
        },
        // Copies remaining files to places other tasks can use
        copy: {
			html: {
				files: [
					{ expand: true, flatten: true, src: ['<%%= yeoman.app %>/{,*/}*.html'], dest: '<%%= yeoman.dist %>', filter: 'isFile' }
				]
			},
            dist: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        cwd: '<%%= yeoman.app %>/',
                        dest: '<%%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'images/{,*/}*.webp'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        cwd: 'bower_components/',
                        dest: '<%%= yeoman.dist %>/scripts',
                        src: [
                            'jquery/jquery.min.js',
                            'bootstrap/dist/js/bootstrap.min.js'<% if (includeUnderscore) { %>,
                            'underscore/underscore-min.js'<% } %><% if (includeRespond) { %>,
                            'respond/dest/respond.min.js'<% } %><% if (includeHtml5shiv) { %>,
                            'html5shiv/dist/html5shiv.js'<% } %>
                        ]
                    },
                    { expand: true, flatten: true, src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: '<%%= yeoman.dist %>/styles', filter: 'isFile' }<% if (includeFontAwesome) { %>,
                    { expand: true, cwd: 'bower_components/', src: ['font-awesome/css/*', 'font-awesome/fonts/*'], dest: '<%%= yeoman.dist %>/styles' }<% } %>
                ]
            }
        },
        concat: {
            options: {
                banner: '<%%= banner %>',
                stripBanners: true
            }
        },
		uglify: {
            options: {
                banner: '<%%= banner %>'
            },
            main: {
                src: '<%%= yeoman.app %>/scripts/main.js',
                dest: '<%%= yeoman.dist %>/scripts/main.min.js'
            }
        }<% if (includeModernizr) { %>,
        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            dist: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: '<%%= yeoman.dist %>/scripts/modernizr.js',
                files: {
					src: [
						'<%%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%%= yeoman.dist %>/styles/{,*/}*.css'
					]
				},
                uglify: true
            }
        }<% } %>
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean',
            'copy',
            'uglify',
            'less:main',<% if (includeModernizr) { %>
            'modernizr',<% } %>
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'uglify',
        'less:main',
        'copy'<% if (includeModernizr) { %>,
        'modernizr'<% } %>
    ]);

    grunt.registerTask('default', [
        'less:main',
        'jshint',
        'uglify:main'
    ]);
};