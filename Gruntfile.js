module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower_concat: {
      build: {
        dest: 'www/assets/production.js',
        cssDest: 'www/assets/production.css'
      }
    },
    cacheBust: {
      assets: {
        files: [{
          cwd: '/',
          baseDir: '/',
          src: ['www/index.html']
        }]
      }
    },
    clean: {
      build: ['www/assets', 'www/fonts']
    },
    copy: {
      build: {
        files: [{
          expand: true,
          src: ['bower_components/bootstrap/fonts/*'],
          dest: 'www/fonts/',
          flatten: true
        }, {
          expand: true,
          src: ['bower_components/fontawesome/fonts/*'],
          dest: 'www/fonts/',
          flatten: true
        }]
      }
    },
    concat: {
      prod_js: {
        src: ['www/assets/<%= pkg.minifiedPrefix %>.js', '**/*.js', '!e2e-tests/**/*', '!www/**/*_test.js', '!Gruntfile.js', '!server.js', '!bower_components/**/*', '!node_modules/**/*'],
        dest: 'www/assets/<%= pkg.minifiedPrefix %>.js'
      },
      prod_css: {
        src: ['www/assets/<%= pkg.minifiedPrefix %>.css', '**/*.css'],
        dest: 'www/assets/<%= pkg.minifiedPrefix %>.css'
      }
    },
    cssmin: {
      build: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'www/assets/<%= pkg.minifiedPrefix %>.css': ['www/assets/<%= pkg.minifiedPrefix %>.css']
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
    injector: {
      options: {
        template: 'www/index.html',
      },
      dev: {
        files: {
          'www/index.html': [  'bower.json'
                             , 'www/app.js'
                             , 'www/app.css'
                             , 'www/**/*.js'
                             , '!www/**/*_test.js'
                             , '!Gruntfile.js'
                             , '!server.js'
                             , '!bower_components/**/*'
                             , '!node_modules/**/*']
        }
      },
      prod: {
        options: {
          min: true
        },
        files: {
          'www/index.html': ['www/assets/<%= pkg.minifiedPrefix %>.*']
        }
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
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      newFiles: {
        files: ['www/**/*.js', '!www/**/*_test.js'],
        tasks: ['dev'],
        options: {
          event: ['added', 'deleted']
        }
      },
      changedFiles: {
        options: {
          event: 'changed'
        },
        files: ['bower.json', 'www/**/*.js', '!www/**/*_test.js'],
        tasks: ['jshint']
      },
      updateBower: {
        options: {
          event: 'changed'
        },
        files: ['bower.json'],
        tasks: ['dev']
      }
    },
    uglify: {
      // options: {
      //   banner: ' /**** <%= pkg.name %> - <%= pkg.author %> ****/\n'
      // },
      build: {
        src: ['www/assets/<%= pkg.minifiedPrefix %>.js'],
        dest: 'www/assets/<%= pkg.minifiedPrefix %>.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-cache-bust');

  grunt.registerTask('dev', ['jshint', 'clean', 'injector:dev']);

  grunt.registerTask('prod', ['jshint',
    'clean',
    'bower_concat',
    'concat:prod_js',
    'ngmin:prod',
    'uglify',
    'cssmin',
    'copy',
    'injector:prod'
  ]);

  grunt.registerTask('serve', ['dev', 'express', 'watch']);
  grunt.registerTask('serve_prod', ['prod', 'express', 'watch']);


};
