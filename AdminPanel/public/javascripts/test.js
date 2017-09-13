var Car = (function () {
    //constructor 
    function Car(engine) {
        this.engine = engine;
        this.e = engine;
    }
    //function 
    Car.prototype.disp = function () {
        console.log("Engine is  :   " + this.engine);
    };
    return Car;
}());
var c = new Car("1111");
c.disp();
console.log(c.engine);
console.log(c instanceof Car);
//# sourceMappingURL=test.js.map