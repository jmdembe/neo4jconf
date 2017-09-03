module.exports = function(grunt) {
  "use strict";
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'), 
      
      clean: ['build/'];
      
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
      }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
  };