A solução simples pode ser:

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

O código acima funciona porque `Math.random() - 0.5` é um número aleatório que pode ser positivo ou negativo, então a função de ordenação reordena os elementos aleatoriamente.

Mas porque a função de ordenação não deve ser usada dessa maneira, nem todas as permutações têm a mesma probabilidade.

Por exemplo, considere o código abaixo. Ele executa `shuffle` 1000000 vezes e conta quantas foram as aparições de todos os resultados possíveis:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// contagem de aparições de todos as permutações possíveis
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

// mostra a contagem de aparições de todos as permutações possíveis
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Um exemplo do resultado (for V8, July 2017):

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

Podemos ver claramente: `123` e `213` aparece muito mais vezes do que os outros.

O resultado do código pode variar entre as engines do JavaScript, mas já podemos ver que essa proposta não é confiável.

Por que não? Falando no geral, `sort` é uma "caixa preta": entregamos um array e uma função de comparação para ele e esperamos que o array seja ordenado. Porém, devido á aleatoriariedade total da comparação a caixa preta "enlouquece", e como exatamente ele "enlouquece" depende da implementação concreta que diferencia entre engines.

Há outras formas melhores para fazer essa atividade. Por exemplo, existe um ótimo algoritmo chamado [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). A idéia é percorrer o array na ordem inversa e trocar cada elemento por um aleatório antes dele:

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // index aleatório de 0 á i

    // troca os elementos do array[i] e do array[j]
    // nós usamos a sintaxe "atribuição de desestruturação" para conseguir isso
    // você vai encontrar mais detalhes sobre essa sintaxe em capítulos posteriores
    // também pode ser escrito dessa forma:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

Vamos testá-lo:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// contagem de aparições de todos as permutações possíveis
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

// mostra a contagem de aparições de todos as permutações possíveis
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

O resultado do exemplo:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

Parece bom agora: todas as permutações aparecem com a mesma probabilidade.

Além disso, em termos de performance, o algoritmo Fisher-Yates é muito melhor, não há sobrecarga de ordenação.
