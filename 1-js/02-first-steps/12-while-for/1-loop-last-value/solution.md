Resposta: `1`.

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

Cada iteração do loop decresce `i` em `1`. O teste `while(i)` interrompe o loop quando `i = 0`.

Portanto, as etapas do loop formam a seguinte sequência ("loop desenrolado"):

```js
let i = 3;

alert(i--); // exibe 3, decresce i para 2

alert(i--) // exibe 2, decresce i para 1

alert(i--) // exibe 1, decresce i para 0

// pronto, o teste while(i) interrompe o loop
```
