**Resposta: de `0` a `4` nos dois casos.**

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Isso pode ser facilmente deduzido do algoritmo de `for`:

1. Executar `i = 0` uma vez antes de tudo (begin).
2. Verificar a condição `i < 5`.
3. Caso verdadeira (`true`), executar o corpo do loop `alert(i)`, e em seguida `i++`.

O incremento `i++` é separado do teste da condição (2). Trata-se de outra declaração.

O valor retornado pelo incremento não é utilizado aqui, então não há diferença entre `i++` e `++i`.