O resultado é `4`:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

Isso é porque arrays são objetos. Então ambos `shoppingCart` e `fruits` são referências para o mesmo array.

