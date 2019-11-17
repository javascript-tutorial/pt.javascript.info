importance: 5

---

# Crie um acumulador new

Crie uma função construtora `Accumulator(startingValue)`.

O objeto que ela cria deve:

- Armazenar o "valor atual" na propriedade `value`. O valor inicial é definido no argumento do construtor `startingValue` .
- O método `read()` deve usar `prompt` para ler um novo número e adicioná-lo ao `value`.

Em outras palavras, a propriedade `value` é a soma de todos os valores digitados pelo usuário com o valor inicial `startingValue`.

Aqui está uma demonstração do código:

```js
let accumulator = new Accumulator(1); // valor inicial 1
accumulator.read(); // adiciona o valor digitado pelo usuário
accumulator.read(); // adiciona o valor digitado pelo usuário
alert(accumulator.value); // apresenta a soma destses valores
```

[demo]
