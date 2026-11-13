importance: 5

---

# Exército de funções

O código a seguir cria um array de `shooters`.

Cada função deveria exibir seu número. Mas algo está errado...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // cria uma função shooter,
      alert( i ); // que deveria mostrar seu número
    };
    shooters.push(shooter); // e a adiciona ao array
    i++;
  }

  // ...e retorna o array de shooters
  return shooters;
}

let army = makeArmy();

*!*
// todos os shooters mostram 10 em vez de seus números 0, 1, 2, 3...
army[0](); // 10 do shooter número 0
army[1](); // 10 do shooter número 1
army[2](); // 10 ...e assim por diante.
*/!*
```

Por que todos os shooters mostram o mesmo valor? 

Corrija o código para que eles funcionem como pretendido.

