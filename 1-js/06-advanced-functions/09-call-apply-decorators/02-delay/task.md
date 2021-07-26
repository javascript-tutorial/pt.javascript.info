importance: 5

---

# Atrasando o decorador

Crie um decorador `delay(f, ms)` que atrase cada chamada de `f` por `ms` milissegundos.

Por exemplo:

```js
function f(x) {
  alert(x);
}

// cria encapsuladores
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // imprime "test" depois de 1000ms
f1500("test"); // exibe "test" depois de 1500ms
```

Por outras palavras, `delay(f, ms)` retorna uma variante de `f` "atrasada em `ms`".

No código acima, `f` é uma função com um único argumento, porém a sua solução deve passar todos os argumentos e o `this` do contexto.
