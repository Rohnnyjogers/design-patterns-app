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

export class Item {
    constructor(title){
        this.itemTitle = title;
    }
}

export class ItemBuilder{
    constructor(title){
        this.item = new Item(title);
    }

    setCategory(category){
        this.item.category = category;
    }

    setManufacturer(manufacturer){
        this.item.manufacturer = manufacturer;
    }

    setPrice(price){
        this.item.price = price;
    }

    setQuantity(quantity){
        this.item.quantity = quantity;
    }
    // setImage(image){
    //     this.item.image = image;
    // }

    // addReview(rating, comment){

    // }
}