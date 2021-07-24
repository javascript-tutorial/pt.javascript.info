importance: 5

---

# Decorador Spy (espião)

Crie um decorador `spy(func)` que deve retornar um encapsulador que guarde todas chamadas de uma função na sua propriedade `calls`.

Todas chamadas são guardadas como um array de argumentos.

Por exemplo:

```js
function work(a, b) {
  alert( a + b ); // work é uma função ou método arbitrário
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

P.S. Que o decorador é algumas vezes útil para teste unitário. Sua forma avançada é `sinon.spy` na biblioteca [Sinon.JS](http://sinonjs.org).
