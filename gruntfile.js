module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'js/libs/jquery.min.js',
                    'js/libs/bootstrap.js',
                    'js/libs/html5shiv.js',
                    'js/libs/jquery.flexslider.js',
                    'js/custom.js'
                ],
                dest: 'js/build/production.js',
                nonull: true
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        compass: {
            dist: {
                options: {
                    http_path: '../',
                    sassDir: 'sass',
                    cssDir: 'css'
                }
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: '/* My minified css file <%= pkg.name %> - v<%= pkg.version %>  - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    'css/production.min.css': [
                        'css/bootstrap.css',
                        'css/bootstrap-responsive.css',
                        'css/flexslider.css',
                        'css/custom.css'
                    ]
                }
            }
        },


        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['notify:gruntChange']
            },
            scripts: {
                files: ['js/*.js', 'js/libs/*.js'],
                tasks: ['concat', 'uglify']
            },
            csstosass: {
                files: ['sass/*.sass'],
                tasks: ['compass']
            },
            css: {
                files: ['css/*.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'cssmin', 'watch']);
};