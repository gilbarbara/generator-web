// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%%= pkg.title || pkg.name %> - v<%%= pkg.version %> - ' +
            '<%%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%%= grunt.template.today("yyyy") %>;' +
            ' Licensed <%%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Project settings
        yeoman: {
            // Configurable paths
            assets: 'assets',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%%= yeoman.assets %>/scripts/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            less: {
				files: '<%%= yeoman.assets %>/styles/main.less',
				tasks: ['less']
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%%= yeoman.assets %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
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
                        '.tmp',
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
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            ext: ['<%%= concat.ext.dest %>'],
            server: '.tmp'
        },
		less: {
            main: {
                options: {
                    paths: ['<%%= yeoman.assets %>/styles'],
                    cleancss: true
                },
                files: {
                    '<%%= yeoman.dist %>/main.min.css': ['<%%= yeoman.assets %>/styles/main.less']
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
                '<%%= yeoman.assets %>/scripts/{,*/}*.js'
            ]
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%%= yeoman.assets %>',
                        dest: '<%%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'images/{,*/}*.webp'
                        ]
                    },
                    {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: '<%%= yeoman.dist %>', filter: 'isFile'}<% if (includeFontAwesome) { %>,
                        {expand: true, cwd: 'bower_components/', src: ['font-awesome/css/*', 'font-awesome/fonts/*'], dest: '<%%= yeoman.dist %>'}<% } %><% if (includeRespond) { %>,
                    {expand: true, flatten: true, src: ['bower_components/respond/dest/respond.min.js'], dest: '<%%= yeoman.dist %>', filter: 'isFile'}<% } %><% if (includeAight) { %>,
                        {expand: true, flatten: true, src: ['bower_components/aight/aight.min.js'], dest: '<%%= yeoman.dist %>', filter: 'isFile'}<% } %>
                ]
            }
        },
        concat: {
            options: {
                banner: '<%%= banner %>',
                stripBanners: true
            },
            ext: {
                src: [
                    'bower_components/jquery/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js'<% if (includeUnderscore) { %>,
                    'bower_components/underscore/underscore.js',
                    'assets/js/mixins.js'<% } %>
                ],
                dest: '<%%= yeoman.dist %>/extensions.js'
            }
        },
        uglify: {
            options: {
                banner: '<%%= banner %>'
            },
            main: {
                src: '<%%= yeoman.assets %>/scripts/main.js',
                dest: '<%%= yeoman.dist %>/main.min.js'
            },
            ext: {
                src: '<%%= concat.ext.dest %>',
                dest: '<%%= yeoman.dist %>/extensions.min.js'
            }
        }<% if (includeModernizr) { %>,
        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: 'bower_components/modernizr/modernizr.js',
            outputFile: '<%%= yeoman.dist %>/modernizr.js',
            files: [
                '<%%= yeoman.dist %>/{,*/}*.js',
                '<%%= yeoman.dist %>/{,*/}*.css'
            ],
            uglify: true
        }<% } %>
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concat',
        'uglify',
        'clean:ext',
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