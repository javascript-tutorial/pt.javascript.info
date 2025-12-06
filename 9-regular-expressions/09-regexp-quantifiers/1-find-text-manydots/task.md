importance: 5

---

# Como encontrar reticências "..." ?

Crie uma expressão regular que reconhece reticências: 3 (ou mais?) pontos consecutivos.

Seu teste:

```js
let regexp = /sua expressão/g;
alert( "Olá!... Como está?.....".match(regexp) ); // ..., .....
```
