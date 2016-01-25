module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            basePath: '[appName-client]'

        },
        jshint: {},
        jsmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//���banner
            },
            builda: {//����һ��ѹ��a.js��������������������ע�ͣ����banner��footer
                options: {
                    mangle: false, //������������
                    preserveComments: 'all', //��ɾ��ע�ͣ�������Ϊ false��ɾ��ȫ��ע�ͣ���some������@preserve @license @cc_on��ע�ͣ�
                    footer:'\n/*! <%= pkg.name %> ����޸��ڣ� <%= grunt.template.today("yyyy-mm-dd") %> */'//���footer
                },
                files: {
                    'output/js/a.min.js': ['js/a.js']
                }
            },
            buildb:{//�������ѹ��b.js�����ѹ����Ϣ
                options: {
                    report: "min"//���ѹ���ʣ���ѡ��ֵ�� false(�������Ϣ)��gzip
                },
                files: {
                    'output/js/b.min.js': ['js/main/b.js']
                }
            },
            buildall: {//����������ԭ�ļ��ṹѹ��js�ļ���������JS�ļ�
                files: [{
                    expand:true,
                    cwd:'js',//jsĿ¼��
                    src:'**/*.js',//����js�ļ�
                    dest: 'output/js'//�������Ŀ¼��
                }]
            },
            release: {//�����ģ��ϲ�ѹ��a.js��b.js
                files: {
                    'output/js/index.min.js': ['js/a.js', 'js/main/b.js']
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    '<%= meta.basePath %>/dist/<%= pkg.name %>.min.css':'<%= meta.basePath %>/sass/<%= pkg.name %>.css'
                }
            }
        },
        htmlmin: {}, 
        concat: {
            sass: {
                src: ['<%= meta.basePath %>/sass/*.scss'],
                dest: '<%= meta.basePath %>/sass/<%= pkg.name %>.scss'
            }
        },
        sass: {
            dist: {
                files: {
                    '<%= meta.basePath %>/sass/<%= pkg.name %>.css': '<%= meta.basePath %>/sass/<%= pkg.name %>.scss'

                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['jshint', 'concat', 'jsmin:release']);
};