
# Conversão objeto para primitivo

O que acontece quando objetos são adicionados `obj1 + obj2`, subtraídos `obj1 - obj2`, ou exibidos usando `alert(obj)`?

O JavaScript não permite customizar com exatidão como operadores devem trabalhar com objetos. Ao contrário de outras linguagens de programação como Ruby ou C++, nós não podemos implementar um método de objeto especial para lidar com uma adição (ou outras operações).

Para tais operações, os objetos são auto-convertidos para primitivos, e depois a operação é executada sobre tais primitivos e o resultado é um valor primitivo.

Esta é uma importante limitação, pois o resultado de `obj1 + obj2` não pode ser um outro objeto.

Por ex., nós não podemos criar objetos representando vetores ou matrizes (ou conquistas, ou outros), adicioná-los e esperar um objecto "soma" como resultado. Tais efeitos especiais estão automáticamente "fora de questão".

Portanto, como nós não podemos fazer muito neste campo, não há operações matemáticas com objetos em projetos reais. Quando isto acontece, geralmente é devido a um erro no código.

Neste capítulo, vamos estudar como um objeto é convertido para primitivo, e como o customizar.

Nós temos dois objetivos:

1. Isto nos irá permitir perceber o que se passa no caso de erros de código, quando uma operação ocorrer acidentalmente.
2. Exceções, onde tais operações são possíveis e têm um bom resultado. Por ex., subtraindo ou comparando datas (objetos `Date`). Vamos vê-las mais adiante.

## Regras de conversão

No capítulo <info:type-conversions> nós vimos regras para as conversões de primitivos para números, para *strings* e para booleanos. Mas, deixámos um espaço aberto para objetos. Agora, como já aprendemos sobre métodos e símbolos, é possível fechá-lo.

1. Todos os objetos são `true` num contexto booleano. Assim, apenas existem as conversões para *string* e numérica.
2. A conversão numérica acontece quando subtraímos objetos, ou aplicamos outras funções matemáticas. Por exemplo, os objetos `Date` (a serem estudados no capítulo <info:date>) podem ser subtraídos, e o resultado de `date1 - date2` é a diferença temporal entre duas datas.
3. A conversão para *string* -- geralmente acontece quando exibimos um objeto, como em `alert(obj)`, e em contextos similares.

Nós podemos afinar as conversões para *string* e numérica empregando métodos especiais de objeto.

Existem três variantes para a conversão de tipo de dados, que ocorrem em várias situações.

Elas são chamadas de "sugestões" (*hints*), como descrito na [especificação (em Inglês)](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: Para uma conversão objeto-string, quando estivermos a fazer uma operação num objeto mas à espera de uma *string* como resultado, a exemplo de em `alert`:

    ```js
    // exibindo
    alert(obj);

    // usando o objeto como chave de propriedade
    anotherObj[obj] = 123;
    ```

`"number" (número)`
: Para uma conversão objeto-número, a exemplo de em operações matemáticas:

    ```js
    // conversão explícita
    let num = Number(obj);

    // operações matemáticas (exceto o 'mais' binário)
    let n = +obj; // 'mais' unário
    let delta = date1 - date2;

    // comparação maior/menor do que
    let greater = user1 > user2;
    ```

`"default" (padrão)`
: Ocorre em casos raros, quando o operador "não está certo" de que tipo esperar.

    Por exemplo, o mais binário `+` pode trabalhar tanto com *strings* (concatenando-as) como com números (adicionando-os), portanto quer *stings* como números são aceites. Assim, se um 'mais' binário tiver um objeto como argumento, ele utiliza a sugestão `"default"` para o converter.
    
    De igual modo, se um objeto for comparado usando `==`, quer a uma *string*, como a um número ou a um símbolo, também não está claro que conversão deve ser feita, então a sugestão `"default"` é utilizada.

    ```js
    // o 'mais' binário usa a sugestão "default"
    let total =  obj1 + obj2;

    // 'obj == number' usa a sugestão "default"
    if (user == 1) { ... };
    ```

    Os operadores de comparação maior/menor do que, tais como `<` `>`, também podem trabalhar tanto com *strings* como com números. Contudo, eles usam a sugestão `"number"`, não a `"default"`. Isto, por razões históricas.

    Na prática, na verdade, nós não precisamos de nos lembrar desses pequenos detalhes, porque todos os objetos incorporados à linguagem, exceto num caso (o objeto `Date`, sobre o qual iremos aprender mais adiante) implementam a conversão `"default"` da mesma maneira que a `"number"`. E nós podemos fazer o mesmo.

```smart header="Nenhuma sugestão `\"boolean\"`"
Por favor note -- existem apenas três sugestões (*hints*). É tão simples assim.

Não há uma sugestão para "booleano" (todos os objetos são `true` num contexto booleano), nem outras sugestões. E, se não fizermos distinção entre `"default"` e `"number"`, como muitos incorporados à linguagem não fazem, então apenas existem duas conversões.
```

**Para fazer a conversão, o JavaScript tenta encontrar e chamar três métodos de objeto:**

1. Chama `obj[Symbol.toPrimitive](hint)` - o método com a chave simbólica `Symbol.toPrimitive` (símbolo da linguagem), se o método existir,
2. Senão, se a sugestão for `"string"`
    - tenta `obj.toString()` ou `obj.valueOf()`, o que existir.
3. Senão, se a sugestão for `"number"` ou `"default"`
    - tenta `obj.valueOf()` ou `obj.toString()`, o que existir.

## *Symbol.toPrimitive*

Vamos começar pelo primeiro método. Existe um símbolo incorporado à linguagem, chamado `Symbol.toPrimitive`, que deve ser utilizado para atribuir um nome ao método de conversão, desta forma:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // aqui se coloca o código para converter este objeto para primitivo,
  // ele tem de retornar um valor primitivo
  // hint = "string", ou "number", ou "default"
}
```

Se o método `Symbol.toPrimitive` existir, ele é utilizado para todas as sugestões, e nenhum mais outro método é necessário.

Por exemplo, aqui o objeto `user` o implementa:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`sugestão: ${hint}`);
    return hint == "string" ? `{nome: "${this.name}"}` : this.money;
  }
};

// exemplos de conversões:
alert(user); // sugestão: string -> {nome: "John"}
alert(+user); // sugestão: number -> 1000
alert(user + 500); // sugestão: default -> 1500
```

Como podemos ver pelo código, `user` se torna numa *string* auto-descritiva ou numa quantia monetária, dependendo da conversão. Um único método `user[Symbol.toPrimitive]` trata de todos os casos de conversão.


## *toString/valueOf*

Se não houver `Symbol.toPrimitive` então o JavaScript tenta encontrar os métodos `toString` ou `valueOf`:

- Para a sugestão "string": `toString`, e se ele não existir, então `valueOf` (portanto, `toString` tem prioridade em conversões para *string*).
- Para outras sugestões: `valueOf`, e se ele não existir, então `toString` (portanto, `valueOf` tem prioridade em operações matemáticas).

Os métodos `toString` e `valueOf` vêm de tempos antigos. Eles não são *symbols* (símbolos não existiam há tanto tempo), mas sim métodos com nomes "comuns". Eles fornecem uma alternativa "à moda antiga" para implementar a conversão.

Estes métodos têm de retornar um valor primitivo. Se `toString` ou `valueOf` retornar um objeto, este é ignorado (é o mesmo caso os métodos não existam).

Por padrão, um objeto simples possui os métodos `toString` e `valueOf`:

- O método `toString` retorna uma string `"[object Object]"`.
- O método `valueOf` retorna o próprio objeto.

Aqui está um exemplo:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

Assim, se tentarmos usar um objeto como uma *string*, como em `alert` ou similar, então por padrão nós iremos ver `[object Object]`.

E o método padrão `valueOf` está aqui mencionado apenas por completude, para evitar qualquer confusão. Como você pode ver, ele retorna o próprio objeto, e por isso é ignorado. Não me pergunte porquê, é assim por razões históricas. Então, podemos assumir que o método não exista.

Vamos implementar estes métodos para customizar a conversão.

Por exemplo, aqui `user` faz o mesmo que acima usando uma combinação de `toString` e `valueOf` em vez de `Symbol.toPrimitive`:

```js run
let user = {
  name: "John",
  money: 1000,

  // para hint="string"
  toString() {
    return `{nome: "${this.name}"}`;
  },

  // para hint="number" ou "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {nome: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

Como podemos ver, o resultado é o mesmo que no exemplo anterior com `Symbol.toPrimitive`.

Frequentemente, queremos um único local "genérico" (*catch-all*) para tratar de todas as conversões para primitivos. Nesse caso, podemos só implementar `toString`, desta forma:

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

Na ausência de `Symbol.toPrimitive` e `valueOf`, `toString` irá tratar de todas as conversões para primitivos.

### Uma conversão pode retornar qualquer tipo primitivo

O importante a saber sobre todos os métodos de conversão para primitivos, é que eles não necessariamente retornam o primitivo "sugerido".

Não existe nenhum controlo sobre se `toString()` retorna exatamente uma *string*, ou se o método `Symbol.toPrimitive` retorna um número para uma sugestão `"number"`.

A única coisa mandatória: estes métodos têm de retornar um primitivo, não um objeto.

```smart header="Notas históricas"
Por razões históricas, se `toString` ou `valueOf` retornar um objeto, não haverá erro, mas esse valor é ignorado (como se o método não existisse). Isto, porque antigamente não havia um bom conceito de "erro" em JavaScript.

Em contraste, `Symbol.toPrimitive` *tem de* retornar um primitivo, caso contrário haverá um erro.
```

## Outras conversões

Como já sabemos, muitos operadores e funções executam conversões de tipo de dados. Por ex., a multiplicação `*` converte os operandos para números.

Se, nós fornecermos um objeto como argumento, então haverão dois estágios:
1. O objeto é convertido para um primitivo (usando as regras acima descritas).
2. Se, o primitivo resultante não for do tipo certo, é convertido.

Por exemplo:

```js run
let obj = {
  // toString trata de todas as conversões, na ausência de outros métodos
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, objeto convertido para primitivo "2", então a multiplicação o transforma num número
```

1. A multiplicação `obj * 2` primeiro converte o objeto para primitivo (esse é a *string* `"2"`).
2. A seguir, `"2" * 2` se torna em `2 * 2` (a *string* é convertida para número).

Numa situação semelhante, o 'mais' binário irá concatenar *strings*, pois ele com satisfação aceita *strings*.

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), a conversão para primitivo retornou uma string => concatenação
```

## Sumário

A conversão objeto-para-primitivo, é automaticamente chamada por muitas funções e operadores incorporados à linguagem que esperam um primitivo como valor.

Existem 3 tipos (*hints*) dela:
- `"string"` (para `alert`, e outras operações que precisam duma *string*)
- `"number"` (para matemáticas)
- `"default"` (poucos operadores)

A especificação, explícitamente descreve que operador usa que tipo. Existem muitos poucos operadores que "não sabem o que esperar" e usam o tipo `"default"`. Geralmente, para objetos incorporados à linguagem o tipo `"default"` é tratado da mesma maneira que o `"number"`, pelo que na prática os últimos dois tipos acima são frequentemente fundidos.

O algoritmo de conversão é:

1. Chame `obj[Symbol.toPrimitive](hint)` se o método existir,
2. Senão, se *hint* for `"string"`
    - tente `obj.toString()` ou `obj.valueOf()`, o que existir.
3. Senão, se o *hint* for `"number"` ou `"default"`
    - tente `obj.valueOf()` ou `obj.toString()`, o que existir.

Na prática, frequentemente basta apenas implementar `obj.toString()` como método "genérico" para conversões para *string* que deveriam retornar uma representação "legível" de um objeto, quer para propósitos de *logging* como de *debugging*.  

Para operações matemáticas, o JavaScript não provê uma forma de "customizá-las" usando métodos, assim projetos na vida real raramente as usam com objetos.
