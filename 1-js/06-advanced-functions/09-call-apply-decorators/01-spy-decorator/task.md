importance: 5

---

# Decorador de Espionagem

Cria um decorador `spy(func)` que retorna um embrulhador que guarde todas as chamadas à função na sua propriedade `calls`.

Toda chamada é guardada num vetor de argumentos.

Por exemplo:

```js
function work(a, b) {
  alert( a + b ); // `work` é uma função ou método arbitrário
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
```

Pós-escrito: Este decorador pode ser útil para testes unitários. Sua forma avançada é `sinon.spy` na biblioteca [Sinon.JS](http://sinonjs.org).
