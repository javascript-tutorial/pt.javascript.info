importance: 5

---

# Adicione toString ao dicionário

Existe um objeto `dictionary`, criado como `Object.create(null)`, para armazenar quaisquer pares `key/value`.

Adicione o método `dictionary.toString()` a ele, que deve retornar uma lista de chaves separadas por vírgula. Seu `toString` não deve aparecer no `for..in` sobre o objeto.

Veja como deve funcionar:

```js
let dictionary = Object.create(null);

*!*
// seu código para adicionar o método dictionary.toString
*/!*

// adiciona alguns dados
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ é uma chave de propriedade normal aqui

// só apple e __proto__ estão no laço
for(let key in dictionary) {
  alert(key); // "apple", depois "__proto__"
}  

// seu toString em ação
alert(dictionary); // "apple,__proto__"
```
