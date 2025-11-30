Respostas: **não, sim**.

- Não, na string `subject:Java` o padrão não retorna nada. O padrão `pattern:[^script]` significa "qualquer caractere exceto os dados". Dessa forma, a regex procura por `"Java"`, seguido de qualquer caractere (exceto os do conjunto), mas encontra apenas o fim da string.

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```

- Sim, já que o padrão `pattern:[^script]` reconhece o caractere `"S"` que não é nenhum dos caracteres `pattern:script`. Como a regex é sensível a capitalização (*case-sensitive*, sem a opção `pattern:i`), ela trata `"S"` e `"s"` como caracteres diferentes.

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
