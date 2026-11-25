

1. Ou use uma função invólucro (wrapper), uma *arrow function* para ficar conciso:

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```

    Agora ela pega `user` das variáveis externas e chama o método da forma normal.

2. Ou crie uma função parcial a partir de `user.login`, que usa `user` como contexto e tem o primeiro argumento correto:


    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```
