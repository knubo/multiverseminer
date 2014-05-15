// ---------------------------------------------------------------------------
// General system variables and data
// ---------------------------------------------------------------------------
var sys = new System();

function System() {	
    this.imageRoot = "assets/images/";
    this.iconRoot = this.imageRoot + "itemIcons/";
    
    // Selection control
    this.selectionArrowBack = this.imageRoot + 'selectionArrowBack.png';
    this.selectionArrowBackFast = this.imageRoot + 'selectionArrowBackFast.png';
    this.selectionArrowForward = this.imageRoot + 'selectionArrowForward.png';
    this.selectionArrowForwardFast = this.imageRoot + 'selectionArrowForwardFast.png';
    
    // Icons
    this.iconPlaceholder = this.iconRoot + 'icon_placeholder.png';
    this.iconPlaceholderRawMaterial = this.iconRoot + 'icon_placeholderRawMaterial.png';
    this.iconPlaceholderGem = this.iconRoot + 'icon_placeholderGem.png';
    this.iconPlaceholderChest = this.iconRoot + 'icon_placeholderGearChest.png';
    this.iconPlaceholderHead = this.iconRoot + 'icon_placeholderGearHelmet.png';
};