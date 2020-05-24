
# Encadeamento Opcional '?.'

[recent browser="new"]

O encadeamento opcional `?.` é um jeito à prova de erro de acessar propriedades encapsuladas dentro de um objeto, mesmo se tal propriedade não existir.

## O problema 

Se você acabou de começar a ler o tutorial e aprender JavaScript, talvez o problema ainda não tenha afetado você, mas é um problema bem comum.

Por exemplo, alguns de nossos usuários possuem um endereço, mas alguns deles ainda não o especificaram. Portanto nós não podemos ler `user.address.street` de forma segura:

```js run
let user = {}; // o usuário não possui um endereço

alert(user.address.street); // Erro!
```

Ou, no desenvolvimento web, nós gostaríamos de obter uma informação sobre um elemento da página, mas pode ser que ele não exista:

```js run
// Erro se o resultado de querySelector(...) é null
let html = document.querySelector('.my-element').innerHTML;
```

Antes que `?.` aparecesse na linguagem, o operador `&&` era usado para dar um jeito nisso.
Por exemplo:

```js run
let user = {}; // o usuário ainda não possui um endereço

alert( user && user.address && user.address.street ); // undefined (sem erro)
```

utilizar o AND por todo o caminho garante que todos os componentes existam, porém é trabalhoso escrever tudo isso.

## Encadeamento opcional

O encadeamento opcional `?.` acaba com a avaliação e retorna `undefined` se a parte anterior de `?.` é `undefined` ou `null`.

Ao longo deste artigo, por uma questão de tempo, diremos que algo "existe" se não é `null` e não é `undefined`.


Aqui está a forma segura de acessar `user.address.street`:

```js run
let user = {}; // o usuário não possui um endereço

alert( user?.address?.street ); // undefined (sem erro)
```

Reading the address with `user?.address` works even if `user` object doesn't exist:
Ler o endereço com `user?.address` funciona mesmo se o objeto `user` não existir:

```js run
let user = null;

alert( user?.address ); // undefined

alert( user?.address.street ); // undefined
alert( user?.address.street.anything ); // undefined
```

Observação: A sintaxe `?.` funciona exatamente onde ela é colocada, não adiante.

Nas últimas duas linhas a avaliação para imediatamente após `user?.`, não chegando a acessar as seguintes propriedades. Mas se `user` de fato existir, então as propriedades seguintes, como `user.address` devem existir.

```warn header="Não abuse do encadeamento opcional"
Nós devemos usar `?.` apenas onde é possível ter algo que não existe.

Por exemplo, se de acordo com a nossa lógica de código o objeto `user` existe, porém `address` é opcional, então seria melhor utilizar `user.address?.street`.

Portanto, se `user` estiver indefinido devido a um erro, saberemos e o corrigiremos. Caso contrário, os erros poderão ser silenciados onde não forem apropriados, e assim se tornando mais difíceis de debugar.
```

```warn header="A variável anterior a `?.` deve existir"
Se não existe a variável `user`, então `user?.anything` causa um erro:

```js run
// ReferenceError: user não é definido
user?.address;
```
O encadeamento opcional apenas testa por `null/undefined`, não interfere em nenhuma outra mecânica da linguagem.

## Curto-circuito

Como dito anteriormente, o `?.` interrompe imediatamente ("curto-circuito") a avaliação se a parte esquerda não existir.

Então, se tiver qualquer outra chamada de função ou efeito colateral a seguir, serão ignorados:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // nada acontece

alert(x); // 0, valor não incrementado
```

## Outros casos: ?.(), ?.[]

O encadeamento opcional `?.` não é um operador, mas uma construção especial de sintaxe, que também funciona com funções e colchetes.

Por exemplo, `?.()` é usado para chamar uma função que possa não existir.

No código a seguir, alguns usuários possuem o método `admin`, e alguns não:

```js run
let user1 = {
  admin() {
    alert("Eu sou admin");
  }
}

let user2 = {};

*!*
user1.admin?.(); // Eu sou admin
user2.admin?.();
*/!*
```

Aqui, nas duas linhas, primeiro usamos o ponto `.` para acessar a propriedade `admin`, porque o objeto usuário deve existir, portanto é uma leitura segura.

Então `?.()` verifica a parte esquerda: se o usuário existe, então é executado (no caso `user1`). Caso contrário (no caso `user2`) a avaliação é interrompida sem erros.

A sintaxe `?.[]` também funciona, se nós queremos utilizar colchetes `[]` para acessar propriedades ao invés do ponto `.`. Similarmente aos casos anteriores, nos permite acessar de forma segura a propriedade de um objeto que possa não existir.

```js run
let user1 = {
  firstName: "John"
};

let user2 = null; // Imagine, nós não pudemos autorizar o usuário

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

Também podemos usar `?.` com `delete`:

```js run
delete user?.name; // deleta user.name se o usuário existe
```

```warn header="Nós podemos usar `?.` para ler e deletar de forma segura, mas não para escrever"
O encadeamento opcional `?.` não possui utilidade ao lado esquerdo de uma atribuição:

```js run
// A idéia do código a seguir é a de escrever user.name, se o usuário existir

user?.name = "John"; // Erro, não funciona
// porque é avaliado para undefined = "John"
```

## Resumo

A sintaxe `?.` possui 3 formas:

1. `obj?.prop` -- retorna `obj.prop` se `obj` existe, caso contrário `undefined`.
2. `obj?.[prop]` -- retorna `obj[prop]` if `obj` existe, caso contrário `undefined`.
3. `obj?.method()` -- chama `obj.method()` if `obj` existe, caso contrário retorna `undefined`.

Como podemos ver, todas as formas são bem diretas e simples de usar. O `?.` verifica se a parte esquerda é `null/undefined` e permite que a avaliação prossiga caso contrário.

Uma cadeia de `?.` permite um acesso seguro a propriedades encapsuladas dentro de um objeto.

Mesmo assim, devemos usar `?.` com cuidado, apenas se é possível que a parte esquerda não exista.

Para que não tenhamos erros ocultados, caso aconteçam.
