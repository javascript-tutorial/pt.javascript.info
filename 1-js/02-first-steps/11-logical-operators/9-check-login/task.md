importance: 3

---

# Verifique o login

Escreva o código que pede um login com o `prompt`.

Se o visitante inserir `"Admin"`, então `prompt` para uma senha, se a entrada for uma linha vazia ou `key: Esc` -- mostre "Canceled.", Se for outra string - então mostre "eu don conheço você ".

A senha é verificada da seguinte forma:

- Se for igual a "TheMaster", então mostre "Welcome!",
- Outra string - mostra "Senha incorreta",
- Para uma sequência vazia ou entrada cancelada, mostre "Cancelado".

O esquema:

![](ifelse_task.png)

Por favor use blocos `if` aninhados. Observe a legibilidade geral do código.

Dica: passar uma entrada vazia para um prompt retorna uma string vazia `''`. Pressionando a `key:ESC` durante um prompt retorna `null`.

[demo]
