importance: 5

---

# Soma das propriedades

Existe um objeto `salaries` com um número qualquer de salários.

Escreva a função `sumSalaries(salaries)` que retorna a soma de todos os salários, usando `Object.values` e o laço `for..of`.

Se `salaries` estiver vazio, o resultado deve ser `0`.

Por exemplo:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```

