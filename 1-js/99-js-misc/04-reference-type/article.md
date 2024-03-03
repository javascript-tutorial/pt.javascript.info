
# Tipo de referência

```warn header="Recurso aprofundado da linguagem"
Este artigo aborda um tópico avançado para uma compreensão mais aprofundada de casos específicos.

Não é algo crucial. Muitos desenvolvedores experientes conseguem viver bem sem conhecê-lo. Continue lendo se desejar entender como as coisas funcionam internamente.
```

Uma chamada de método avaliada dinamicamente pode perder a referência de `this`.

Por exemplo:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // funciona

// agora, vamos chamar user.hi ou user.bye dependendo do nome
*!*
(user.name == "John" ? user.hi : user.bye)(); // Erro!
*/!*
```

Na última linha, há um operador condicional que escolhe entre `user.hi` ou `user.bye`. Neste caso, o resultado é `user.hi`.

Então, o método é imediatamente chamado com parênteses `()`. Mas não funciona corretamente!

Como você pode ver, a chamada resulta em um erro, porque o valor de `"this"` dentro da chamada se torna `undefined`.

Isso funciona (objeto, ponto, método):
```js
user.hi();
```

Isso não funciona (método avaliado):
```js
(user.name == "John" ? user.hi : user.bye)(); // Erro!
```

Por quê? Se quisermos entender porque isso acontece, vamos nos aprofundar em como funciona a chamada `obj.method()` por debaixo dos panos.

## Tipo por referência explicado

Observando de perto, podemos notar duas operações na instrução `obj.method()`:

1. Primeiro, o ponto `'.'` recupera a propriedade `obj.method`.
2. Em seguida, os parênteses `()` o executam.

Então, como a informação sobre `this` é passada da primeira parte para a segunda?

Se colocarmos essas operações em linhas separadas, então `this` certamente será perdido:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
};

*!*
// Divide a obtenção e a chamada do método em duas linhas
let hi = user.hi;
hi(); // Erro, pois é undefined
*/!*
```

Aqui `hi = user.hi` coloca a função na variável, e então, na última linha, ela é completamente independente, e assim não há `this`.

**Para fazer com que chamadas user.hi() funcionem, o JavaScript utiliza um truque: o ponto `.` não retorna uma função, mas um valor do [tipo por referência](https://tc39.github.io/ecma262/#sec-reference-specification-type) especial.**

O tipo por referência é um "tipo de especificação". Não podemos usá-lo explicitamente, mas é utilizado internamente pela linguagem.

O valor do tipo de referência é uma combinação de três valores `(base, name, strict)`, onde:

- `base` é o objeto.
- `name` é o nome da propriedade.
- `strict` é verdadeiro se `use strict` estiver em efeito.

O resultado de um acesso à propriedade `user.hi` não é uma função, mas um valor de tipo de referência. Para `user.hi` em modo estrito (strict mode), é:

```js
// valor do Tipo de Referência
(user, "hi", true)
```

Quando parênteses são chamados no tipo de referência, eles recebem todas as informações sobre o objeto e o seu método, e podem definir o `this` correto (`user` nesse caso).

O tipo de referência é um tipo interno especial "intermediário", com o propósito de transmitir informações do ponto `.` para os parênteses de chamada `()`.

Qualquer outra operação, como a atribuição `hi = user.hi`, descarta o tipo de referência como um todo, pega o valor de `user.hi` (uma função) e o repassa. Portanto, qualquer operação subsequente "perde" o `this`. 

Então, como resultado, o valor de `this` é apenas passado corretamente apenas se a função for chamada diretamente usando a sintaxe de ponto `obj.method()` ou colchetes `obj['method']()` (ambas fazem o mesmo aqui). Existem várias maneiras de resolver esse problema, como [func.bind()](/bind#solution-2-bind).

## Resumo

O Tipo de referência é um tipo interno da linguagem.

Ler uma propriedade, como com o ponto `.` em `obj.method()` não retorna exatamente o valor da propriedade, mas um valor especial do "tipo de referência" que armazena tanto o valor da propriedade quanto o objeto do qual foi extraído.

Isso é para a subsequente chamada de método `()` obter o objeto e definir `this` para ele.

Para todas as outras operações, o tipo de referência automaticamente se torna o valor da propriedade (uma função no nosso caso).

Toda a mecânica está oculta aos nossos olhos. Isso é relevante em casos sutis, como quando um método é obtido dinamicamente a partir do objeto, usando uma expressão.