Para encontrar todos os anagramas, vamos dividir cada palavra em letras e classificá-las. Quando classificados por letras, todos os anagramas são iguais.

Por exemplo:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Usaremos as variantes ordenadas por letras como chaves de mapp para armazenar apenas um valor por cada chave.

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // divide a palavra por letras, odene-as e junte-as devolta
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

Ordenação por letras é feita pelas chamadas encadeadas na linha `(*)`.

Por conveniência, vamos dividi-lo em várias linhas:

```js
let sorted = arr[i] // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

Duas palavras diferentes `'PAN'` e `'nap'` recebem a mesma forma ordenada por letras `'anp'`.

A próxima linha insere a palavra no map:

```js
map.set(sorted, word);
```

Se alguma vez encontrarmos uma palavra da mesma forma ordenada por letras novamente, ela sobrescreverá o valor anterior com a mesma chave no mapa. Portanto, sempre teremos no máximo uma palavra por letra.

Por fim `Array.from(map.values())` pega um iterável sobre os valores do map (não precisamos das chaves no resultado) e retorna um array deles.

Aqui nós também poderíamos usar um simples object em vez do `Map`, porque as chaves são strings.

É assim que a solução pode parecer:

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
