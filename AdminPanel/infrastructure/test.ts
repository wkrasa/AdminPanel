import * as express from 'express';

class Person {
    a: string = 'test';
    b: number = 1234;
    hello(): void {
        console.log(this.a + ' ' + this.b);
    }
}