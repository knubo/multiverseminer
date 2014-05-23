(function(){
    var root = this;
    
    
    /**
    * @param {String} name The name of the quest
    * @param {String} desc The quest description
    * @param {Boolean} orderd Determines whether or not order matters. If true, tasks must be completed in order.
    * @param {Task} [tasks] A list of tasks
    */
    function Quest(name,desc, ordered, tasks){
        // Ideally quest can be written in JSON and then can be parsed by the quest module
        this.name = name;
        this.desc = desc;
        this.ordered = ordered;
        this.tasks = tasks.splice(0);
    }
    
    /**
    * Add a new task
    * @param {String} desc Task description
    * @param {String} type The type of task, valid options are Destroy, Craft, Collect, Event
    * @param {String} what What we need to do. Format for Destroy, Craft, Collect is X Y. Eg : 10 iron-bars. 
    * If the type is event then a listener will be created for that event and when fired will complete the task
    */
    Quest.prototype.addTask = function(desc,type,what){
        var t = new Task(desc,type,what);
        return this;
    };
    
    Quest.prototype.removeTask = function(index){
        return this.tasks.splice(index,1);
    };
    
    Quest.prototype.fail = function(){
        
    };
    
    Quest.prototype.complete = function(){
        
    };
    
    /**
    * The task object
    * @param {String} desc Task description
    * @param {String} type The type of task, valid options are Destroy, Craft, Collect, Event
    * @param {String} what What we need to do. Format for Destroy, Craft, Collect is X Y.
    * Where X is the quantity and Y is the object. It can be specific, EG: 10 iron-bar, or generic 5 gems
    * If the type is event then a listener will be created for that event and when fired will complete the task
    */
    function Task(desc,type,what){
        var quantity,
            id;
        if(type === 'event'){
            this.event = what;
            // observer.once(this.event, this.complete)
            return;
        }
        quantity = what.split(' ')[0];
        id = what.split(' ')[1];
        quantity = parseInt(type,10);
        quantity = isNaN(quantity) ? 1 : type;
        this.quantity = quantity;
        this.event = type;
        // observer.on(type,this.check)
    }
    
    Task.prototype.check = function(){
        
    };
    
    
    root.Quest = Quest;
}());