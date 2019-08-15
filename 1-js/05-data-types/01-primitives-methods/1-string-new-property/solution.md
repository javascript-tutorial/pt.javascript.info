
Tente executá-lo:

```js run
let str = "Olá";

str.test = 5; // (*)

alert(str.test); 
```

Pode haver dois tipos de resultado:
1. `undefined`
2. Um erro.

Por quê? Vamos examinar o que está acontecendo na linha`(*)`:

1. Quando a propriedade de `str` é acessada, um "invólucro de objeto" é criado.
2. A operação com a propriedade é realizada nela. Então, o objeto obtém a propriedade `test`.
3. A operação é concluída e o "invólucro de objeto" desaparece.

Então, na última linha, `str` não tem nenhum traço da propriedade. Um novo invólucro de objeto para cada operação de objeto em uma string.

Alguns navegadores podem decidir limitar ainda mais o programador e não permitir a atribuição de propriedades aos primitivos. É por isso que na prática também podemos ver erros na linha `(*)`. Porém é um pouco fora do escopo da especificação.

**Este exemplo mostra claramente que os primitivos não são objetos.**

Eles simplesmente não podem armazenar dados.

Todas as operações de propriedade/método são executadas com a ajuda de objetos temporários.

