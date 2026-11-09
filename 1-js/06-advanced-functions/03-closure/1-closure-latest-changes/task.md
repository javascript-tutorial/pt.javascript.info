importance: 5

---

# Uma função pega as mudanças mais recentes?

A função sayHi usa uma variável externa name. Quando a função roda, qual valor ela vai usar?

```js
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // o que vai mostrar: "John" ou "Pete"?
```

Situações assim são comuns tanto no desenvolvimento para navegador quanto no lado do servidor. Uma função pode ser agendada para executar depois de ser criada, por exemplo, após uma ação do usuário ou uma requisição de rede.

Então, a pergunta é: ela pega as mudanças mais recentes?
