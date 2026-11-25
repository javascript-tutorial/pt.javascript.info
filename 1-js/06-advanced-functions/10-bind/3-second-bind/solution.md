A resposta: **John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

O objeto exótico [função vinculada](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) retornado por `f.bind(...)` lembra o contexto (e os argumentos, se fornecidos) só no momento da criação.

Uma função não pode ser revinculada.
