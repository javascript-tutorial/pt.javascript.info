# F.prototype

Lembre-se, novos objetos podem ser criados com uma função construtora, usando `new F()`.

Se `F.prototype` é um objeto, então o operador `new` usa ela para setar `[[Prototype]]` no novo objeto.

```smart
JavaScript tem herança prototipada desde o começo. Isso era uma das funcionalidades centrais da linguagem.

Mas antigamente não havia um acesso direto a ela. A única coisa que funcionava de forma confiável era uma propriedade `"prototype"` da função construtora, descrita nesse capítulo. Então, existem muitos scripts que ainda a utilizam.
```

Note que o `F.prototype` aqui significa uma propriedade regular de nome `"prototype"` dentro de `F`. Isso soa um pouco similar ao termo "prototype" (protótipo), mas aqui nós estamos falando realmente de uma propriedade regular com esse nome.

Aqui temos um exemplo:

```js run
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

*!*
Rabbit.prototype = animal;
*/!*

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

Setando `Rabbit.prototype = animal` literalmente significa o seguinte: "Quando o `new Rabbit` for criado, atribua seu `[[Prototype]]` para `animal`".

Essa é a imagem do resultado:

![](proto-constructor-animal-rabbit.svg)

Na imagem, `"prototype"` é a seta na horizontal, indicando uma propriedade regular, e `[[Prototype]]` está na vertical, indicando a herança de `rabbit` vinda do `animal`.

```smart header="`F.prototype` é usado apenas na chamada `new F`"
A propriedade `F.prototype` é usada apenas quando `new F` é chamado, e ela atribui um valor para o `[[Prototype]]` do novo objeto.

Se, depois da criação, a propriedade `F.prototype` mudar (`F.prototype = <another object>`), então novos objetos criados com `new F` vão ter outro objeto como `[[Prototype]]`, enquanto os objetos que já existirem vão manter o antigo.
```

## F.prototype default, propriedade do construtor

Toda função tem a propriedade `"prototype"`, mesmo que não a use.

O `"prototype"` default é um objeto com apenas uma propriedade `constructor` que aponta para a própria função a que pertence.

Assim:

```js
function Rabbit() {}

/* default prototype
Rabbit.prototype = { constructor: Rabbit };
*/
```

![](function-prototype-constructor.svg)

Nós podemos conferir isso:

```js run
function Rabbit() {}
// Por definição:
// Rabbit.prototype = { constructor: Rabbit }

alert( Rabbit.prototype.constructor == Rabbit ); // true
```

Naturalmente, se nós não fizermos nada, a propriedade `constructor` está disponível para todos os coelhos (*rabbits*) através do `[[Prototype]]`:

```js run
function Rabbit() {}
// Por definição:
// Rabbit.prototype = { constructor: Rabbit }

let rabbit = new Rabbit(); // herda de {constructor: Rabbit}

alert(rabbit.constructor == Rabbit); // true (vindo do protótipo)
```

![](rabbit-prototype-constructor.svg)

Nós podemos usar a propriedade `constructor` para criar um novo objeto usando o próprio construtor de um objeto que já exista.

Como abaixo:

```js run
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("White Rabbit");

*!*
let rabbit2 = new rabbit.constructor("Black Rabbit");
*/!*
```

Isso é prático quando nós temos um objeto, não sabemos qual construtor foi usado para ele (de uma biblioteca de terceiros, por exemplo), e nós precisamos criar outro objeto do mesmo tipo.

Mas provavelmente a coisa mais importante sobre o `"constructor"` é que...

**...O próprio JavaScript não garante qual é o valor correto do `"constructor"`.**

Sim, existe um `"prototype"` default para funções, mas é só isso. O que acontece com ele depois -- está totalmente por nossa conta.

Em particular, se nós substituirmos o `prototype` default como um todo, não vai haver um `"constructor"` nele.

Por exemplo:

```js run
function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};

let rabbit = new Rabbit();
*!*
alert(rabbit.constructor === Rabbit); // false
*/!*
```

Portanto, para manter o `"constructor"` certo, nós podemos escolher adicionar/remover propriedades do `"prototype"` ao invés de sobrescrevê-lo completamente:

```js
function Rabbit() {}

// não sobrescreva Rabbit.prototype completamente
// apenas adicione
Rabbit.prototype.jumps = true
// o Rabbit.prototype.constructor default fica preservado
```

Outra alternativa é recriar a propriedade `constructor` manualmente:

```js
Rabbit.prototype = {
  jumps: true,
*!*
  constructor: Rabbit
*/!*
};

// agora o constructor também está correto, porque nós o adicionamos
```


## Resumo

Neste capítulo, nós descrevemos brevemente a forma de setar um `[[Prototype]]` para os objetos via função construtura. Mais tarde nós vamos ver padrões (*patterns*) mais avançados de programação que dependem disso.

É tudo bem simples, mas aqui estão algumas notas para deixar as coisas claras:

- A propriedade `F.prototype` (não confunda com o `[[Prototype]]`) seta o `[[Prototype]]` de novos objetos quando `new F()` é chamado.
- O valor de `F.prototype` deveria ser ou um objeto ou `null`: outros valores não vão funcionar.
- A propriedade `"prototype"` só tem o efeito especial quando setada em uma função construtora, e invocada com `new`.

Em objetos regulares, o `prototype` não tem nada de especial:

```js
let user = {
  name: "John",
  prototype: "Bla-bla" // nenhuma mágica aqui
};
```

Por definição, todas as funções possuem `F.prototype = { constructor: F }`, então nós podemos obter o construtor de um objeto acessando sua propriedade `"constructor"`.
