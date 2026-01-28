A resposta: `1`.

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

Cada iteração do laço diminui `i` em `1`. A verificação `while(i)` para o laço quando `i = 0`.

Portanto, os passos do laço formam a seguinte sequência ("laço desenrolado"):

```js
let i = 3;

alert(i--); // mostra 3, diminui i para 2

alert(i--) // mostra 2, diminui i para 1

alert(i--) // mostra 1, diminui i para 0

// fim, a verificação while(i) para o laço
```
