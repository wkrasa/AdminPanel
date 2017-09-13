interface IDisp {
    disp(): void;
}

class Car implements IDisp {
    //field 
    engine: string;
    private e: string;
    //constructor 
    constructor(engine: string) {
        this.engine = engine;
        this.e = engine;
    }

    //function 
    disp(): void {
        console.log("Engine is  :   " + this.engine)
    }
}

var c = new Car("1111");
c.disp();
console.log(c.engine);
console.log(c instanceof Car);