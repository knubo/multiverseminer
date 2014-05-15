var nextUISelectionKey = 0;

function UISelection(parent, values, selectionChangedCallback) {
    this.key = nextUISelectionKey++;
    this.parent = parent;
    this.keys = Object.keys(values);
    this.values = values;
    this.callback = selectionChangedCallback;
    
    this.min = 0;
    this.max = this.keys.length - 1;
    
    this.selection = -1;
    this.selectionTextElement = undefined;
    
    this.loop = false;
    
    // ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
    this.init = function() {        
        this.selectionFirstElement = $('<img class="selectPrevious clickable noSelect" src="'+ sys.selectionArrowBackFast + '"/>');
        this.selectionFirstElement.click({self: this}, this.onSelectFirst);
        
        this.selectionPrevElement = $('<img class="selectPrevious clickable noSelect" src="'+ sys.selectionArrowBack + '"/>');
        this.selectionPrevElement.click({self: this}, this.onSelectPrevious);
        
        this.selectionTextElement = $('<div class="selectionText noSelect"></div>');
        
        this.selectionNextElement = $('<img class="selectNext clickable noSelect" src="'+ sys.selectionArrowForward +'"/>');
        this.selectionNextElement.click({self: this}, this.onSelectNext);
        
        this.selectionLastElement = $('<img class="selectNext clickable noSelect" src="'+ sys.selectionArrowForwardFast +'"/>');
        this.selectionLastElement.click({self: this}, this.onSelectLast);
        
        // have to add the right floating elements first
        $('#' + this.parent).append(this.selectionLastElement);
        $('#' + this.parent).append(this.selectionNextElement);
        
        $('#' + this.parent).append(this.selectionFirstElement);
        $('#' + this.parent).append(this.selectionPrevElement);
        $('#' + this.parent).append(this.selectionTextElement);
    };
    
    this.update = function(id) {
        var key = this.keys[this.selection];
        this.selectionTextElement.text(this.values[key].toUpperCase());
    };
    
    this.setSelection = function(id) {
        if (!this.keys[id]) {
            utils.logError("setSelection called with invalid argument: " + id);
            return;
        }
        
        this.selection = id;
        this.update();
    };
        
    this.selectPrevious = function() {
        if (this.selection <= this.min) {
            if (!this.loop) {
                return;
            }
            
            this.selection = this.max;
        } else {
            this.selection--;
        }
        
        this.update();
        this.callback(this.selection);
    };
    
    this.selectNext = function() {
        if (this.selection >= this.max) {
            if (!this.loop) {
                return;
            }
            
            this.selection = this.min;
        } else {
            this.selection++;
        }
        
        this.update();
        this.callback(this.selection);
    };
    
    this.onSelectFirst = function(parameter) {
    	var self = parameter.data.self;
    	self.selection = self.min + 1;
    	self.selectPrevious();
    };
    
    this.onSelectPrevious = function(parameter) {
    	var self = parameter.data.self;
        self.selectPrevious();
    };
    
    this.onSelectNext = function(parameter) {
    	var self = parameter.data.self;
        self.selectNext();
    };
    
    this.onSelectLast = function(parameter) {
    	var self = parameter.data.self;
    	self.selection = self.max - 1;
    	self.selectNext();
    };
};