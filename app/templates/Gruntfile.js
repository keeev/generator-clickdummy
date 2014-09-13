'use strict';

/** build with generator-clickdummy 0.1.4 **/

module.exports = function (grunt) {
    <% if(includeProxy) {%> var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;<% } %>
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'<% if(includeProxy) {%>,
        configureProxies: 'grunt-connect-proxy'<% } %>
    });

    grunt.initConfig({
        // configurable paths
        yeoman: {
            app: 'app',
            dist: 'dist'
        },
        watch: {
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '{.tmp,<%%= yeoman.app %>}/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%%= yeoman.app %>'
                    ] <% if(includeProxy) {%>,
                    middleware: function(connect, options) {
                        // Same as in grunt-contrib-connect
                        var middlewares = [];
                        var directory = options.directory ||
                        options.base[options.base.length - 1];
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Same as in grunt-contrib-connect
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        middlewares.push(proxySnippet);

                        middlewares.push(connect.directory(directory));
                        return middlewares;
                    }<% } %>
                }<% if(includeProxy) {%>,
                proxies: [
                    {
                        context: '/',
                        host: '0.0.0.0:9000',
                        changeOrigin: true
                    }
                ]<% } %>
            },
            test: {
                options: {
                    base: [
                        '.tmp',
                        'test',
                        '<%%= yeoman.app %>'
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
            server: '.tmp'
        },
        <% if(includeAutoprefixer) {%>
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },<% } %>
        'bower-install': {
            app: {
                html: '<%%= yeoman.app %>/templates/partials/scripts.hbs',
                ignorePath: '<%%= yeoman.app %>/',
                exclude: ['<%%= yeoman.app %>/bower_components/modernizr/modernizr.js']
            }
        },
        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: '<%%= yeoman.dist %>/index.html'
        },
        usemin: {
            options: {
                assetsDirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/styles/{,*/}*.css']
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
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.*',
                        'fonts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        modernizr: {
            dist: {
                devFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
                outputFile: '<%%= yeoman.dist %>/scripts/vendor/modernizr.js',
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/styles/{,*/}*.css',
                        '!<%%= yeoman.dist %>/scripts/vendor/*'
                    ]
                },
                uglify: true
            }
        },
        less: {
          development: {
            options: {
              paths: ["assets/css"]
            },
            files: {
              "path/to/result.css": "path/to/source.less"
            }
          },
          production: {
            options: {
              paths: ["assets/css"],
              cleancss: true,
              modifyVars: {
                imgPath: '"http://mycdn.com/path/to/images"',
                bgColor: 'red'
              }
            },
            files: {
              "path/to/result.css": "path/to/source.less"
            }
          }
        }

    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.loadNpmTasks('grunt-contrib-less');

        grunt.task.run([
            'clean:server',
            'copy:styles',
            'assemble:server',<% if(includeAutoprefixer) {%>
            'autoprefixer',<% } %><% if(includeProxy) {%>
            'configureProxies:livereload',<% } %>
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
        'copy',
        'htmlmin',
        'useminPrepare',<% if(includeAutoprefixer) {%>
        'autoprefixer',<% } %>
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'copy:dist',
        'modernizr',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
