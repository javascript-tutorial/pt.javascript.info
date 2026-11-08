
O método pode pegar todas as chaves enumeráveis usando `Object.keys` e exibir a lista delas.

Para tornar o `toString` não enumerável, vamos defini-lo usando um descritor de propriedade. A sintaxe do `Object.create` nos permite fornecer um objeto com descritores de propriedade como segundo argumento.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // define a propriedade toString
    value() { // o valor é uma função
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple e __proto__ estão no laço
for(let key in dictionary) {
  alert(key); // "apple", depois "__proto__"
}  

// lista de propriedades separadas por vírgula, via toString
alert(dictionary); // "apple,__proto__"
```

Quando criamos uma propriedade usando um descritor, seus sinalizadores são `false` por padrão. Então, no código acima, `dictionary.toString` é não enumerável.

Veja o capítulo [](info:property-descriptors) pra revisar.
