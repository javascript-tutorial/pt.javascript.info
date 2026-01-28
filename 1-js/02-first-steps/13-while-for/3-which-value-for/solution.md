**A resposta: de `0` a `4` em ambos os casos.**

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Isso pode ser facilmente deduzido do algoritmo do `for`:

1. Executa uma vez `i = 0` antes de tudo (begin).
2. Verifica a condição `i < 5`
3. Se `true` -- executa o corpo do laço `alert(i)`, e depois `i++`

O incremento `i++` é separado da verificação da condição (2). É apenas outra instrução.

O valor retornado pelo incremento não é usado aqui, então não há diferença entre `i++` e `++i`.
