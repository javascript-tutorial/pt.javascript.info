
# Conversão objeto para primitivo

O que acontece quando objetos são adicionados `obj1 + obj2`, subtraídos `obj1 - obj2`, ou imprimidos usando `alert(obj)`?

Existem métodos especiais de objetos que fazem a conversão.

No capítulo <info:type-conversions> vimos as regras para as conversões de primitivos para números, *strings* e boleanos. Mas, deixámos um intervalo para objetos. Agora, como já aprendemos sobre métodos e símbolos, torna-se possível fechá-lo.

Para objetos, não há conversão para boleanos, porque todos os objetos são `true` num contexto boleano. Assim, apenas existem conversões para *strings* e números.

A conversão numérica acontece quando subtraímos objetos, ou aplicamos funções matemáticas. Por exemplo, os objetos `Date` (a serem estudados no capítulo <info:date>) podem ser subtraídos, e o resultado de `date1 - date2` é a diferença temporal entre as datas.

Para a conversão para *string* -- ela geralmente acontece quando imprimimos um objeto, como em `alert(obj)`, e em contextos similares.

## *ToPrimitive*

Quando um objeto é utilizado num contexto onde um primitivo é necessário, por exemplo num `alert` ou em operações matemáticas, é convertido para um valor primitivo usando o algoritmo de `ToPrimitive` ([especificação em Inglês](https://tc39.github.io/ecma262/#sec-toprimitive)).

Esse algoritmo, permite-nos personalizar a conversão empregando um método de objeto especial.

Dependendo do contexto, tem o que se chama de "palpite" (*hint*).

Existem três variantes:

`"string"`
: Quando uma operação espera uma *string*, desta forma em conversões objeto-para-string, como em `alert`:

    ```js
    // saída
    alert(obj);

    // empregando o objeto como chave de propriedade
    anotherObj[obj] = 123;
    ```

`"number"`
: Quando uma operação espera um número, desta forma em conversões objeto-para-número, como em operações matemáticas:

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

    Por exemplo, o mais binário `+` pode trabalhar tanto com *strings* (concatenando-as) como com números (adicionando-os); portanto, quer *stings* como números são aceites. Ou, quando um objeto é comparado `==` a uma *string*, a um número, ou a um símbolo.

    ```js
    // 'mais' binário
    let total = car1 + car2;

    // obj == string/número/símbolo
    if (user == 1) { ... };
    ```

    Os operadores maior/menor do que `<>` também podem trabalhar com *strings* e números. Assim, aceitam o palpite "number", mas não o "default". Isso, por razões históricas.

    Na prática, todos os objetos incorporados (*built-in*), exceto num caso (o objeto `Date`, sobre o qual aprenderemos mais adiante) implementam a conversão `"default"` da mesma forma que a `"number"`. E, nós provavelmente deveriamos fazer o mesmo.

Por favor note -- existem apenas três palpites (*hints*). É assim tão simples. Não há um palpite para "boleano" (todos os objetos são `true` num contexto boleano), ou outro adicional. E, se não fizermos distinção entre `"default"` e `"number"`, como muitos incorporados (*built-ins*) não fazem, então apenas existem duas conversões.

**Para efetuar a conversão, JavaScript tenta encontrar e chama três métodos de objeto:**

1. Chama `obj[Symbol.toPrimitive](hint)` se o método existir,
2. Senão, se o palpite (*hint*) for `"string"`
    - tenta `obj.toString()` e `obj.valueOf()`, o que existir.
3. Senão, se o palpite for `"number"` ou `"default"`
    - tenta `obj.valueOf()` e `obj.toString()`, o que existir.

## *Symbol.toPrimitive*

Vamos começar pelo primeiro método. Existe um símbolo incorporado (*built-in*) chamado `Symbol.toPrimitive` que deverá ser utilizado para nomear o método de conversão, desta forma:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // retorna um valor primitivo
  // hint = "string", ou "number", ou "default"
}
```

Por exemplo, aqui o objeto `user` o implementa:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`palpite: ${hint}`);
    return hint == "string" ? `{nome: "${this.name}"}` : this.money;
  }
};

// demonstrações de conversões:
alert(user); // (palpite: string) -> {nome: "John"}
alert(+user); // (palpite: number) -> 1000
alert(user + 500); // (palpite: default) -> 1500
```

Como podemos observar pelo código, `user` se torna numa *string* auto-descritiva ou numa quantia monetária, dependendo da conversão. Um único método `user[Symbol.toPrimitive]` trata de todos os casos de conversão.


## *toString/valueOf*

Os métodos `toString` e `valueOf` vêm de tempos antigos. Eles não são *symbols* (símbolos não existiam há tanto tempo), mas sim métodos com nomes "comuns". Eles fornecem uma alternativa "à moda antiga" para implementar a conversão.

Se não houver `Symbol.toPrimitive` então JavaScript tenta encontrá-los na seguinte ordem:

- `toString -> valueOf`, para o palpite "string".
- `valueOf -> toString`, para os outros.

Por exemplo, aqui `user` faz o mesmo que acima empregando uma combinação `toString` e `valueOf`:

```js run
let user = {
  name: "John",
  money: 1000,

  // para o palpite="string"
  toString() {
    return `{nome: "${this.name}"}`;
  },

  // para o palpite="number" ou "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // (toString) -> {nome: "John"}
alert(+user); // (valueOf) -> 1000
alert(user + 500); // (valueOf) -> 1500
```

Frequentemente, queremos um local "genérico" (*catch-all*) que trate de todas as conversões para primitivos. Neste caso, podemos apenas implementar `toString`, desta forma:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // (toString) -> John
alert(user + 500); // (toString) -> John500
```

Na ausência de `Symbol.toPrimitive` e `valueOf`, `toString` tratará de todas as conversões para primitivos.


## *ToPrimitive* e *ToString*/*ToNumber*

O importante a saber sobre todos os métodos de conversão para primitivos é que eles não necessariamente retornam o "palpite" de primitivo.

Não existe nenhum controlo sobre se `toString()` retorna exatamente uma *string*, ou se o método `Symbol.toPrimitive` retorna um número aquando de um palpite "number".

**A única coisa mandatória: estes métodos têm que retornar um primitivo.**

Uma operação que precise da conversão obtem esse primitivo, e a seguir continua a trabalhar com ele, aplicando posteriores conversões se necessário.

Por exemplo:

- Operações matemáticas (exceto o 'mais' binário) executam uma conversão `ToNumber`:

    ```js run
    let obj = {
      toString() { // toString trata de todas as conversões, na ausência de outros métodos
        return "2";
      }
    };

    alert(obj * 2); // 4, ToPrimitive fornece "2", que se torna em 2
    ```

- O 'mais' binário verifica o primitivo -- se for uma *string*, então executa a concatenação, noutros casos recorre a `ToNumber` e trabalha com números.

    Exemplo de string:
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (ToPrimitive retornou uma string => concatenação)
    )
    ```

    Exemplo de número:
    ```js run
    let obj = {
      toString() {
        return true;
      }
    };

    alert(obj + 2); // 3 (ToPrimitive retornou um boleano, não string => ToNumber)
    ```

```smart header="Historical notes"
Por razões históricas, os métodos `toString` e `valueOf` *deveriam* retornar um primitivo: se um deles retornar um objeto, não há erro, e esse objeto é ignorado (como se aqueles métodos não existissem).

Em contraste, `Symbol.toPrimitive` *tem* de retornar um primitivo, senão haverá um erro.
```

## Sumário

A conversão objeto-para-primitivo, é automaticamente chamada por muitas funções e operadores incorpordos que esperam um primitivo como valor.

Existem 3 tipos (*hints*) dela:
- `"string"` (para `alert`, e outras conversões para *string*)
- `"number"` (para matemáticas)
- `"default"` (poucos operadores)

A especificação, explícitamente descreve que operador usa qual *hint*. Existem muitos poucos operadores que "não sabem o que esperar" e usam a *hint* `"default"`. Geralmente, para objetos incorporados a *hint* `"default"` é tratada da mesma forma que a `"number"`, pelo que por prática os últimos dois tipos são frequentemente fundidos.

O algoritmo de conversão é:

1. Chame `obj[Symbol.toPrimitive](hint)` se o método existir,
2. Senão, se o tipo é `"string"`
    - tente `obj.toString()` e `obj.valueOf()`, o que existir.
3. Senão, se o tipo é `"number"` ou `"default"`
    - tente `obj.valueOf()` e `obj.toString()`, o que existir.

Na prática, frequentemente basta implementar `obj.toString()` como  método "genérico" para todas as conversões que retornem uma representão "legível" de um objeto, quer para propósitos de *logging* como de *debugging*.  
