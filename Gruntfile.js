module.exports = function(grunt) {
  grunt.initConfig({
    apidoc: {
      mypp: {
        src: 'server/modules/',
        dest: 'server/apidoc/',
        options: {
          debug: true,
          includeFilters: ['.*\\.js$'],
          excludeFilters: ['node_modules/'],
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.registerTask('default', ['apidoc']);
};
