O resultado é `4`:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

Isso acontece porque arrays são objetos. Então tanto `shoppingCart` quanto `fruits` são referências para o mesmo array.

