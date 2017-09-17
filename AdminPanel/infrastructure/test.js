"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Person = (function () {
    function Person() {
        this.a = 'test';
        this.b = 1234;
    }
    Person.prototype.hello = function () {
        console.log(this.a + ' ' + this.b);
    };
    return Person;
}());
//# sourceMappingURL=test.js.map