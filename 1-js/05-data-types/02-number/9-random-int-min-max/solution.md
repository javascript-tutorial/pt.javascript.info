# A solução simples porém errada

A solução mais simples, porém errada seria gerar um valor entre `min` e `max` e arredondá-lo:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

A função funciona, mas é incorrea. A probabilidade de obter os valores extremos `min` e `max` é duas vezes menor do que qualquer outro.

Se você executar o exemplo acima várias vezes, você facilmente perceberia que `2` aparece com maior frequência.

Isso acontece porque `Math.round()` recebe números aleatórios no intervalo `1..3` e arredonda-os da seguinte maneira:

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

Agora podemos ver claramente que `1` recebe duas vezes menos valores do que `2`. E o mesmo com `3`.

# A solução correta

Existem várias soluções corretas para a tarefa. Uma delas é ajustar as bordas do intervalo. Para garantir os mesmos intervalos, podemos gerar valores entre `0.5 e 3.5`, assim adicionando as probailidades requeridas aos extremos:

```js run
*!*
function randomInteger(min, max) {
  // agora rand vai de  (min-0.5) a (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Uma maneira alternativa seria usar `Math.floor` para um número aleatório entre `min` e `max+1`:

```js run
*!*
function randomInteger(min, max) {
  // aqui rand está entre min e (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Agora todos intervalos estão mapeados dessa forma:

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

Todos intervalos têm o mesmo tamanho, fazendo a distribuição final uniforme.
