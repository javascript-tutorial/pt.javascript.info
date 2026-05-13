# Buscar usuários do GitHub

Crie uma função assíncrona `getUsers(names)` que receba um array de logins do GitHub, busque os usuários na API do GitHub e retorne um array com os dados desses usuários.

A URL do GitHub com as informações de um certo `USERNAME` é: `https://api.github.com/users/USERNAME`.

Há um exemplo de teste no sandbox.

Detalhes importantes:

1. Deve haver uma requisição `fetch` por usuário.
2. As requisições não devem esperar umas pelas outras — assim os dados chegam o mais rápido possível.
3. Se alguma requisição falhar, ou se o usuário não existir, a função deve retornar `null` na posição correspondente do array.