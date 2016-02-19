module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            template: '[appName]',
            basePath: '[appName]-client'

        },
        jshint: {
            options: {
                browser: true,
                devel: true
            },
            all: ['<%= meta.basePath %>/src/js/**/*.js']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
            },
            builda: {//任务一：压缩a.js，不混淆变量名，保留注释，添加banner和footer
                options: {
                    mangle: false, //不混淆变量名
                    preserveComments: false, //'all' 不删除注释，还可以为 false（删除全部注释），'some'（保留@preserve @license @cc_on等注释）
                    footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
                },
                files: {
                    '<%= meta.basePath %>/dist/<%= pkg.name %>.min.js': ['<%= meta.basePath %>//src/js/<%= pkg.name %>.js']
                }
            },
            buildb:{//任务二：压缩b.js，输出压缩信息
                options: {
                    report: "min"//输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: {
                    'output/js/b.min.js': ['js/main/b.js']
                }
            },
            buildall: {//任务三：按原文件结构压缩js文件夹内所有JS文件
                files: [{
                    expand:true,
                    cwd:'js',//js目录下
                    src:'**/*.js',//所有js文件
                    dest: 'output/js'//输出到此目录下
                }]
            },
            release: {//任务四：合并压缩a.js和b.js
                files: {
                    'output/js/index.min.js': ['js/a.js', 'js/main/b.js']
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    '<%= meta.basePath %>/dist/<%= pkg.name %>.min.css':'<%= meta.basePath %>/src/css/<%= pkg.name %>.css'
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= meta.basePath %>/dist/index.html': '<%= meta.basePath %>/src/index.html',
                    '<%= meta.basePath %>/dist/login.html': '<%= meta.basePath %>/src/login.html',
                }
            }
        },
        concat: {
            sass: {
                src: ['<%= meta.basePath %>/src/sass/*.scss'],
                dest: '<%= meta.basePath %>/src/sass/<%= pkg.name %>.scss'
            },
            js: {
                src: ['<%= meta.basePath %>/src/js/*.js'],
                dest: '<%= meta.basePath %>/src/js/<%= pkg.name %>.js'
            }
        },
        sass: {
            dist: {
                files: {
                    '<%= meta.basePath %>/src/css/<%= pkg.name %>.css': '<%= meta.basePath %>/src/sass/<%= pkg.name %>.scss'
                }
            }
        },
        replace: {
            dist: {
                src: ['.bowerrc', '<%= pkg.name %>Server.js', 'bower.json', '<%= pkg.name %>-server/config/log4js.json'
                , '<%= pkg.name %>-server/config/express.js'],
                overwrite: true,
                replacements:[{
                    from: '<%= meta.template %>',
                    to: '<%= pkg.name %>'

                }]
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('default', ['jshint', 'concat', 'sass', 'cssmin', 'uglify:builda', 'htmlmin']);
    grunt.registerTask('initApp', ['replace']);
};