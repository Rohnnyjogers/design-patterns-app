
export default function Strategy() {
  this.itemTitle = '';
}

Strategy.prototype = {
    setPriceStrategy: function(title){
        return this.itemTitle = title;
    },
    calculatePrice: function(quantity){
        return this.itemTitle.calculatePrice(quantity);
    }
}

class Iterator {
    constructor(items) {
        this.index = 0;
        this.items = items;
    }
    first() { this.reset(); return this.next(); }
    next() { return this.items[this.index++]; }
    hasNext() { return this.index <= this.items.length; }
    reset() { this.index = 0; }
    each(callback) {
        for (var item = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    }
}

var log = (function() {
    var log = "";
    return {
    add: function(msg) { log += msg + "\n"; },
    show: function() { alert(log); log = ""; }
    }
    })();
    
    function run() {
        var items = [{x:1,y:2},{x:3,y:4},{x:1,y:2},{x:1,y:2},{x:1,y:2}];
        var iter = new Iterator(items); // using for loop
        for (var item = iter.first(); iter.hasNext(); item = iter.next())
        { log.add(item); }
        log.add(""); // using Iterator's each method
        iter.each(function(item) { log.add(item.y+''+item.y); });
        log.show();
        }

        run();
        
    
