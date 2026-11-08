# A solução simples, mas errada

A solução mais simples, porém errada, seria gerar um valor de `min` a `max` e arredondá-lo:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

A função funciona, mas está incorreta. A probabilidade de obter os valores extremos `min` e `max` é metade da probabilidade de obter qualquer outro valor.

Se você rodar o exemplo acima muitas vezes, vai perceber facilmente que o `2` aparece com mais frequência.

Isso acontece porque `Math.round()` pega números aleatórios do intervalo `1..3` e os arredonda da seguinte forma:

```js no-beautify
valores de 1    ... até 1.4999999999  viram 1
valores de 1.5  ... até 2.4999999999  viram 2
valores de 2.5  ... até 2.9999999999  viram 3
```

Agora podemos ver claramente que `1` recebe metade dos valores que `2` recebe. E o mesmo vale para `3`.

# A solução correta

Existem muitas soluções corretas para essa tarefa. Uma delas é ajustar os limites do intervalo. Para garantir intervalos iguais, podemos gerar valores de `0.5 a 3.5`, adicionando assim as probabilidades necessárias às extremidades:

```js run
*!*
function randomInteger(min, max) {
  // agora rand vai de (min-0.5) a (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Uma forma alternativa seria usar `Math.floor` para um número aleatório de `min` a `max+1`:

```js run
*!*
function randomInteger(min, max) {
  // aqui rand vai de min a (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Agora todos os intervalos são mapeados desta forma:

```js no-beautify
valores de 1  ... até 1.9999999999  viram 1
valores de 2  ... até 2.9999999999  viram 2
valores de 3  ... até 3.9999999999  viram 3
```

Todos os intervalos têm o mesmo tamanho, o que torna a distribuição final uniforme.
