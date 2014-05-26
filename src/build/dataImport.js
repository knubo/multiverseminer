module.exports = function (grunt) {
	
	grunt.registerMultiTask('dataImport', 'Import the data from xls', function() {
		var path = require('path');
		var fs = require('fs');
		var xls = require('xlsjs');
		
		grunt.log.write('\n Importing data ...\n');
		fs.mkdir('tmp');
		
		// helper function
		function safeString(value) {
			return value.replace('\'', '\\\'');
		};
				
		// Open items
		var dataRoot = 'assets/data/';
		
		var destFile = 'src/data/items_autogen.js';
		
		var sourceFiles = ['buildings.xls', 'components.xls', 
		                   'gear - chest.xls', 'gear - feet.xls', 
		                   'gear - head.xls', 'gear - legs.xls', 
		                   'gear - picks.xls', 'gear - weapons.xls',
		                   'gems.xls', 'materials.xls', 'potions.xls'];
		
		var importData = [];
		importData.push('Items = {');
		for(var i = 0; i < sourceFiles.length; i++) {
			var workbook = xls.readFile(dataRoot + sourceFiles[i]);
			var sheetNames = workbook.SheetNames;
			var sheet = xls.utils.sheet_to_row_object_array(workbook.Sheets[sheetNames[0]]);
			grunt.log.write('Importing: '+sourceFiles[i]+'\n');
			
			importData.push('\t// -------------------------------------------');
			importData.push('\t// '+sourceFiles[i]);
			importData.push('\t// -------------------------------------------');
			for(var r = 0; r < sheet.length; r++) {
				
				var row = sheet[r];
				
				// Todo: data checks, crafting etc and proper formatting, this is just a test!
				importData.push('\t'+row['id']+': {');
				for(column in row) {
					column = column.toLowerCase();
					
					// Skip underscore columns and some other special ones
					if(column[0] == '_' || column == 'id') {
						continue;
					}
					
					if(column.indexOf('craft') == 0) {
						// Todo: Crafting cost
						continue;
					}
					
					if(column == 'type') {
						// Todo: use the enums value
						continue;
					}
					
					var value = row[column];
					if(!isNaN(value)) {
						importData.push('\t\t\''+column+'\': '+row[column]+',');
						continue;
					}
					
					importData.push('\t\t\''+column+'\': \''+safeString(row[column])+'\',');
				}
				
				importData.push('\t},');
			}
			
			importData.push('');
			
		}
		
		importData.push('}');
		var fd = fs.openSync(destFile, 'w');
		fs.write(fd, importData.join('\n'));
		fs.close(fd);
	});
};