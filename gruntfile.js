module.exports = function(grunt) {
  "use strict";
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
              cwd: 'src/client',
              src: '**/*.html',
              dest: 'dist/'
            }
          ]
        }, 
        customjs: {
          files: [
            {
              expand: true,
              cwd: 'src/client/js',
              src: '**/*.js',
              dest: 'dist/js'
            }
          ]
        },
        // vendorjs: {
        //   files: [
        //     {
        //       expand: true,
        //       cwd: 'node_modules/angular',
        //       src: ['angular.min.js'], 
        //       dest: 'dist/js/vendor/'
        //     }, 
        //     {
        //       expand: true,
        //       cwd: 'node_modules/@uirouter/angularjs/release',
        //       src: ['angular-ui-router.min.js'], 
        //       dest: 'dist/js/vendor/'

        //     }
        //   ]
        // }

      }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('sanity', ['clean']);
    grunt.registerTask('default', ['clean', 'jshint', 'copy']);
  };