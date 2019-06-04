
Tente executá-lo:

```js run
let str = "Olá";

str.test = 5; // (*)

alert(str.test);
```

<<<<<<< HEAD
Pode haver dois tipos de resultado:
1. `undefined`
2. Um erro.
=======
Depending on whether you have `use strict` or not, the result may be:
1. `undefined` (no strict mode)
2. An error (strict mode).
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

Por quê? Vamos examinar o que está acontecendo na linha`(*)`:

<<<<<<< HEAD
1. Quando a propriedade de `str` é acessada, um "invólucro de objeto" é criado.
2. A operação com a propriedade é realizada nela. Então, o objeto obtém a propriedade `test`.
3. A operação é concluída e o "invólucro de objeto" desaparece.

Então, na última linha, `str` não tem nenhum traço da propriedade. Um novo invólucro de objeto para cada operação de objeto em uma string.

Alguns navegadores podem decidir limitar ainda mais o programador e não permitir a atribuição de propriedades aos primitivos. É por isso que na prática também podemos ver erros na linha `(*)`. Porém é um pouco fora do escopo da especificação.
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears.

So, without strict mode, in the last line `str` has no trace of the property.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

**Este exemplo mostra claramente que os primitivos não são objetos.**

<<<<<<< HEAD
Eles simplesmente não podem armazenar dados.

Todas as operações de propriedade/método são executadas com a ajuda de objetos temporários.

=======
They can't store additional data.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
