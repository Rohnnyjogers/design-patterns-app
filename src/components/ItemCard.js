import React from 'react'

export default function ItemCard({ title, category, manufacturer, price }) {
    // var Shipping = function () {
    //     this.company = "";
    // };
    // Shipping.prototype = {
    //     setStrategy: function (company) { this.company = company; },
    //     calculate: function (packet) { return this.company.calculate(packet); }
    // };

    // // Strategies
    // var UPS = function () {
    //     this.calculate = function (packet) { return "$45.95"; }
    // };
    // var USPS = function () {
    //     this.calculate = function (packet) { return packet.to*3; }
    // };
    // var Fedex = function () {
    //     this.calculate = function (packet) { return "$43.20"; }
    // };
    // var Test = function (){
    //     this.calculate = function(packet) {return ''}
    // }

    // // log helper 
    // var log = (function () {
    //     var log = "";
    //     // Defines public behaviour
    //     return {
    //         add: function (msg) {
    //             log += msg + "\n";
    //         },
    //         show: function () {
    //             console.log(log);
    //             log = "";
    //         }
    //     }
    // })();

    // function run() {
    //     var packet = { from: "76712", to: "10012", weight: "lkg" };
    //     // the 3 strategies 
    //     var ups = new UPS();
    //     var usps = new USPS();
    //     var fedex = new Fedex();
    //     // context
    //     var shipping = new Shipping();
    //     // switch strategies for the context
    //     shipping.setStrategy(ups);
    //     log.add("UPS Strategy: " + shipping.calculate(packet));
    //     shipping.setStrategy(usps);
    //     log.add("USPS Strategy: " + shipping.calculate(packet));
    //     shipping.setStrategy(fedex);
    //     log.add("Fedex Strategy: " + shipping.calculate(packet));
    //     log.show();
    // }

    // run();

    // var Iterator = function (items) {
    //     this.index = 0; this.items =
    //         items;
    // }

    // Iterator.prototype = {
    //     first: function () { this.reset(); return this.next(); },
    //     next: function () { return this.items[this.index++]; },
    //     hasNext: function () { return this.index <= this.items.length; },
    //     reset: function () { this.index = 0; },
    //     each: function (callback) {
    //         for (var item = this.first(); this.hasNext(); item = this.next()) {
    //             callback(item);
    //         }
    //     }
    // }


    // // var log = (function() {
    // //     var log = "";
    // //     return {
    // //         add: function(msg) {
    // //             log += msg + "\n";
    // //         },
    // //         // show: function() {
    // //         //     alert(log);
    // //         //     log = "";
    // //         // }
    // //     };
    // // })();

    // function runI() {
    //     var items = [{ x: 1, y: 2 }];
    //     var iter = new Iterator(items); // using for loop
    //     for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
    //         // console.log(item);
    //     }
    //     // log.add(""); // using Iterator's each method
    //     iter.each(function (item) {
    //         console.log(item.y);
    //     });
    //     // log.show();
    // }

    // runI();


    return (
        <div className='itemCard'>
            <div className='itemImage'>
                <div style={{ backgroundColor: 'green', height: 200, width: 200 }}></div>
            </div>
            <div className='itemInfoTable'>
                <div className='itemInfo'>
                    <h4>Title:</h4>
                    <p>{title}</p>
                </div>
                <div className='itemInfo'>
                    <h4>Category:</h4>
                    <p>{category}</p>
                </div>
                <div className='itemInfo'>
                    <h4>Maunfacturer:</h4>
                    <p>{manufacturer}</p>
                </div>
                <div className='itemInfo'>
                    <h4>Price:</h4>
                    <p>€{price}</p>
                </div>
            </div>
            <div className='itemButtons'>
                <button>Add to Cart</button>
                <button>Reviews</button>
            </div>
        </div>
    )
}
