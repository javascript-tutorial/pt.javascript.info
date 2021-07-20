importance: 5

---

# Atrasando o decorador

Criar um decorador `delay(f, ms)` que atrasa cada chamada de `f` por `ms` milissegundos.

Por exemplo:

```js
function f(x) {
  alert(x);
}

// cria encapsuladores
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // imprima "test" depois 1000ms
f1500("test"); // imprima "test" depois 1500ms
```

Em outras palavras, `delay(f, ms)` retorna uma variante de `f` "atrasada em `ms`".

No código acima, `f` é uma função de um único argumento, porém sua solução deve passar todos argumentos e o contexto `this`.
