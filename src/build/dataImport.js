module.exports = function (grunt) {
	
	grunt.registerMultiTask('dataImport', 'Import the data from xls', function() {
		var path = require('path');
		var fs = require('fs');
		var xls = require('xlsjs');
		var enums = require('../enums');
		
		grunt.log.write('\n Importing data ...\n');
		fs.mkdir('tmp');
		
		// helper function
		function getJsonValue(key, value, indentation) {
			var safeValue = value.replace('\'', '\\\'');
			if(!indentation) indentation = '';
			
			if(!isNaN(value)) {
				return indentation+'\''+key+'\': '+safeValue+',';
			}
			
			return indentation+'\''+key+'\': \''+safeValue+'\',';
		};
				
		// Open items
		var dataRoot = 'assets/data/';
		
		var destFile = 'src/data/items.js';
		
		var sourceFiles = {
				'buildings.xls': [['category', 'gearBuilding'], ['gearType', 'building']],
				'components.xls': [['category', 'component']],
		        'gear - chest.xls': [['category', 'gearChest'], ['gearType', 'chest']],
		        'gear - feet.xls': [['category', 'gearFeet'], ['gearType', 'feet']], 
		        'gear - head.xls': [['category', 'gearHead'], ['gearType', 'head']],
		        'gear - legs.xls': [['category', 'gearLegs'], ['gearType', 'legs']], 
		        'gear - weapons.xls': [['category', 'gearMainHand'], ['gearType', 'mainHand']],
                'gear - picks.xls': [['category', 'gearMainHand'], ['gearType', 'miningGear']],
		        'gems.xls': [['category', 'gem']],
		        'materials.xls': [['category', 'rawMaterial']],
		        'potions.xls': [['category', 'usable']],
		        'scavenge.xls': [['category', 'scavenge']]
		};
		
		var importData = [];
		importData.push('// ------------------------------------------------------------------------');
		importData.push('// AUTO-GENERATED, DO NOT EDIT MANUALLY');
		importData.push('//  Generated @ '+new Date().toString());
		importData.push('// ------------------------------------------------------------------------');
		importData.push('');
		importData.push('Items = {');
		for(var sourceFile in sourceFiles) {
			var staticData = sourceFiles[sourceFile];
			var workbook = xls.readFile(dataRoot + sourceFile);
			var sheetNames = workbook.SheetNames;
			var sheet = xls.utils.sheet_to_row_object_array(workbook.Sheets[sheetNames[0]]);
			grunt.log.write('\nImporting: '+sourceFile+'\n');
			
			importData.push('\t// -------------------------------------------');
			importData.push('\t// '+sourceFile);
			importData.push('\t// -------------------------------------------');
			for(var r = 0; r < sheet.length; r++) {
				grunt.log.write('.');
				var row = sheet[r];
				var craftCost = [];
				var currentCraftCostEntry = undefined;
                var storageLimit = undefined;
				
				// Todo: data checks, crafting etc and proper formatting, this is just a test!
				importData.push('\t\''+row['id']+'\': {');
				for(var i = 0; i < staticData.length; i++) {
					importData.push(getJsonValue(staticData[i][0], staticData[i][1], '\t\t'));					
				}
				
				for(column in row) {
					var value = row[column];
					column = column.toLowerCase();
					
					// Skip underscore columns and some other special ones
					if(column[0] == '_') {
						continue;
					}
					
					if(column.indexOf('craft') == 0) {
						// Todo: Crafting cost
						if(column[column.length - 1] == '#') {
							if(!value || value == '') {
								// No crafting info set
								continue;
							}
							
							if(!currentCraftCostEntry) {
								grunt.log.write('\n Invalid crafting data in XLS: '+sourceFile+' -> '+row['id']+'\n');
								continue;
							}
							
							currentCraftCostEntry.push(value);
							craftCost.push(currentCraftCostEntry);
							currentCraftCostEntry = undefined;
						} else {
							currentCraftCostEntry = [value];
						}
						
						continue;
					}
					if(column == 'type') {
						// Todo: use the enums value
						continue;
					}
					
					importData.push(getJsonValue(column, row[column], '\t\t'));
				}
				
				if(craftCost.length > 0) {
					importData.push('\t\t\'craftCost\': {');
					for(var n = 0; n < craftCost.length; n++) {
						importData.push(getJsonValue(craftCost[n][0], craftCost[n][1], '\t\t\t'));
					}
					
					importData.push('\t\t},');
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
