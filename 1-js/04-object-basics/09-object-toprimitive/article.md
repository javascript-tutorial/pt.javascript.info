
# Conversão de objeto para primitivo

O que acontece quando objetos são somados `obj1 + obj2`, subtraídos `obj1 - obj2` ou exibidos usando `alert(obj)`?

O JavaScript não permite que você personalize como os operadores funcionam em objetos. Diferente de outras linguagens de programação, como Ruby ou C++, não podemos implementar um método especial de objeto para lidar com a adição (ou outros operadores).

Nesse tipo de operação, os objetos são convertidos automaticamente para primitivos, e então a operação é realizada sobre esses primitivos, resultando num valor primitivo.

Essa é uma limitação importante: o resultado de `obj1 + obj2` (ou outra operação matemática) não pode ser outro objeto!

Por exemplo, não podemos fazer objetos representando vetores ou matrizes (ou conquistas ou qualquer outra coisa), somá-los e esperar um objeto "somado" como resultado. Esses feitos arquiteturais estão automaticamente "fora de cogitação".

Então, como tecnicamente não dá para fazer muita coisa aqui, não existe matemática com objetos em projetos reais. Quando acontece, com raras exceções, é por causa de um erro de código.

Neste capítulo vamos abordar como um objeto é convertido para primitivo e como personalizar isso.

Temos dois propósitos:

1. Vai nos permitir entender o que está acontecendo em caso de erros de código, quando esse tipo de operação acontece acidentalmente.
2. Existem exceções, onde esse tipo de operação é possível e faz sentido. Por exemplo, subtrair ou comparar datas (objetos `Date`). Vamos nos deparar com elas mais tarde.

## Regras de conversão

No capítulo <info:type-conversions> vimos as regras para conversões numéricas, de string e booleanas de primitivos. Mas deixamos uma lacuna para objetos. Agora, já que sabemos sobre métodos e symbols, fica possível preenchê-la.

1. Não existe conversão para booleano. Todos os objetos são `true` num contexto booleano, simples assim. Só existem conversões numéricas e de string.
2. A conversão numérica acontece quando subtraímos objetos ou aplicamos funções matemáticas. Por exemplo, objetos `Date` (que vamos abordar no capítulo <info:date>) podem ser subtraídos, e o resultado de `date1 - date2` é a diferença de tempo entre as duas datas.
3. Quanto à conversão de string -- ela normalmente acontece quando exibimos um objeto com `alert(obj)` e em contextos parecidos.

Podemos implementar a conversão de string e numérica por conta própria, usando métodos especiais de objeto.

Agora vamos entrar nos detalhes técnicos, porque é a única forma de abordar o assunto a fundo.

## Hints

Como o JavaScript decide qual conversão aplicar?

Existem três variantes de conversão de tipo, que acontecem em várias situações. Elas são chamadas de "hints" (dicas), como descrito na [especificação](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: Para uma conversão de objeto para string, quando estamos fazendo uma operação num objeto que espera uma string, como `alert`:

    ```js
    // saída
    alert(obj);

    // usando o objeto como uma chave de propriedade
    anotherObj[obj] = 123;
    ```

`"number"`
: Para uma conversão de objeto para número, como quando estamos fazendo contas:

    ```js
    // conversão explícita
    let num = Number(obj);

    // contas (exceto o mais binário)
    let n = +obj; // mais unário
    let delta = date1 - date2;

    // comparação de menor/maior
    let greater = user1 > user2;
    ```

    A maioria das funções matemáticas nativas também inclui esse tipo de conversão.

`"default"`
: Ocorre em casos raros, quando o operador "não tem certeza" de qual tipo esperar.

    Por exemplo, o mais binário `+` pode funcionar tanto com strings (concatenando-as) quanto com números (somando-os). Então, se um mais binário recebe um objeto como argumento, ele usa o hint `"default"` para convertê-lo.

    Além disso, se um objeto é comparado usando `==` com uma string, número ou symbol, também não fica claro qual conversão deve ser feita, então o hint `"default"` é usado.

    ```js
    // o mais binário usa o hint "default"
    let total = obj1 + obj2;

    // obj == number usa o hint "default"
    if (user == 1) { ... };
    ```

    Os operadores de comparação maior e menor, como `<` `>`, também podem funcionar tanto com strings quanto com números. Ainda assim, eles usam o hint `"number"`, não `"default"`. Isso é por motivos históricos.

Na prática, porém, as coisas são um pouco mais simples.

Todos os objetos nativos, com exceção de um caso (o objeto `Date`, que vamos aprender mais tarde), implementam a conversão `"default"` da mesma forma que `"number"`. E provavelmente deveríamos fazer o mesmo.

Ainda assim, é importante saber sobre os 3 hints, logo veremos por quê.

**Para fazer a conversão, o JavaScript tenta encontrar e chamar três métodos de objeto:**

1. Chama `obj[Symbol.toPrimitive](hint)` - o método com a chave simbólica `Symbol.toPrimitive` (symbol do sistema), se esse método existir,
2. Caso contrário, se o hint for `"string"`
    - tenta chamar `obj.toString()` ou `obj.valueOf()`, o que existir.
3. Caso contrário, se o hint for `"number"` ou `"default"`
    - tenta chamar `obj.valueOf()` ou `obj.toString()`, o que existir.

## Symbol.toPrimitive

Vamos começar pelo primeiro método. Existe um symbol nativo chamado `Symbol.toPrimitive` que deve ser usado para nomear o método de conversão, assim:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // aqui vai o código para converter este objeto para um primitivo
  // ele precisa retornar um valor primitivo
  // hint = um entre "string", "number", "default"
};
```

Se o método `Symbol.toPrimitive` existir, ele é usado para todos os hints, e nenhum outro método é necessário.

Por exemplo, aqui o objeto `user` implementa isso:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// demonstração das conversões:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

Como podemos ver pelo código, `user` se torna uma string autodescritiva ou um valor em dinheiro, dependendo da conversão. O único método `user[Symbol.toPrimitive]` lida com todos os casos de conversão.

## toString/valueOf

Se não existir `Symbol.toPrimitive`, então o JavaScript tenta encontrar os métodos `toString` e `valueOf`:

- Para o hint `"string"`: chama o método `toString`, e se ele não existir ou retornar um objeto em vez de um valor primitivo, então chama `valueOf` (então `toString` tem prioridade para conversões de string).
- Para outros hints: chama `valueOf`, e se ele não existir ou retornar um objeto em vez de um valor primitivo, então chama `toString` (então `valueOf` tem prioridade para contas).

Os métodos `toString` e `valueOf` vêm de tempos antigos. Eles não são symbols (symbols não existiam há tanto tempo), mas sim métodos "normais", nomeados com string. Eles oferecem uma forma alternativa, "de estilo antigo", de implementar a conversão.

Esses métodos precisam retornar um valor primitivo. Se `toString` ou `valueOf` retornar um objeto, então ele é ignorado (o mesmo que se o método não existisse).

Por padrão, um objeto simples tem os seguintes métodos `toString` e `valueOf`:

- O método `toString` retorna uma string, `"[object Object]"`.
- O método `valueOf` retorna o próprio objeto.

Aqui está a demonstração:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

Então, se tentarmos usar um objeto como uma string, como num `alert` ou similar, então por padrão vemos `[object Object]`.

O `valueOf` padrão é mencionado aqui só pelo bem da completude, para evitar qualquer confusão. Como você pode ver, ele retorna o próprio objeto, e por isso é ignorado. Não me pergunte por quê, isso é por motivos históricos. Então podemos considerar que ele não existe.

Vamos implementar esses métodos para personalizar a conversão.

Por exemplo, aqui `user` faz a mesma coisa que acima, usando uma combinação de `toString` e `valueOf` em vez de `Symbol.toPrimitive`:

```js run
let user = {
  name: "John",
  money: 1000,

  // para hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // para hint="number" ou "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

Como podemos ver, o comportamento é o mesmo do exemplo anterior, com `Symbol.toPrimitive`.

Frequentemente queremos um único lugar "pega-tudo" para lidar com todas as conversões de primitivo. Nesse caso, podemos implementar só `toString`, assim:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

Na ausência de `Symbol.toPrimitive` e `valueOf`, `toString` vai lidar com todas as conversões de primitivo.

### Uma conversão pode retornar qualquer tipo primitivo

A coisa importante de se saber sobre todos os métodos de conversão de primitivo é que eles não necessariamente retornam o primitivo "sugerido pelo hint".

Não há nenhuma verificação de que `toString` retorne exatamente uma string, ou de que o método `Symbol.toPrimitive` retorne um número para o hint `"number"`.

A única coisa obrigatória: esses métodos precisam retornar um primitivo, não um objeto.

```smart header="Notas históricas"
Por motivos históricos, se `toString` ou `valueOf` retornar um objeto, não há erro, mas esse valor é ignorado (como se o método não existisse). Isso acontece porque, em tempos antigos, não existia um bom conceito de "erro" no JavaScript.

Em contraste, `Symbol.toPrimitive` é mais rigoroso, ele *precisa* retornar um primitivo, senão vai haver um erro.
```

## Mais conversões

Como já sabemos, muitos operadores e funções realizam conversões de tipo, por exemplo, a multiplicação `*` converte os operandos para números.

Se passarmos um objeto como argumento, então existem duas etapas de cálculo:
1. O objeto é convertido para um primitivo (usando as regras descritas acima).
2. Se necessário para os cálculos seguintes, o primitivo resultante também é convertido.

Por exemplo:

```js run
let obj = {
  // toString lida com todas as conversões na ausência de outros métodos
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, objeto convertido para o primitivo "2", depois a multiplicação o transformou num número
```

1. A multiplicação `obj * 2` primeiro converte o objeto para primitivo (que é a string `"2"`).
2. Então `"2" * 2` vira `2 * 2` (a string é convertida para número).

O mais binário vai concatenar strings na mesma situação, já que ele aceita uma string de bom grado:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // "22" ("2" + 2), a conversão para primitivo retornou uma string => concatenação
```

## Resumo

A conversão de objeto para primitivo é chamada automaticamente por muitas funções e operadores nativos que esperam um primitivo como valor.

Existem 3 tipos (hints) dela:
- `"string"` (para `alert` e outras operações que precisam de uma string)
- `"number"` (para contas)
- `"default"` (poucos operadores, normalmente os objetos implementam da mesma forma que `"number"`)

A especificação descreve explicitamente qual operador usa qual hint.

O algoritmo de conversão é:

1. Chama `obj[Symbol.toPrimitive](hint)` se o método existir,
2. Caso contrário, se o hint for `"string"`
    - tenta chamar `obj.toString()` ou `obj.valueOf()`, o que existir.
3. Caso contrário, se o hint for `"number"` ou `"default"`
    - tenta chamar `obj.valueOf()` ou `obj.toString()`, o que existir.

Todos esses métodos precisam retornar um primitivo para funcionar (se definidos).

Na prática, frequentemente basta implementar só `obj.toString()` como um método "pega-tudo" para conversões de string, que deveria retornar uma representação "legível para humanos" de um objeto, para fins de log ou depuração.
