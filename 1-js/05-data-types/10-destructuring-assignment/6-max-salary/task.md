importance: 5

---

# O maior salário

Existe um objeto `salaries`:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
```

Crie a função `topSalary(salaries)` que retorna o nome da pessoa com o maior salário.

- Se `salaries` estiver vazio, deve retornar `null`.
- Se houver mais de uma pessoa com o maior salário, pode retornar qualquer uma delas.

P.S. Use `Object.entries` e desestruturação para percorrer os pares chave/valor.
