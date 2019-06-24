importância: 5

---

# Traduza border-left-width para borderLeftWidth

Escreva a função `camelize (str)` que altera palavras separadas por traço como "my-short-string" para "myShortString" em camel-cased.

Ou seja: remove todos os traços, cada palavra após o traço se torna maiúscula.

Exemplos:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

P.S. Dica: use `split` para dividir a string em um array, transformá-lo e use `join` para voltar a string.
