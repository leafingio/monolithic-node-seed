module.exports = function(grunt) {
  grunt.initConfig({
    apidoc: {
      mypp: {
        src: 'server/',
        dest: 'apidoc/',
        options: {
          debug: true,
          includeFilters: ['.*\\.js$'],
          excludeFilters: ['node_modules/'],
        },
      },
    },
    nsp: {
      package: grunt.file.readJSON('package.json')
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.loadNpmTasks('grunt-nsp');
  grunt.registerTask('default', ['apidoc']);
  grunt.registerTask('security', ['nsp']);
};
