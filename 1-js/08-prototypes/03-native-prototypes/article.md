# Protótipos Nativos

A propriedade `"prototype"` é comumente utilizada pelo núcleo do próprio JavaScript. Toda função construtora embutida a usa.

Vamos ver como é para objetos simples primeiro, e depois para objetos mais complexos.

## Object.prototype

Digamos que a gente imprima um objeto vazio:

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

Onde está o código que gera a string `"[object Object]"`? Isso é um método embutido `toString`, mas onde ele está? O `obj` está vazio!

... Mas a notação abreviada `obj = {}` é o mesmo que `obj = new Object()`, onde `Object` é uma função construtora embutida, com seu próprio `prototype` referenciando um objeto enorme com `toString` e outros métodos.

Veja o que está acontecendo:

![](object-prototype.svg)

Quando `new Object()` é chamado (ou um objeto literal `{...}` é criado), o seu `[[Prototype]]` é configurado para o `Object.prototype` de acordo com a regra que nós discutimos no capítulo anterior:

![](object-prototype-1.svg)

Assim, quando `obj.toString()` é chamado, o método é obtido de `Object.prototype`.

Nós podemos conferir isso assim:

```js run
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

Note que não há um `[[Prototype]]` adicional na cadeia acima de `Object.prototype`:

```js run
alert(Object.prototype.__proto__); // null
```

## Outros protótipos embutidos

Outros objetos embutidos, como `Array`, `Date`, `Function`, entre outros, também mantém métodos nos seus protótipos.

Por exemplo, quando nós criamos um array `[1, 2, 3]`, a função construtura padrão `new Array()` é usada internamente. Dessa forma, os dados são escritos dentro do novo objeto, e `Array.prototype` se torna no seu protótipo e provê métodos. Isso é bem eficiente em termos de memória.

Pela especificação, todos os protótipos embutidos têm `Object.prototype` no topo. Algumas pessoas dizem que "tudo herda de objetos".

Aqui temos uma visão geral (para 3 protótipos embutidos):

![](native-prototypes-classes.svg)

Vamos conferir os protótipos manualmente:

```js run
let arr = [1, 2, 3];

// herda de Array.prototype?
alert( arr.__proto__ === Array.prototype ); // true

// e depois herda de Object.prototype?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// e null no topo.
alert( arr.__proto__.__proto__.__proto__ ); // null
```

Alguns métodos nos protótipos podem se sobrepor. Por exemplo, `Array.prototype` tem o seu próprio `toString` que lista os elementos separados por vírgula:

```js run
let arr = [1, 2, 3]
alert(arr); // 1,2,3 <-- O resultado de Array.prototype.toString
```

Como vimos antes, `Object.prototype` também tem o método `toString`, mas `Array.prototype` está mais perto na cadeia, então a variante do array é utilizada.


![](native-prototypes-array-tostring.svg)


Ferramentas embutidas em navegadores, como o console do desenvolvedor no Chrome, também mostram herança (objetos embutidos podem precisar de usar o `console.dir`):

![](console_dir_array.png)

Outros objetos embutidos também trabalham da mesma forma. Até mesmo funções -- elas são objetos de um construtor `Function` embutido, e seus métodos (`call`/`apply` e outros) são obtidos de `Function.prototype`. Funções também têm seu próprio `toString`.

```js run
function f() {}

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true, herdado de object
```

## Primitivos

As coisas mais complicadas acontecem com strings, números e boleanos.

Como sabemos, eles não são objetos. Mas se nós tentarmos acessar as propriedades deles, temporariamente são criados objetos que contém os construtores embutidos `String`, `Number` and `Boolean`. Eles fornecem os métodos e disaparecem.

Esses objetos são criados invisivelmente para nós e a maioria dos interpretadores (*engines*) otimizam esse processo, apesar da especificação descrevê-lo exatamente dessa forma. Os métodos desses objetos também residem nos protótipos, disponíveis como `String.prototype`, `Number.prototype` e `Boolean.prototype`.

```warn header="Os valores `null` e `undefined` não têm objetos que os envolvam"
O valores especiais `null` e `undefined` se destacam dos outros. Eles não têm objetos que os envolem, então métodos e propriedades não estão disponíveis para eles. Também não existem protótipos correspondentes.
```

## Mudando protótipos nativos [#native-prototype-change]

Protótipos nativos podem ser modificados. Por exemplo, se nós adicionarmos um método a `String.prototype`, ele vai ficar disponível a todas as strings:

```js run
String.prototype.show = function() {
  alert(this);
};

"BUM!".show(); // BUM!
```

Durante o processo do desenvolvimento, nós podemos ter novas ideias de métodos embutidos que nós gostaríamos de ter, e podemos ficar tentados a adicioná-los aos protótipos nativos. Mas isso é geralmente uma má ideia.

```warn
Protótipos são globais, então é fácil gerar um conflito. Se duas bibliotecas adicionam um método `String.prototype.show`, uma delas estará sobrescrevendo a outra.

Por isso, geralmente, modificar um protótipo nativo é considerado uma má ideia.
```

**Na programação moderna, existe apenas um caso erm que modificar protótipos nativos é aprovado: fazer polyfill (polyfilling).**

*Polyfill* é um termpo para criar um substituto para um método que existe na especificação do JavaScript, mas ainda não tem suporte em algum interpretador particular de JavaScript.

Nesse caso nós podemos implementar e preencher o protótipo embutido com ele.

Por exemplo:

```js run
if (!String.prototype.repeat) { // Se não existe esse método
  // adiciona no protótipo

  String.prototype.repeat = function(n) {
    // repete a string n vezes

    // na realidade, o código deveria ser um pouco mais complexo do que isso
    // (o algoritmo completo está na especificação)
    // mas mesmo um polyfill imperfeito, é geralmente considerado bom o suficiente
    return new Array(n + 1).join(this);
  };
}

alert( "La".repeat(3) ); // LaLaLa
```


## Pegando emprestado dos protótipos

No capítulo <info:call-apply-decorators#method-borrowing>, nós falamos sobre pegar métodos emprestado.

Isso é quando nós pegamos um método de um objeto e o copiamos para outro.

Alguns métodos de protótipos nativos são emprestados com muita frequência.

Por exemplo, se nós estamos fazendo um objeto parecido com um array, nós podemos querer copiar alguns métodos de array para ele.

Veja um exemplo:

```js run
let obj = {
  0: "Olá",
  1: "mundo!",
  length: 2,
};

*!*
obj.join = Array.prototype.join;
*/!*

alert( obj.join(',') ); // Olá,mundo!
```

Ele funciona porque o algoritmo interno do método `join` embutido só precisa dos índices corretos e da propriedade `length`. Ele não confere se o objeto é de fato uma array. Muitos métodos enbutidos são assim.

Outra possibilidade é herdar configurando `obj.__proto__` para `Array.prototype`, de forma que todos os métodos de `Array` fiquem automaticamente disponíveis em `obj`.

Mas isso é impossível se `obj` já herda de outro objeto. Lembre-se, nós só podemos herdar de um objeto por vez.

Pegar métodos emprestado é mais flexível, isso permite misturar as funcionalidades de diferentes objetos caso necessário.

## Resumo

- Todos os objetos enbutidos seguem o mesmo padrão:
    - Os métodos são guardados no protótipo (`Array.prototype`, `Object.prototype`, `Date.prototype`, etc.)
    - O objeto só guarda os dados nele mesmo (itens de array, propriedades de objetos, a data)
- Tipos primitivos também guardam métodos em protótipos de objetos que os envolvem: `Number.prototype`, `String.prototype` e `Boolean.prototype`. Apenas `undefined` e `null` não tem objetos invólucros.
- Protótipos embutidos podem ser modificados ou populados com novos métodos. Mas modificá-los não é recomendado. O único caso aceitável é provavelmente quando nós adicionamos um novo comportamento e ele ainda não tem suporte em algum interpretador (*engine*) de JavaScript.
