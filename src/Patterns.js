export const Iterator = function(items){
    this.index = 0;
    this.items = items;
}

Iterator.prototype = {
    first: function() {
        this.reset();
        return this.next();
    },
    next: function() {
        return this.items[this.index++];
    },
    hasNext: function() {
        return this.index <= this.items.length;
    },
    reset: function() {this.index = 0},
    each: function(callback){
        for (let i = 0; i < this.items.length; i++) {
            callback(this.items[i]);
        }
    }
}