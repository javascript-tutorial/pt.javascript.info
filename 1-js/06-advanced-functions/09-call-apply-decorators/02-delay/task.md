importance: 5

---

# Decorador de Atraso

Crie um decorador `delay(f, ms)` que atrasa cada chamada de `f` por `ms` milissegundos.

Por exemplo:

```js
function f(x) {
  alert(x);
}

// criar funções envolventes
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("teste"); // exibe "teste" após 1000ms
f1500("teste"); // exibe "teste" após 1500ms
```

Por outras palavras, `delay(f, ms)` retorna uma variante "atrasada por `ms`" de `f`.

No código acima, `f` é uma função de um único argumento, mas a sua solução deve passar todos os argumentos e o contexto de `this`.
