importance: 5

---

# Herde de SyntaxError

Crie uma classe `FormatError` que herda da classe nativa `SyntaxError`.

Ela deve suportar as propriedades `message`, `name` e `stack`.

Exemplo de uso:

```js
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (because inherits from SyntaxError)
```
