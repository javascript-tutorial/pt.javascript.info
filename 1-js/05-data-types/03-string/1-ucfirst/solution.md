Não podemos "substituir" o primeiro caractere, pois strings em JavaScript são imutáveis.

Mas podemos fazer uma nova string baseando-se na existente, com o primeiro caractere em maiúsculo:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Entretanto, tem um pequeno problema. Se `str` está vazio, então `str[0]` é `undefined`, e como `undefined` não possui o método `toUpperCase()` teremos um erro.

A maneira mais fácil de contornar é adicionar um teste para string vazia, algo assim:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
