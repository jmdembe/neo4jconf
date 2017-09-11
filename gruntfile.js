"use strict";

module.exports = function(grunt) {
  
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'), 
      
      clean: ['dist/'],

      jshint: {
        options: {
          jshintrc: '.jshintrc', 
          ignores: ['node_modules/**']
        },
        source: {
          files: {
            src: ['src/client/js/**/*.js']
          }
        }
      },
      copy: {
        html: {
          files: [
            {
              expand: true, 
              cwd: 'src/client/',
              src: '**/*.html',
              dest: 'dist/'
            }
          ]
        },
        vendorjs: {
          files: [
            {
              expand: true,
              cwd: 'node_modules/angular',
              src: ['angular.min.js'], 
              dest: 'dist/js/vendor'
            }, 
            {
              expand: true,
              cwd: 'node_modules/@uirouter/angularjs/release',
              src: ['angular-ui-router.min.js'], 
              dest: 'dist/js/vendor'

            },
            {
              expand: true,
              cwd: 'node_modules/d3/build',
              src: ['d3.min.js'],
              dest: 'dist/js/vendor'
            },
          ]
        },
        css: {
          files: [
            {
              expand: true, 
              cwd: 'src/client',
              src: 'css/**/*.*', 
              dest: 'dist/'  
            }
          ]
        } 
      }, 
      concat: {
        custonjs: {
          src: ['src/client/js/neo4j.module.js', 'src/client/js/**/*.js'], 
          dest: 'dist/js/app.js'
        }, 
        vendorjs: {
          src:['dist/js/vendor/angular.min.js', 'dist/js/**/*.js'],
          dest: 'dist/js/vendor.js'
        }
      },
      watch: {
        html: {
          files: ['src/client/index.html', 'src/client/views/**'],
          tasks: ['copy:html'],
          options: {
            livereload: true
          }
        }, 
        sass: {
          files: ['src/client/sass/**/*.scss'],
          tasks: ['sass'], 
          options: {
            livereload: true
          }
        },
        normalize: {
          files: ['src/client/css/**'],
          tasks: ['copy:css']
        },
        js: {
          files: ['src/client/js/**/*.js'], 
          tasks: ['jshint', 'concat'],
          options: {
            livereload: true
          }
        }
      }, 
      sass: {
        styles: {
          files: {
            'dist/css/style.css': 'src/client/sass/main.scss'
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('sanity', ['clean']);
    grunt.registerTask('default', ['clean', 'jshint', 'copy', 'concat', 'sass']);
  };