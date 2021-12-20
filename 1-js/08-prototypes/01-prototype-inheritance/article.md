# Herança Prototipada

Na programação, nós sempre queremos extender algum comportamento.

Por exemplo, nós temos um objeto `user` com suas propriedades e métodos, e queremos criar duas variantes `admin` e `guest` levemente diferentes. Nós gostaríamos de reutilizar o que já temos no `user`, sem copiar/reimplementar seus métodos, apenas construir um novo objeto baseado nele.

Herança Prototipada (*Prototypal inheritance*) é uma funcionalidade da linguagem que nos ajuda com isso.

## [[Prototype]]

No Javascript, os objetos possuem uma propriedade escondida especial `[[Prototype]]` (como é chamada na especificação), cujo valor é `null` ou referencia outro objeto. Esse objeto é chamado de "protótipo":

![prototype](object-prototype-empty.svg)

Quando lemos uma propriedade de um `object`, e ela não está presente, o Javascript automaticamente obtém seu valor do protótipo. Na programação, isso é chamado de "herança prototipada". Em breve nós vamos ver vários exemplos dessa herança, bem como funcionalidades legais constrúidas em cima disso.

A propriedade `[[Prototype]]` é interna e escondida, mas existem várias formas de configurar um valor para ela. 

Uma delas é usar o nome especial `__proto__`, dessa forma:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal
*/!*
```

Agora, se tentarmos ler uma propriedade de `rabbit` e ela não estiver presente, o Javascript vai automaticamente obtê-la de `animal`.

Por exemplo:

```js
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

// nós podemos encontrar ambas propriedades no `rabbit` agora:
*!*
alert( rabbit.eats ); // true (**)
*/!*
alert( rabbit.jumps ); // true
```

A linha `(*)` do exemplo configura `animal` como o protótipo de `rabbit`.

Depois, quando o `alert` tenta ler a propriedade `rabbit.eats`, em `(**)`, ela não está no `rabbit`, então o Javascript segue a referência do `[[Prototype]]` e a encontra no `animal` (olhe de baixo pra cima):

![](proto-animal-rabbit.svg)

Aqui nós podemos dizer que "`animal` é o protótipo de `rabbit`", ou então que "`rabbit` herda o protótipo de `animal`".

Então se `animal` tem várias propriedades e métodos que são úteis, eles se tornam automaticamente disponíveis no `rabbit`. Essas propriedades são chamadas de "herdadas" ("inherited").

Se nós temos um método em `animal`, ele pode ser chamado no `rabbit`:

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Animal caminha");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// walk é obtido do protótipo
*!*
rabbit.walk(); // Animal caminha
*/!*
```

O método é automaticamente obtido do protótipo, assim:

![](proto-animal-rabbit-walk.svg)

A cadeia de protótipos pode ser maior:


```js run
let animal = {
  eats: true,
  walk() {
    alert("Animal caminha");
  }
};

let rabbit = {
  jumps: true,
*!*
  __proto__: animal
*/!*
};

let longEar = {
  earLength: 10,
*!*
  __proto__: rabbit
*/!*
};

// walk é obtido da cadeia de protótipos
longEar.walk(); // Animal caminha
alert(longEar.jumps); // true (vindo de rabbit)
```

![](proto-animal-rabbit-chain.svg)

Agora, se nós quisermos ler algo de `longEar` e ele não possuir, o Javascript vai procurar no `rabbit`, e depois no `animal`.

Só existem duas limitações:

1. As referências não podem ser circulares. O Javascript vai disparar um erro caso a gente tente atribuir `__proto__` em um círculo de objetos.
2. O valor de `__proto__` só pode ser um objeto ou `null`, outros tipos (como tipos primitivos) são ignorados.

Além disso, só pode haver um `[[Prototype]]`. Um objeto não pode ser herdeiro de outros dois.


```smart header="`__proto__` é um getter/setter histórico para `[[Prototype]]`"
É um erro comum desenvolvedores novatos não reconhecerem a diferença entre esses dois.

Mas note que `__proto__` *não é o mesmo* que a propriedade interna `[[Prototype]]`. Ele é um getter/setter para o `[[Prototype]]`. Mais tarde veremos situações nas quais isso importa, por ora vamos apenar manter isso em mente enquanto contruímos nossa compreensão da linguagem Javascript.

A propriedade `__proto__` está um pouco ultrapassada, ela existe por motivos históricos. O Javascript moderno sugere que nós usemos as funções `Object.getPrototypeOf/Object.setPrototypeOf` no lugar, que também fazem get/set do protótipo. Nós também vamos cobrir essas funções mais tarde. 

A especificação diz que o `__proto__` só pode ser suportado por browsers. Mas o fato é que todos os ambientes, incluindo o lado do servidor ("server-side") suportam o `__proto__`, então podemos usá-lo tranquilamente.

Como a notação `__proto__` é um pouco mais intuitiva, vamos usá-la nos exemplos.
```

## A Escrita não usa o protótipo

O protótipo é usado apenas para leitura de propriedades.

As operações de escrita/deleção trabalham diretamente com o objeto.

No exemplo abaixo, nós criamos um método `walk` próprio para o `rabbit`:

```js run
let animal = {
  eats: true,
  walk() {
    /* esse método não será usado pelo rabbit */  
  }
};

let rabbit = {
  __proto__: animal
};

*!*
rabbit.walk = function() {
  alert("Coelho! Pula-pula!");
};
*/!*

rabbit.walk(); // Coelho! Pula-pula!
```

De agora em diante, chamar `rabbit.walk()` encontra o método imediatamente no objeto e o executa, sem usar o protótipo:

![](proto-animal-rabbit-walk-2.svg)

Isso vale apenas para propriedades que são dados, não para métodos de acesso (getter/setter). Se uma propriedade é um getter/setter, então ela irá se comportar como uma função: getters/setters são procurados no protótipo.

Por essa razão, `admin.fullName` funciona corretamente no código abaixo:

```js run
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// setter é disparado!
admin.fullName = "Alice Cooper"; // (**)

alert(admin.fullName); // Alice Cooper, estado do admin modificado
alert(user.fullName); // John Smith, estado do user protegido
```

Na linha `(*)`, a propriedade `admin.fullName` tem um getter no protótipo `user`, então ele é chamado. E na linha `(**)` a propriedade tem um setter no protótipo, então ele é chamado.

## O valor do "this"

Uma pergunta interessante pode surgir no exemplo acima: qual o valor do `this` dentro de `set fullName(value)`? Onde as propriedades `this.name` e `this.surname` são escritas: dentro de `user` ou de `admin`?

A resposta é simples: o `this` não é nem um pouco afetado pelos protótipos.

**Não importa onde o método é encontrado: dentro de um objeto ou do seu protótipo. Ao chamar um método, `this` é sempre do objeto antes do ponto.**

Então, a chamada do setter `admin.fullName=` usa o `admin` como `this`, não o `user`.

Na verdade isso é super importante, porque pode ser que a gente tenha um objeto grande com vários métodos, sendo que outros objetos herdam ele. Quando os objetos herdeiros rodam os métodos herdados, eles vão modificar apenas seus próprios estados, não o estado do objeto grande.

Por exemplo, aqui `animal` representa um "armazenador de métodos", e `rabbit` faz uso deles.

A chamada de `rabbit.sleep()` configura `this.isSleeping` no objeto `rabbit`:

```js run
// animal tem métodos
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`Eu caminho`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "Coelho branco",
  __proto__: animal
};

// modifica rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (não existe essa propriedade no protótipo)
```

A imagem do resultado fica:

![](proto-animal-rabbit-walk-3.svg)

Se nós tivéssemos outros objetos, como `bird`, `snake`, etc., herdando o `animal`, eles iriam ganhar acesso aos métodos de `animal`. Mas em cada chamada dos métodos, o `this` corresponderia ao próprio objeto (antes do ponto), calculado na hora da chamada, não ao `animal`. Dessa forma, quando escrevemos algum dado no `this`, ele vai ser armazenado dentro de cada objeto.

Como resultado, os métodos são compartilhados, mas o estado dos objetos não são.

## Loop for..in

O loop `for..in` também itera sobre as propriedades herdadas.

Por exemplo:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// Object.keys retorna apenas as próprias chaves
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// for..in itera sobre as próprias chaves e sobre as herdadas
for(let prop in rabbit) alert(prop); // jumps, e depois eats
*/!*
```

Se isso não é o que queremos, e nós gostaríamos de excluir as propriedades herdadas, existe o método interno [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): ele retorna `true` se o `obj` possui de fato uma propriedade chamada `key` (não herdada).

Então nós podemos filtrar apenas as propriedades herdadas (ou fazer outra coisa com elas):

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Nosso: ${prop}`); // Nosso: jumps
  } else {
    alert(`Herdado: ${prop}`); // Herdado: eats
  }
}
```

Aqui nós temos a seguinte cadeia de heranças: `rabbit` herda de `animal`, que herda de `Object.prototype` (por definição, pois `animal` é um objeto literal `{...}`), que tem apenas `null` acima:

![](rabbit-animal-object.svg)

Note que existe uma coisa curiosa. De onde o método `rabbit.hasOwnProperty` está vindo? Nós não definimos ele. Mas olhando para a cadeia, nós podemos ver que esse método é passado pelo `Object.prototype.hasOwnProperty`. Em outras palavras, ele é herdado.

...Mas por que `hasOwnProperty` não aparece no loop `for..in`, da mesma forma que `eats` e `jumps`, já que o `for..in` lista propriedades herdadas?

A resposta é simples: ele não é enumerável. Assim como todas as outras propriedades de `Object.prototype`, ele tem a flag `enumerable:false`. E `for..in` só lista aquelas que são enumeráveis. Aí está o porquê do resto das propriedades de `Object.prototype` não estarem listadas.

```smart header="Quase todas as outras chaves/métodos *value-gettting* ignoram propriedades herdadas."

Quase todas as outras chaves/métodos *value-gettting*, como `Object.keys`, `Object.values`, entre outros, ignoram propriedades herdadas.

Eles operam apenas no próprio objeto. Propriedades vindas do protótipo *não* são levadas em conta.
```

## Resumo

- No Javascript, todos os objetos possuem uma propriedade `[[Prototype]]` escondida que ou é um objeto ou é `null`.
- Nós podemos usar `obj.__proto__` para acessá-lo (um getter/setter que é histórico, para o qual já temos alternativas, que veremos em breve).
- O objeto referenciado por `[[Prototype]]` é um chamado "protótipo" (*prototype*).
- Se nós queremos ler uma propriedade de `obj` ou chamar um método, e eles não existem, o Javascript tenta encontrá-los no protótipo.
- Operações de escrever/deletar agem diretamente no objeto, elas não usam o protótipo (assumindo que a propriedade seja um dado, não um setter).
- Se chamarmos `obj.method()`, e o `method` é obtido do prototype, o `this` ainda referencia o `obj`. Portanto métodos sempre trabalham com o objeto atual, mesmo que eles sejam herdados.
- O loop `for..in` itera tanto sobre as propriedades do objeto quanto sobre as propriedades herdadas. Todas as outras chaves/métodos *value-getting* operam apenas sobre o próprio objeto.
