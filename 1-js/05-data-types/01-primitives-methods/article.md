# Métodos de primitivos

JavaScript nos permite trabalhar com primitivos (strings, números, etc.) como se fossem objetos.

Eles também fornecem métodos para chamar como se fossem objetos. Estudaremos isso em breve, mas primeiro veremos como isso funciona, porque, é claro, os primitivos não são objetos (e aqui deixaremos isso ainda mais claro).

Vejamos as principais diferenças entre primitivos e objetos.

Um primitivo

- É um valor de um tipo primitivo.
- Existem 6 tipos primitivos: `string`, `number`, `boolean`, `symbol`, `null` e `undefined`.

Um objeto

- É capaz de armazenar vários valores como propriedades.
- Pode ser criado com `{}`, por exemplo: `{name: "John", age: 30}`. Existem outros tipos de objetos em JavaScript; funções, por exemplo, são objetos.

Uma das melhores coisas sobre objetos é que podemos armazenar uma função como uma de suas propriedades.

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Oi amigo!");
  }
};

john.sayHi(); // Oi amigo!
```

Então aqui nós fizemos um objeto `john` com o método `sayHi`.

Muitos objetos internos já existem, como aqueles que trabalham com datas, erros, elementos HTML, etc. Eles possuem diferentes propriedades e métodos.

Mas esses recursos vêm com um custo!

Objetos são "mais pesados" que primitivos. Eles exigem recursos adicionais para suportar o maquinário interno. Mas, como as propriedades e os métodos são muito úteis na programação, os mecanismos de JavaScript tentam otimizá-los para reduzir a carga adicional.

## Um primitivo como objeto

Aqui está o paradoxo enfrentado pelo criador do JavaScript:

- Há muitas coisas que alguém poderia querer fazer com um primitivo como uma string ou um número. Seria ótimo acessá-los como métodos.
- Primitivos devem ser o mais rápido e leve possível.

A solução parece um pouco estranha, mas aqui está:

1. Primitivos ainda são primitivos. Um único valor, conforme desejado.
2. A linguagem permite acesso a métodos e propriedades de strings, números, booleanos e símbolos.
3. Quando isso acontece, um "invólucro de objeto" especial que fornece a funcionalidade extra é criado e, em seguida, é destruído.

Os "invólucros de objeto" são diferentes para cada tipo primitivo e são chamados: `String`, `Number`, `Boolean` e `Symbol`. Assim, eles fornecem diferentes conjuntos de métodos.

Por exemplo, existe um método [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) que retorna uma string em letras maiúsculas.

Veja como isso funciona:

```js run
let str = "Olá";

alert( str.toUpperCase() ); // OLÁ
```

Simples, certo? Aqui está o que realmente acontece em`str.toUpperCase()`:

1. A string `str` é um primitivo. Assim, no momento de acessar sua propriedade, é criado um objeto especial que conhece o valor da string e possui métodos úteis, como `toUpperCase ()`.
2. Esse método é executado e retorna uma nova string (mostrada por `alert`).
3. O objeto especial é destruído, deixando o primitivo `str` sozinho.

Portanto, os primitivos podem fornecer métodos, mas ainda permanecem leves.

O mecanismo do JavaScript otimiza muito esse processo. Pode até ignorar a criação do objeto extra. Mas ainda deve seguir a especificação e se comportar como se criasse um.

Um número tem métodos próprios, por exemplo, [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) arredonda o número para a precisão dada:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

Vamos ver métodos mais específicos nos capítulos <info:number> e <info:string>.


````warn header="Construtores `String/Number/Boolean` são apenas para uso interno"
Algumas linguagens como Java nos permitem criar "objetos invólucros" para primitivos explicitamente usando uma sintaxe como `new Number(1)` ou `new Boolean(false)`.

Em JavaScript, isso também é possível por razões históricas, mas é altamente **não recomendado**. As coisas vão enlouquecer em vários lugares.

Por exemplo:

```js run
alert( typeof 1 ); // "número"

alert( typeof new Number(1) ); // "objeto"!
```

E por isso a seguir, `zero`, é um objeto, o alerta será mostrado:

```js run
let zero = new Number(0);

if (zero) { // zero é true (verdadeiro), por que é um objeto
  alert( "zero é verdadeiro?!?" );
}
```

Por outro lado, usar as mesmas funções `String / Number / Boolean` sem` new` é uma coisa totalmente sensata e útil. Eles convertem um valor para o tipo correspondente: para uma string, um número ou um booleano (primitivo).

Por exemplo, isso é inteiramente válido:
```js
let num = Number("123"); // converte a string para número
```
````


````warn header="null/undefined não tem métodos"
Os primitivos especiais `null` e` undefined` são exceções. Eles não têm "invólucros de objeto" correspondentes e não fornecem métodos. De certo modo, eles são "os mais primitivos".

Uma tentativa de acessar uma propriedade de um valor desses resultaria no erro:

```js run
alert(null.test); // erro
````

## Resumo

- Primitivos, exceto `null` e` undefined`, fornecem muitos métodos úteis. Estudaremos eles nos próximos capítulos.
- Formalmente, esses métodos funcionam por meio de objetos temporários, mas os mecanismos de JavaScript são bem ajustados para otimizar isso internamente, para que não sejam caros para serem chamados.
