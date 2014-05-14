UISelections = [];

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
        // Register ourselfs for callbacks
        UISelections[this.key] = this;
        
        this.selectionPrevElement = $('<img class="selectPrevious clickable noSelect" src="'+ sys.imageRoot +'selectionArrowBack.png"/>');
        this.selectionPrevElement.click({param: this.key}, this.onSelectPrevious);
        
        this.selectionTextElement = $('<div class="selectionText noSelect"></div>');
        
        this.selectionNextElement = $('<img class="selectNext clickable noSelect" src="'+ sys.imageRoot +'selectionArrowForward.png"/>');
        this.selectionNextElement.click({param: this.key}, this.onSelectNext);
        
        $('#' + this.parent).append(this.selectionPrevElement);
        $('#' + this.parent).append(this.selectionTextElement);
        $('#' + this.parent).append(this.selectionNextElement);
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
    
    this.onSelectPrevious = function(key) {
        var self = UISelections[key.data.param];
        self.selectPrevious();
    };
    
    this.onSelectNext = function(key) {
        var self = UISelections[key.data.param];
        self.selectNext();
    };
};