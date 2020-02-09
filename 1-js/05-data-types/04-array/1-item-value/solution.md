O resultado é `4`:


```js run
let fruits = ["Maçã", "Pêra", "Laranja"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

Isto, porque *arrays* são objetos. Assim ambas `shoppingCart` e `fruits` são referências para o mesmo *array*.

