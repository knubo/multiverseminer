// ---------------------------------------------------------------------------
// General system variables and data
// ---------------------------------------------------------------------------
var sys = new System();

function System() {	
    this.imageRoot = "assets/images/";
    this.iconRoot = this.imageRoot + "itemIcons/";
    
    // Icons
    this.iconPlaceholder = this.iconRoot + 'icon_placeholder.png';
    this.iconPlaceholderRawMaterial = this.iconRoot + 'icon_placeHolderRawMaterial.png';
    this.iconPLaceholderGem = this.iconRoot + 'icon_placeHolderGem.png';
    this.iconPlaceholderChest = this.iconRoot + 'icon_placeholderGearChest.png';
    this.iconPLaceholderHead = this.iconRoot + 'icon_placeholderGearHelmet.png';
}