
# Conversão objeto para primitivo

O que acontece quando objetos são adicionados `obj1 + obj2`, subtraídos `obj1 - obj2`, ou exibidos usando `alert(obj)`?

Aí, os objetos são auto-convertidos para primitivos, e depois a operação é executada.

No capítulo <info:type-conversions> vimos regras para as conversões de primitivos para números, *strings* e booleanos. Mas, deixámos um intervalo para objetos. Agora, como já aprendemos sobre métodos e símbolos, se torna possível o fechar.

1. Todos os objetos são `true` num contexto booleano. Apenas existem as conversões para *strings* e numérica.
2. A conversão numérica acontece quando subtraímos objetos, ou aplicamos funções matemáticas. Por exemplo, os objetos `Date` (a serem estudados no capítulo <info:date>) podem ser subtraídos, e o resultado de `date1 - date2` é a diferença temporal entre duas datas.
3. Para a conversão para *string* -- ela geralmente acontece quando exibimos um objeto, como em `alert(obj)`, e em contextos similares.

## *ToPrimitive*

Nós, podemos afinar as conversões para *string* e numérica empregando métodos de objeto especiais.

Existem três variantes de conversão de tipo de dados, também chamadas de "sugestões" (*hints*), descritas na [especificação (em Inglês)](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: Para uma conversão objeto-string, quando estivermos a fazer uma operação num objeto mas à espera de uma *string* como resultado, a exemplo de `alert`:

    ```js
    // exibindo
    alert(obj);

    // usando o objeto como chave de propriedade
    anotherObj[obj] = 123;
    ```

`"number"`
:Para uma conversão objeto-número, como em operações matemáticas:

    ```js
    // conversão explícita
    let num = Number(obj);

    // operações matemáticas (exceto o 'mais' binário)
    let n = +obj; // 'mais' unário
    let delta = date1 - date2;

    // comparação maior/menor do que
    let greater = user1 > user2;
    ```

`"default"`
: Ocorre em casos raros, quando o operador "não está certo" de que tipo esperar.

    Por exemplo, o mais binário `+` pode trabalhar tanto com *strings* (as concatena) como com números (os adiciona), portanto quer *stings* como números são aceites. Assim, se um mais binário tiver um objeto como argumento, ele utiliza a sugestão `"default"` para o converter.
    
    De igual modo, se um objeto for comparado a uma *string*, a um número ou a um símbolo usando `==`, também não está claro que conversão deve ser feita, então a sugestão `"default"` é utilizada.

    ```js
    // o 'mais' binário usa a sugestão "default"
    let total = car1 + car2;

    // obj == number usa a sugestão "default"
    if (user == 1) { ... };
    ```

    Os operadores de comparação maior/menor do que, tais como `<` `>`, também podem trabalhar tanto com *strings* como com números. Contudo, eles usam a sugestão `"number"`, não a `"default"`. Isto, por razões históricas.

    Na prática, na verdade, nós não precisamos de nos lembrar desses pequenos detalhes, porque todos os objetos incorporados, exceto num caso (o objeto `Date`, sobre o qual iremos aprender mais adiante) implementam a conversão `"default"` da mesma forma que a `"number"`. E nós podemos fazer o mesmo.

```smart header="Nenhuma sugestão `\"boolean\"`"
Por favor note -- existem apenas três sugestões (*hints*). É assim tão simples.

Não há uma sugestão para "booleano" (todos os objetos são `true` num contexto booleano), nem outras sugestões. E, se não fizermos distinção entre `"default"` e `"number"`, como muitos incorporados não fazem, então apenas existem duas conversões.
```

**Para efetuar a conversão, o JavaScript tenta encontrar e chama três métodos de objeto:**

1. Chama `obj[Symbol.toPrimitive](hint)` se o método existir,
2. Senão, se a sugestão for `"string"`
    - tenta `obj.toString()` e `obj.valueOf()`, o que existir.
3. Senão, se a sugestão for `"number"` ou `"default"`
    - tenta `obj.valueOf()` e `obj.toString()`, o que existir.

## *Symbol.toPrimitive*

Vamos começar pelo primeiro método. Existe um símbolo incorporado chamado `Symbol.toPrimitive` que deverá ser utilizado para dar nome ao método de conversão, desta forma:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // tem de retornar um valor primitivo
  // hint = "string", ou "number", ou "default"
}
```

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

Os métodos `toString` e `valueOf` vêm de tempos antigos. Eles não são *symbols* (símbolos não existiam há tanto tempo), mas sim métodos com nomes "comuns". Eles fornecem uma alternativa "à moda antiga" para implementar a conversão.

Se não houver `Symbol.toPrimitive` então o JavaScript os tenta encontrar na seguinte ordem:

- `toString -> valueOf` para a sugestão "string".
- `valueOf -> toString` para as outras.

Estes métodos têm de retornar um valor primitivo. Se `toString` ou `valueOf` retornarem um objeto, este é ignorado (como se o método não existisse).

Por padrão, um objeto simples possui os seguintes métodos `toString` e `valueOf`:

- O método `toString` retorna uma string `"[object Object]"`.
- O método `valueOf` retorna o próprio objeto.

Aqui está um exemplo:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

Assim, se tentarmos usar um objeto como uma *string*, como em `alert` ou similar, então por padrão nós iremos ver `[object Object]`.

E o valor padrão de `valueOf` está aqui mencionado apenas por completude, para evitar qualquer confusão. Como você pode ver, ele retorna o próprio objeto, e por isso este é ignorado. Não me pergunte porquê, é por razões históricas. Então, podemos assumir que o método não existe.

Vamos implementar estes métodos.

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

## Tipos de dados retornados

O importante a saber sobre todos os métodos de conversão para primitivos, é que eles não necessariamente retornam o primitivo "sugerido".

Não existe nenhum controlo sobre se `toString()` retorna exatamente uma *string*, ou se o método `Symbol.toPrimitive` retorna um número para uma sugestão `"number"`.

A única coisa mandatória: estes métodos têm de retornar um primitivo, não um objeto.

```smart header="Notas históricas"
Por razões históricas, se `toString` ou `valueOf` retornarem um objeto, não haverá erro, mas esse valor é ignorado (como se o método não existisse). Isto, porque antigamente não havia um bom conceito de "erro" em JavaScript.

Em contraste, `Symbol.toPrimitive` *tem de* retornar um primitivo, caso contrário haverá um erro.
```

## Outras conversões

Como já sabemos, muitos operadores e funções executam conversões de tipo de dados, por ex. a multiplicação `*` converte os operandos para números.

Se, nós fornecermos um objeto como um argumento, então haverão dois estágios:
1. O objeto é convertido para um primitivo (usando as regras descritas acima).
2. Se, o primitivo resultante não for do tipo certo, é convertido.

Por exemplo:

```js run
let obj = {
  // toString trata de todas as conversões, na ausência de outros métodos
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, objeto convertido para primitivo "2", então a multiplicação o transformou num número
```

1. A multiplicação `obj * 2` primeiro converte o objeto para primitivo (esse é a *string* `"2"`).
2. A seguir, `"2" * 2` se torna em `2 * 2` (a *string* é convertida para número).

Numa situação semelhante, o 'mais' binário irá concatenar *strings*, pois ele com satisfação aceita uma *string*.

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), a conversão para primitivo retornou uma string => concatenação
```

## Sumário

A conversão objeto-para-primitivo, é automaticamente chamada por muitas funções e operadores incorporados que esperam um primitivo como valor.

Existem 3 tipos (*hints*) dela:
- `"string"` (para `alert`, e outras operações que precisam duma *string*)
- `"number"` (para matemáticas)
- `"default"` (poucos operadores)

A especificação, explícitamente descreve que operador usa que *hint*. Existem muitos poucos operadores que "não sabem o que esperar" e usam a *hint* `"default"`. Geralmente, para objetos incorporados a *hint* `"default"` é tratada da mesma forma que a `"number"`, pelo que na prática os últimos dois tipos são frequentemente fundidos.

O algoritmo de conversão é:

1. Chame `obj[Symbol.toPrimitive](hint)` se o método existir,
2. Senão, se *hint* for `"string"`
    - tente `obj.toString()` e `obj.valueOf()`, o que existir.
3. Senão, se o *hint* for `"number"` ou `"default"`
    - tente `obj.valueOf()` e `obj.toString()`, o que existir.

Na prática, frequentemente basta apenas implementar `obj.toString()` como método "genérico" para todas as conversões que retornem uma representação "legível" de um objeto, quer para propósitos de *logging* como de *debugging*.  
