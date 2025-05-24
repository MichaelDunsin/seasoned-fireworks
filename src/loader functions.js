import { ProductData } from "./product data";



const products = ProductData;

export function Wineloader() {
    return products.filter(product => product.category === "Fruit Wine"); 
}

/* 

const products = ProductData()

Here the console is just showing you the internal structure of a promise. You notice that you are seeing a 
promise object instead of your actual array because the promise isn't fulfilled yet. 
You can access the actual array (of 52 items) once the promise is fulfilled using await or .then().

But why do that herer when we can just do it in our main ProductData
*/

export function Bottleloader() {
    return products.filter(product => product.category === "Bottles"); 
}

export function Picnicloader() {
    return products.filter(product => product.category === "Picnic"); 
}

export function Slurpieloader() {
    return products.filter(product => product.category === "Slurpies"); 
}

