'use strict'


/* INDEX 

- Literal Objects
- Contructor Objects, new KeyWord and this KeyWord
- Object.create(Object.protpotype, [options])
- The ES6 class KeyWord
- Object & Property methods
- Getters & Setters
- Proptotypes & Inheritance

*/


//The easiest way of creating object is by using the object literals
var literalCat = {
    name: { first: "Kev", last: "Brozian" },
    color: "jet black",
    speak: function() { return "Literal cat can speak too!" }
};

console.log("The cat created using literal syntax: " + literalCat);

//Another way is to use the constructor function and the new keyword
// The function followed by the "new" keyword is also known as the constructor function

function Cat(color) { /*Just a normal function, not yet a constructor*/
    this.color = color;
}

// The constructor function sets some values for the object referred by the "new" keyword
// These values are set using the "this" keyword
// "this" keyword is nothing but a pointer to an object

var newCat = Cat("black"); /* Without the "new" keyword, there will be no container to point at and hence, "this" will point at the window object */
console.log("Cat function called without new Keyword sets the value of window.color: " + window.color);

// By default it points to the "window" object of the browser
// When used with "new" keyword, "this" keyword points to newly created empty container of the object

newCat = new Cat("black");
console.log("Cat function called with new Keyword creates a new object newCat: " + newCat);

//You can also create object using the Object.create() function

var anotherCat = Object.create(Object.prototype, {
    name: {
        value: "Fluffy",
        enumerable: true,
        writable: true,
        configurable: true,
    },
    color: {
        value: "white",
        enumerable: true,
        writable: true,
        configurable: true,
    }
});

console.log("New cat created using Object.create(), anotherCat: " + anotherCat);
//The constructor function syntax actually does the same thing but it makes it easier to do so

//ES6 introduced the "class" keyword
class ClassCat {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    speak() {
        return "The cat created using class";
    }
}

var classCat = new ClassCat("Tim", "thunder black");
console.log("The class cat is speaking: " + classCat.speak());

// Every property of an object has 4 options: "value", "enumerable", "writable" and "configurable"
// These are called the Property Descriptors
// You can view the property descriptors of any property of an object using

console.log("The property descriptors of anotherCat are: " + Object.getOwnPropertyDescriptor(anotherCat, "name"));

// gives out the property descriptors for the name property of the anotherCat object

// Writable Property
// Decides whether the value option of this property of the object can be changed or not

Object.defineProperty(anotherCat, "name", {writable: false});
console.log("The writable option for the name property of anotherCat has been set to False using the Object.defineProperty() function!");

console.log("Now, I will try to change the name of the cat");
anotherCat.name = "Sib";

// The error will only pop up if 'use strict' is mentioned on top

// You can also use the Object.freeze() function to set the whole object to read-only

// Enumerable Property
// Decides whether the property will be included in iterable funcitons or not
// This means that setting this property to false, will make it not show up in for...in loop, Object.key(), JOSN.stringify() etc.
// However you can still access and change the property like normally

// Configurable Attribute
// This property is just a control for the other two options
// If you set this property to true, you won't be able to change other option of the property
// Exception is for the writable otpion. The writable option can still be changed even if the configurable is set to true
// Yes you won't be able to change the configurable option back to false once you have set it to true
// You also cannot delete the property of the object if you have set the config to true

//Getter for an object
Object.defineProperty(literalCat, 'fullName', {
    get: function() {
        return this.name.first + ' ' + this.name.last
    }
});
console.log("Now, I'm going to call the cat by it's full name using the getter: " + literalCat.fullName);

//Setter for an object
Object.defineProperty(literalCat, 'fullName', {
    set: function(value) {
        var nameParts = value.split(' ');
        this.name.first = nameParts[0];
        this.name.last = nameParts[1];
    }
});

cat.fullName = "Muffin Top";

// Prototypes and Inheritance

// Where to use prototypes?
// Suppose you have the following array

var arr = ["first", "second", "last"];

// Now you could retrieve the last element of the array using

var last = arr[arr.length - 1];

// However what if we wanted to use the follwing syntax to fetch the last element, whatever it maybe

var last = arr.last;

// Arrays don't have a last property so this won't work
// One way around is to create a getter

Object.defineProperty(arr, "last", {
    get: function(){
        return arr[arr.length-1];
    }
})

var last = arr.last;

// This will work, but if then if you create a new array, the last property will disappear
// We can solve this by adding the getter to all the prototypes created by the Array Object

Object.defineProperty(Array.prototype, "last", {
    get: function() {
        return this[this.length-1];
    }
});

var arr2 = ["some", "new", "array"];
console.log(arr2.last);

// A prototype is a property that exists in every function in JavaScript

var newFunc = function() {}
console.log(newFunc.prototype);

// However an object doesn't have a prototype property, it has a __proto__ property

console.log(literalCat.__proto__);


/* A function's prototype is the object instance that will become the prototype for all objects created using this function as a constructor */
/* An object's prototype is the object instance from which the object is inherited */

// Examples

function Cat(name, color) {
    this.name = name;
    this.color = color;
}

var fluffy = new Cat("Fluffy", "White");

console.log(Cat.prototype);
console.log(fluffy.__proto__);

// The fluffy.__proto__ is just a pointer to the Cat.prototype and they are totally the same

console.log(Cat.prototype === fluffy.__proto__); //true

// So if we went ahead and actually changed/added to the Cat.prototype, it will reflect in any of the object instances created using this prototype

Cat.prototype.age = 3;

console.log(Cat.prototype.age) //3
console.log(fluffy.__proto__.age) //3

var muffin = new Cat("Muffin", "Yellow");
console.log(muffin.__proto__.age) //3

/* Important to understand is that the JavaScript object will look for a property in it's prototype if it is not found in itself */