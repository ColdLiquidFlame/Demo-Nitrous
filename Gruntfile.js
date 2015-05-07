module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: ' /**** <%= pkg.name %> - <%= pkg.author %> ****/\n'
      },
      build: {
        src: ['www/assets/<%= pkg.minifiedPrefix %>.js'],
        dest: 'www/assets/<%= pkg.minifiedPrefix %>.js'
      }
    },
    injector: {
      options: {
        template: 'www/index.html',
      },
      dev: {
        files: {
          'www/index.html': ['bower.json', 'www/**/*.js', '!Gruntfile.js', '!server.js', '!bower_components/**/*', '!node_modules/**/*']
        }
      },
      prod: {
        options: {
          min: true
        },
        files: {
          'www/index.html': ['bower.json', 'www/assets/<%= pkg.minifiedPrefix %>.js']
        }
      }
    },
    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },
    clean: {
      build: ['www/assets/*']
    },
    concat: {
      prod: {
        src: ['**/*.js', '!Gruntfile.js', '!server.js', '!bower_components/**/*', '!node_modules/**/*'],
        dest: 'www/assets/<%= pkg.minifiedPrefix %>.js'
      }
    },
    jshint: {
      all: ['www/**/*.js', '!bower_components/**/*', '!node_modules/**/*', '!www/assets/**/*']
    },
    ngmin: {
      prod: {
        src: ['www/assets/<%= pkg.minifiedPrefix %>.js'],
        dest: 'www/assets/<%= pkg.minifiedPrefix %>.js'
      }
    }
  });  
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ngmin');
  
  grunt.registerTask('dev', ['jshint', 'clean', 'injector:dev']);
  
  grunt.registerTask('prod', ['jshint', 'clean', 'concat:prod', 'ngmin:prod', 'uglify', 'injector:prod']);

};