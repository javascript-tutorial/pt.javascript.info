
# Encadeamento opcional '?.'

[recent browser="new"]

O encadeamento opcional `?.` é uma forma segura de acessar propriedades aninhadas de objetos, mesmo que uma propriedade intermediária não exista.

## O problema da "propriedade inexistente"

Se você acabou de começar a ler o tutorial e aprender JavaScript, talvez ainda não tenha se deparado com esse problema, mas ele é bastante comum.

Por exemplo, digamos que temos objetos `user` com informações sobre nossos usuários.

A maioria dos usuários tem endereço na propriedade `user.address`, com a rua em `user.address.street`, mas alguns não forneceram essa informação.

Nesse caso, quando tentamos obter `user.address.street` e o usuário não tem endereço, recebemos um erro:

```js run
let user = {}; // um usuário sem a propriedade "address"

alert(user.address.street); // Erro!
```

Esse é o resultado esperado. O JavaScript funciona assim. Como `user.address` é `undefined`, tentar acessar `user.address.street` resulta em erro.

Em muitos casos práticos, preferiríamos obter `undefined` em vez de um erro (significando "sem rua").

...e outro exemplo. No desenvolvimento web, podemos obter um objeto correspondente a um elemento da página usando um método especial, como `document.querySelector('.elem')`, que retorna `null` quando o elemento não existe.

```js run
// document.querySelector('.elem') é null se não houver elemento
let html = document.querySelector('.elem').innerHTML; // erro se for null
```

Novamente, se o elemento não existir, obteremos um erro ao acessar a propriedade `.innerHTML` de `null`. Em alguns casos, quando a ausência do elemento é algo normal, gostaríamos de evitar o erro e simplesmente aceitar `html = null` como resultado.

Como podemos fazer isso?

A solução óbvia seria verificar o valor usando `if` ou o operador condicional `?` antes de acessar sua propriedade, assim:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

Funciona, sem erro... Mas é bastante inelegante. Como você pode ver, `"user.address"` aparece duas vezes no código.

Veja como ficaria para `document.querySelector`:

```js run
let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
```

Percebemos que a busca pelo elemento `document.querySelector('.elem')` é chamada duas vezes. Não é ideal.

Para propriedades mais profundamente aninhadas, fica ainda mais feio, pois são necessárias mais repetições.

Por exemplo, para obter `user.address.street.name` de forma similar:

```js
let user = {}; // usuário sem endereço

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

Isso é horrível — pode ser difícil até de entender.

Existe uma forma um pouco melhor de escrever isso, usando o operador `&&`:

```js run
let user = {}; // usuário sem endereço

alert( user.address && user.address.street && user.address.street.name ); // undefined (sem erro)
```

Usar `&&` em todo o caminho até a propriedade garante que todos os componentes existam (caso contrário, a avaliação para), mas ainda não é o ideal.

Como você pode ver, os nomes das propriedades ainda aparecem duplicados no código. Por exemplo, `user.address` aparece três vezes no código acima.

Por isso, o encadeamento opcional `?.` foi adicionado à linguagem. Para resolver esse problema de vez!

## Encadeamento opcional

O encadeamento opcional `?.` interrompe a avaliação se o valor antes de `?.` for `undefined` ou `null` e retorna `undefined`.

**Daqui em diante neste artigo, por brevidade, diremos que algo "existe" se não for `null` nem `undefined`.**

Em outras palavras, `value?.prop`:
- funciona como `value.prop`, se `value` existir,
- caso contrário (quando `value` é `undefined/null`), retorna `undefined`.

Aqui está a forma segura de acessar `user.address.street` usando `?.`:

```js run
let user = {}; // usuário sem endereço

alert( user?.address?.street ); // undefined (sem erro)
```

O código é curto e limpo, sem nenhuma duplicação.

Veja um exemplo com `document.querySelector`:

```js run
let html = document.querySelector('.elem')?.innerHTML; // será undefined se não houver elemento
```

Ler o endereço com `user?.address` funciona mesmo se o objeto `user` não existir:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Atenção: a sintaxe `?.` torna opcional apenas o valor antes dela, não o que vem depois.

Por exemplo, em `user?.address.street.name` o `?.` permite que `user` seja `null/undefined` com segurança (e retorna `undefined` nesse caso), mas isso vale apenas para `user`. As propriedades seguintes são acessadas da forma normal. Se quisermos que algumas delas sejam opcionais, precisaremos substituir mais `.` por `?.`.

```warn header="Não abuse do encadeamento opcional"
Devemos usar `?.` apenas onde é aceitável que algo não exista.

Por exemplo, se de acordo com a lógica do nosso código o objeto `user` deve existir, mas `address` é opcional, devemos escrever `user.address?.street`, e não `user?.address?.street`.

Assim, se `user` for undefined por algum motivo, veremos um erro de programação e poderemos corrigir. Do contrário, ao abusar de `?.`, erros de código podem ser silenciados onde não é adequado, tornando-se mais difíceis de depurar.
```

````warn header="A variável antes de `?.` deve estar declarada"
Se não houver a variável `user`, então `user?.anything` gera um erro:

```js run
// ReferenceError: user is not defined
user?.address;
```
A variável deve estar declarada (por exemplo, `let/const/var user` ou como parâmetro de função). O encadeamento opcional funciona apenas com variáveis declaradas.
````

## Curto-circuito

Como mencionado anteriormente, o `?.` interrompe imediatamente ("curto-circuita") a avaliação se a parte esquerda não existir.

Portanto, se houver chamadas de função ou operações à direita de `?.`, elas não serão executadas.

Por exemplo:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // sem "user", então a execução não chega à chamada de sayHi nem ao x++

alert(x); // 0, valor não incrementado
```

## Outras variações: ?.(), ?.[]

O encadeamento opcional `?.` não é um operador, mas uma construção sintática especial que também funciona com funções e colchetes.

Por exemplo, `?.()` é usado para chamar uma função que pode não existir.

No código abaixo, alguns usuários têm o método `admin` e outros não:

```js run
let userAdmin = {
  admin() {
    alert("Sou admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // Sou admin
*/!*

*!*
userGuest.admin?.(); // nada acontece (sem esse método)
*/!*
```

Aqui, em ambas as linhas usamos o ponto (`userAdmin.admin`) para obter a propriedade `admin`, porque assumimos que o objeto `user` existe, então é seguro lê-lo.

Em seguida, `?.()` verifica a parte esquerda: se a função `admin` existir, ela é executada (como em `userAdmin`). Caso contrário (como em `userGuest`), a avaliação para sem erros.

A sintaxe `?.[]` também funciona, caso queiramos usar colchetes `[]` para acessar propriedades em vez de ponto `.`. Assim como nos casos anteriores, ela permite ler com segurança uma propriedade de um objeto que pode não existir.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

Também podemos usar `?.` com `delete`:

```js run
delete user?.name; // deleta user.name se user existir
```

````warn header="Podemos usar `?.` para leitura e exclusão seguras, mas não para escrita"
O encadeamento opcional `?.` não tem utilidade no lado esquerdo de uma atribuição.

Por exemplo:
```js run
let user = null;

user?.name = "John"; // Erro, não funciona
// porque avalia para: undefined = "John"
```

````

## Resumo

A sintaxe do encadeamento opcional `?.` tem três formas:

1. `obj?.prop` -- retorna `obj.prop` se `obj` existir, caso contrário `undefined`.
2. `obj?.[prop]` -- retorna `obj[prop]` se `obj` existir, caso contrário `undefined`.
3. `obj.method?.()` -- chama `obj.method()` se `obj.method` existir, caso contrário retorna `undefined`.

Como podemos ver, todas elas são simples e fáceis de usar. O `?.` verifica se a parte esquerda é `null/undefined` e permite que a avaliação continue caso não seja.

Uma cadeia de `?.` permite acessar propriedades aninhadas com segurança.

Ainda assim, devemos aplicar `?.` com cuidado, apenas onde é aceitável, de acordo com a lógica do nosso código, que a parte esquerda não exista. Para que erros de programação não fiquem ocultos quando ocorrerem.
