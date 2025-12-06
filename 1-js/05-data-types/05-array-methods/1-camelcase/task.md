importance: 5

---

# Mude border-left-width para borderLeftWidth

Escreva uma função `camelize(str)` que mude as palavras separadas por traços como "my-short-string" para palavras em camelCase "myShortString".

Ou seja: remova todos os traços, cada palavra depois do traço precisa estar em maiúsculo.

Exemplos:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

P.S. Dica: use `split` para separar a string em um array, transforme-os e os junte de volta usando `join`.
