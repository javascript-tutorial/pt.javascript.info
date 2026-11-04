importance: 5

---

# Finally, ou só o código?

Compare os dois trechos de código.

1. O primeiro usa `finally` para executar o código depois do `try...catch`:

    ```js
    try {
      faz o trabalho
    } catch (err) {
      trata os erros
    } finally {
    *!*
      limpa o espaço de trabalho
    */!*
    }
    ```
2. O segundo trecho coloca a limpeza logo depois do `try...catch`:

    ```js
    try {
      faz o trabalho
    } catch (err) {
      trata os erros
    }

    *!*
    limpa o espaço de trabalho
    */!*
    ```

Com certeza precisamos da limpeza depois do trabalho, não importa se houve um erro ou não.

Existe alguma vantagem em usar o `finally` aqui, ou os dois trechos de código são equivalentes? Se houver essa vantagem, dê um exemplo de quando isso importa.
