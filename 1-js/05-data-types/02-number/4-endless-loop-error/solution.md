É porque `i` nunca será igual a `10`.

Execute para ver os valores *reais* de `i`:

```js run
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
```

Nenhum deles é exatamente `10`.

Esse tipo de coisas acontecem por causa da perda de precisão ao adicionar frações como `0.2`.

Conclusão: evite checar igualdade quando trabalhando com frações decimais.
