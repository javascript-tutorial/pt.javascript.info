
Tente executá-lo:

```js run
let str = "Olá";

str.test = 5; // (*)

alert(str.test);
```

Pode haver dois tipos de resultado:
1. `undefined` (não é string)
2. Um erro. (modo strict)

Por quê? Vamos examinar o que está acontecendo na linha`(*)`:

1. Quando a propriedade de `str` é acessada, um "invólucro de objeto" é criado.
2. No modo strict, escrever nela é um erro.
3. Caso contrário, a operação com a propriedade é continuada, o objeto recebe a propriedade `test`, mas após isso o "invólucro de objeto" desaparece, então na última linha `str` não tem nenhum rastro da propriedade..

Então, sem o modo strict, na última linha `str` não tem rastros da propriedade.

**Este exemplo mostra claramente que os primitivos não são objetos.**

Eles não podem armazenar dados adicionais.
