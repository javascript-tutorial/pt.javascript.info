Para encontrar todos os anagramas, vamos dividir cada palavra em letras e ordená-las. Quando ordenadas por letras, todos os anagramas são iguais.

Por exemplo:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Vamos usar as variantes ordenadas por letras como chaves de mapa para armazenar apenas um valor para cada chave:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // Divida a palavra em letras, ordene-as e junte novamente.
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

A ordenação por letras é feita pela cadeia de chamadas na linha `(*)`.

Para maior clareza, vamos dividi-la em várias linhas:

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

Duas palavras diferentes, `'PAN'` e `'nap'`, recebem a mesma forma ordenada por letras, `'anp'`.

A próxima linha coloca a palavra no mapa:

```js
map.set(sorted, word);
```

Se encontrarmos novamente uma palavra com a mesma forma ordenada por letras, ela irá sobrescrever o valor anterior com a mesma chave no mapa. Portanto, sempre teremos no máximo uma palavra por forma de letras.

No final, `Array.from(map.values())` cria um iterável sobre os valores do mapa (não precisamos das chaves no resultado) e retorna um array com eles.

Aqui também poderíamos usar um objeto simples em vez do `Map`, porque as chaves são strings.

É assim que a solução pode ser implementada:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
