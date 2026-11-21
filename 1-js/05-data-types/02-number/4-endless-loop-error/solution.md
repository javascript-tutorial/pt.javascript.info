Isso acontece porque `i` nunca vai ser exatamente igual a `10`.

Rode o código para ver os valores *reais* de `i`:

```js run
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
```

Nenhum deles é exatamente `10`.

Esse tipo de coisa acontece por causa da perda de precisão ao somar frações como `0.2`.

Conclusão: evite verificações de igualdade ao trabalhar com frações decimais.
