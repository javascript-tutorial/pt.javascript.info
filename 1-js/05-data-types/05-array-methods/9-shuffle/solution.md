A solução simples poderia ser:

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

Isso funciona de certa forma, porque `Math.random() - 0.5` é um número aleatório que pode ser positivo ou negativo, então a função de ordenação reordena os elementos aleatoriamente.

Mas como a função de ordenação não deve ser usada dessa maneira, nem todas as permutações têm a mesma probabilidade.

Por exemplo, considere o código abaixo. Ele roda `shuffle` 1000000 vezes e conta as aparências de todos os resultados possíveis:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// contagens de aparências para todas as permutações possíveis
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// mostra as contagens de todas as permutações possíveis
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Um exemplo de resultado (para V8, julho de 2017):

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

Nós podemos ver claramente o viés: `123` e `213` aparecem com muito mais freqüência que outros.

O resultado do código pode variar entre os mecanismos JavaScript, mas já podemos ver que a abordagem não é confiável.

Por que isso não funciona? De um modo geral, `sort` é uma "caixa preta": lançamos um array e uma função de comparação e esperamos que o array seja ordenado. Mas, devido à total aleatoriedade da comparação, a caixa preta enlouquece e a maneira como ela enlouquece depende da implementação concreta que difere entre os motores.

Existem outras boas maneiras de fazer a tarefa. Por exemplo, existe um ótimo algoritmo chamado [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). A ideia é percorrer o array na ordem inversa e trocar cada elemento por um aleatório antes dele:

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // índice aleatório de 0 a i
    [array[i], array[j]] = [array[j], array[i]]; // trocar elementos
  }
}
```

Vamos testar da mesma maneira:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// contagens de aparências para todas as permutações possíveis
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// mostra as contagens de todas as permutações possíveis
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

A saída do exemplo:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

Parece bom agora: todas as permutações aparecem com a mesma probabilidade.

Além disso, em termos de desempenho, o algoritmo de Fisher-Yates é muito melhor, não há sobrecarga de "classificação".
