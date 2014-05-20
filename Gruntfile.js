module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    requirejs: {
	  compile: {
	    options: {
	      baseUrl: "./",
	      out: "bin/MultiverseMiner.min.js",
	      optimize: 'uglify',
	      uglify2: {
	          mangle: true
	      },
	      paths: {
	    	  game: 'src/game/game',
	    	  gamecombatant: 'src/game/combatant',
	    	  gamegear: 'src/game/gear',
	    	  gameminer: 'src/game/miner',
	    	  gamenpc: 'src/game/npc',
	    	  gameplanet: 'src/game/planet',
	    	  gameplayer: 'src/game/player',
	    	  gamesettings: 'src/game/settings',
	    	  gamestatistics: 'src/game/statistics',
	    	  gamestorage: 'src/game/storage',
	    	  gamefight: 'src/game/fight',
	    	  ui: 'src/ui/ui',
	    	  uicomponent: 'src/ui/controls/uiComponent',
	    	  uifloating: 'src/ui/controls/uiFloating',
	    	  uiinventory: 'src/ui/controls/uiInventory',
	    	  uiselection: 'src/ui/controls/uiSelection',
	    	  uislot: 'src/ui/controls/uiSlot',
	    	  uiplanetscreen: 'src/ui/uiPlanetScreen',
	    	  uitravelscreen: 'src/ui/uiTravelScreen',
	    	  
	    	  utils: 'src/utils',
	    	  
	          jquery: 'src/external/jquery-2.1.1.min',
	          jqueryui: 'src/external/jquery-ui-1.10.4.custom.min',
	          jgrowl: 'src/external/jquery.jgrowl.min',
	          starfield: 'src/external/starfield'
	      },
	      name: 'src/main.js'
	    	  
	    }
	  }
	},
    
    cssmin: {
	  combine: {
		files: {
		  'bin/<%= pkg.name %>.min.css': [ 'assets/css/*.css', 'src/ui/controls/*.css', 'src/external/*.css' ]
		}
	  }
    },
    
    copy: {
		main: {
			files: [
				{ cwd: 'www', src: '**/*', dest: 'bin', expand: true },
				{ cwd: 'src/external/images', src: '**/*', dest: 'bin/images', expand: true },
				{ cwd: 'assets/images', src: '**/*', dest: 'bin/assets/images', expand: true },
				{ cwd: 'assets/fonts', src: '**/*', dest: 'bin/assets/fonts', expand: true }
			]
		}
	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', [ 'requirejs', /*'uglify',*/ 'cssmin', 'copy' ]);

};
