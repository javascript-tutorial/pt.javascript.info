
Qualquer `setTimeout` só vai rodar depois que o código atual tiver terminado.

O `i` vai ser o último valor: `100000000`.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// assuma que o tempo para executar essa função é >100ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
