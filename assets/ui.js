UI = {};

UI.defaultIcon = 'assets/images/icon_placeholder.png';

UI.buildCraftingEntry = function(item) {
    var tooltipContent = UI.buildCraftingCostTooltip(item);
    var content = $('<div class="craftingItemPanel" onclick="onCraft(' + item.id + ')" title="' + tooltipContent +'"/>');
    var icon = UI.defaultIcon;
    if(item.icon) {
        icon = item.icon;
    }
    content.append('<image class=\'craftingIcon\' src="'+icon+'" />');
    content.append('<span class="craftingText">'+item.name+'</span>').disableSelection();
    
    return content;
};

UI.buildCraftingCostTooltip = function(item) {
    // We are building a text tooltip for now, html will be a bit more work
    //  for html tooltips see: http://api.jqueryui.com/tooltip/#option-content
    var cost = game.getCraftingCost(item.id, 1);
    var costEntries = [];
    for(var key in cost) {
        var item = game.getItem(key);
        costEntries.push(cost[key]+' '+item.name);
    }
    
    return costEntries.join(', ');
};

UI.buildInventory = function(targetDiv, storage) {
    
};

UI.buildItem = function(item) {
    
};