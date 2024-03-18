
# Propriedades e métodos privados e protegidos

Um dos princípios mais importantes de programação orientada a objetos é a delimitação da interface interna da externa.

Essa é uma prática "fundamental" ao desenvolver qualquer coisa mais complexa do que um aplicativo "hello world".

Para entender isso, vamos nos afastar do desenvolvimento e voltar nossos olhos para o mundo real.

Geralmente, os dispositivos que usamos são bastante complexos. No entanto, delimitar a interface interna da externa permite utilizá-los sem problemas. 

## Um exemplo da vida real

Por exemplo, uma máquina de café. Simples do lado de fora: um botão, uma tela, alguns orifícios... E, com certeza, o resultado: um ótimo café! :)

![](coffee.jpg)

Mas internamente...(uma imagem do manual de reparo)

![](coffee-inside.jpg)

Muitos detalhes. Porém, podemos usá-la sem saber nada.

Máquinas de café são bastante confiáveis, não são? Podemos usá-las por anos, e apenas se algo der errado, precisamos levá-las para o reparo.

O segredo da confiança e simplicidade de uma máquina de café está em ajustar bem todos os detalhes e escondê-los internamente.

Se removermos a cobertura protetora da máquina de café, então usá-la será muito mais complexo (onde apertar?), e perigoso (pode causar choque elétrico).

Como veremos, na programação, objetos são como máquinas de café.

Mas, para ocultar os detalhes internos, não usaremos uma cobertura protetora, mas sim uma sintaxe especial da linguagem e convenções.

## Interface interna e externa

Em programação orientada a objetos, propriedades e métodos são separados em dois grupos:

- *Interface interna* -- métodos e propriedades acessíveis a partir de outros métodos da classe, mas não externamente.
- *Interface externa* -- métodos e propriedades acessíveis também de fora da classe.

Se continuarmos com a analogia da máquina de café, o que está escondido internamente - um tubo de caldeira, um elemento de aquecimento, e assim por diante - é a interface interna. 

Uma interface interna é usada para o objeto funcionar, seus detalhes se interconectam. Por exemplo, um tudo de caldeira está atrelado ao elemento de aquecimento.

Porém, por fora, uma máquina está fechada pela cobertura protetora, de modo que ninguém possa acessar esses detalhes internos. Detalhes são ocultos e inacessíveis. Podemos usar suas funcionalidades por meio da interface externa.

Assim, tudo que precisamos para utilizar um objeto é conhecer sua interface externa. Podemos estar completamente inconscientes de como funciona por dentro, e isso é ótimo.

Esta foi uma introdução geral.

No Javascript, existem dois tipos de campos de objeto (propriedades e métodos):

- Publico: acessível de qualquer lugar. Eles compõem a interface externa. Até agora, estávamos usando apenas propriedades e métodos públicos.
- Privado: acessível apenas de dentro da classe. Estes são para a interface interna.

Em muitas outras linguagens, também existem campos "protegidos": acessíveis apenas de dentro da classe e por aquelas que a estendem (como privado, porém com acesso adicional pelas classes que herdam). Eles também são úteis para a interface interna. De certa forma, são mais difundidos do que os privados, pois geralmente desejamos que classes que herdam tenham acesso a eles.  

Campos protegidos não são implementados em Javascript no nível da linguagem, porém, na prática, são muito convenientes, então eles são emulados.

Agora vamos criar uma máquina de café em JavaScript com todos esses tipos de propriedades. Uma máquina de café possui muitos detalhes, mas não os modelaremos para manter a simplicidade. (Embora pudéssemos)

## Protegendo "waterAmount"

Vamos criar primeiro uma classe simples de máquina de café:

```js run
class CoffeeMachine {
  waterAmount = 0; // a quantidade de água

  constructor(power) {
    this.power = power;
    alert( `Created a coffee-machine, power: ${power}` );
  }

}

// cria a máquina de café
let coffeeMachine = new CoffeeMachine(100);

// adicionar água
coffeeMachine.waterAmount = 200;
```

Agora as propriedades  `waterAmount` e `power` são públicas. Podemos facilmente obtê-las/atribuí-las de fora para qualquer valor. 

Vamos alterar a propriedade `waterAmount` para protegida para ter mais controle sobre ela. Por exemplo, não queremos que ninguém defina com um valor abaixo de zero.

**Propriedades protegidas são normalmente prefixadas com um sublinhado `_`.**

Isto não é aplicado no nível da linguagem, mas existe uma convenção bem conhecida entre programadores que tais propriedades e métodos não devem ser acessados externamente.

Então nossa propriedade será chamada `_waterAmount`.

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// cria a máquina de café
let coffeeMachine = new CoffeeMachine(100);

// adiciona água
coffeeMachine.waterAmount = -10; // _waterAmount será 0, não -10
```

Agora, o acesso está sob controle, torna-se impossível definir a quantidade de água abaixo de zero.

## "power" apenas para leitura

Para a propriedade `power`, vamos torná-la apenas para leitura. ÀS vezes acontece que uma propriedade deve ser definida apenas no momento de criação, e então nunca modificada.  

Este é exatamente o caso da máquina de café, `power` nunca muda.

Para fazer isso, só precisamos criar o getter, mas não um setter.

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power é: 100W

coffeeMachine.power = 25; // Error (sem o setter)
```

````smart header="Getter/setter functions"
Aqui usamos a sintaxe getter/setter.

Mas na maioria das vezes, funções `get.../set...` são preferidas, assim:

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

Isto parece um pouco mais longo, mas funções são mais flexíveis. Elas podem aceitar múltiplos argumentos (mesmo que não precisemos deles agora).

Por outro lado, a sintaxe get/set é mais curta, então, no final das contas, não existe uma regra estrita, você pode decidir.
````

```smart header="Campos protegidos são herdados"
Se herdarmos `class MegaMachine extends CoffeeMachine`, então nada nos impede de acessar this._waterAmount ou `this._power` a partir dos métodos da nova classe.

Portanto, os campos protegidos são naturalmente herdados, ao contrário dos privados, como veremos abaixo.
```

## "#waterLimit" privado

[recent browser=none]

Há uma proposta de JavaScript finalizada, quase padronizada, que fornece suporte ao nível da linguagem para métodos e propriedades privados.

Privados devem começar com `#`. Eles são acessíveis apenas de dentro da classe.

Por exemplo, aqui está uma propriedade privada `#waterLimit` e o método privado de verificação de água `#fixWaterAmount`:

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }
*/!*

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

*!*
// não é possível acessar membros privados de fora da classe
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error
*/!*
```

No nível da linguagem, `#` é um sinal especial indicando que o campo é privado. Não podemos acessá-lo de fora da classe o de classes que herdam.

Campos privados não entram em conflito com os públicos. Podemos ter tanto o campo privado `#waterAmount` quanto o público `waterAmount` ao mesmo tempo.  

Por exemplo, vamos tornar `#waterAmount` um acessador para `waterAmount`: 

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```

Ao contrário dos campos protegidos, os campos privados são aplicados pela própria linguagem o que é algo positivo.

Porém, se herdarmos de `CoffeeMachine`, então não teremos acesso direto a `#waterAmount`. Dependeremos do getter/setter `waterAmount`: 

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert( this.#waterAmount ); // Error: pode ser acessado somente  de CoffeeMachine
*/!*
  }
}
```
Em muitos cenários, essa limitação é muito severa., especialmente quando estendermos a classe CoffeeMachine, pois pode haver razões legítimas para acessar seus detalhes internos. É por isso que campos protegidos são utilizados com mais frequência, mesmo que não sejam suportados pela sintaxe da linguagem.

````warn header="Campos privados não estão disponíveis como this[name]"
Campos privados são especiais.
Como sabemos, normalmente podemos acessar campos usando `this[name]`:

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${*!*this[fieldName]*/!*}`);
  }
}
```
Com campos privados isso é impossível: `this['#name']` não funciona. Essa é uma limitação de sintaxe para garantir a privacidade.
````

## Resumo

Em termos de POO, a delimitação da interface interna da externa é chamada de [encapsulamento](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_orientada_a_objetos#Encapsulamento).

Isto proporciona os seguintes benefícios:

Proteção para os usuários, evitando que atirem no próprio pé
: Imagine, há uma equipe de desenvolvedores usando uma máquina de café. Ela foi fabricada pela empresa "Best CoffeeMachine" e funciona bem, mas a capa protetora foi removida, expondo a interface interna.

    Todos os desenvolvedores são civilizados e usam a máquina de café como pretendido. No entanto, um deles, John, decidiu que ele era o mais inteligente e fez algumas modificações internas na máquina de café. Como resultado a máquina de café falha dois dias depois.

    Certamente, isso não é culpa do John, mas sim da pessoa que removeu a capa protetora e permitiu que John fizesse suas manipulações.
    
    O mesmo ocorre na programação. Se um usuário de uma classe modificar coisas que não deveriam ser alteradas externamente, as consequências são imprevisíveis.

Manutenibilidade
: A situação na programação é mais complexa do que com uma máquina de café da vida real, porque não a compramos apenas uma vez. O código passa constantemente por desenvolvimento e aprimoramento.

    **Se delimitarmos estritamente a interface interna, então o desenvolvedor da classe pode modificar livremente suas propriedades e métodos internos, mesmo sem informar os usuários.**

    Se você é um desenvolvedor de tal classe, é ótimo saber que métodos privados podem ser renomeados com segurança, seus parâmetros podem ser modificados e até removidos, porque nenhum código externo depende deles.

    Para os usuários, quando uma nova versão é liberada, pode ser uma reformulação total internamente, mas ainda assim simples de atualizar se a interface externa for a mesma.

Complexidade oculta
: Pessoas adoram usar coisas que são simples. Ao menos do lado de fora. O que esta por dentro é uma história diferente.

    Programadores não são exceções.

    **É sempre conveniente quando detalhes de implementação estão ocultos e uma interface externa simples e bem documentada está disponível.**

Para ocultar uma interface interna, utilizamos propriedades protegidas ou privadas:

- Campos protegidos começam com `_`. Essa é uma convenção bem conhecida, mas não é aplicada no nível da linguagem. Programadores devem acessar um campo que começa com `_` apenas de sua própria classe e de classes que a herdam.
- Campos privados começam com `#`. O JavaScript garante que só possamos acessá-los de dentro da própria classe.

Atualmente, campos privados não são bem suportados em todos os navegadores, mas é possível usar polyfills.
