module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: ' /**** <%= pkg.name %> - <%= pkg.author %> ****/\n'
      },
      build: {
        files: {'www/assets/<%= pkg.minifiedPrefix %>.js': ['app.js']}
      }
    },
    injector: {
      build: {
        files: {
          'index.html': ['bower.json', '**/*.js', '!Gruntfile.js', '!server.js', '!bower_components/**/*', '!node_modules/**/*']
        }
      }
    }
  });  
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-injector');
  
  grunt.registerTask('default', ['injector']);
};