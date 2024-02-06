# BigInt

[BigInt recentemente adicionado ao caniuse="bigint"]

BigInt é um tipo numérico especial que oferece suporte para inteiros de comprimento arbitrário.

Um bigint é criado anexando `n` ao final de um literal inteiro ou chamando a função `BigInt` que cria bigints a partir de strings, números, etc.

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // o mesmo que 10n
```

## Operadores matemáticos

`BigInt` pode ser usado principalmente como um número regular, por exemplo:

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

Perceba: a divisão `5/2` retorna o resultado arredondado para zero, sem a parte decimal. Todas as operações com bigints retornam bigints.

Não podemos misturar bigints e números regulares:

```js run
alert(1n + 2); // Erro: Não é possível misturar BigInt e outros tipos
```

Devemos convertê-los explicitamente se necessário: usando `BigInt()` ou `Number()`, assim:

```js run
let bigint = 1n;
let number = 2;

// number para bigint
alert(bigint + BigInt(number)); // 3

// bigint para number
alert(Number(bigint) + number); // 3
```

As operações de conversão são sempre silenciosas, nunca dão erros, mas se o bigint for muito grande e não couber no tipo número, então bits extras serão cortados, então devemos ter cuidado ao fazer a conversão.

````smart header="O operador unário mais não é suportado em bigints"
O operador unário mais `+valor` é uma maneira bem conhecida de converter `valor` para um número.

Para evitar confusão, não é suportado em bigints:
```js run
let bigint = 1n;

alert( +bigint ); // erro
```
Então, devemos usar `Number()` para converter um bigint em um número.
````

## Comparações

Comparações, como `<`, `>` funcionam bem com bigints e números:

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

Note que, como números e bigints pertencem a tipos diferentes, eles podem ser iguais `==`, mas não estritamente iguais `===`:

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

## Operações booleanas

Quando dentro de `if` ou outras operações booleanas, bigints se comportam como números.

Por exemplo, em `if`, o bigint `0n` é falso, outros valores são verdadeiros:

```js run
if (0n) {
  // nunca executa
}
```
Operadores booleanos, como `||`, `&&` e outros também funcionam com bigints semelhante aos números:

```js run
alert( 1n || 2 ); // 1 (1n é considerado verdadeiro)

alert( 0n || 2 ); // 2 (0n é considerado falso)
```

## Polyfills

Fazer polyfill para bigints é complicado. A razão é que muitos operadores JavaScript, como `+`, `-` e assim por diante se comportam de maneira diferente com bigints em comparação com números regulares.

Por exemplo, a divisão de bigints sempre retorna um bigint (arredondado se necessário).

Para emular tal comportamento, um polyfill precisaria analisar o código e substituir todos esses operadores com suas funções. Mas fazer isso é trabalhoso e custaria muito em termos de desempenho.

Então, não há um polyfill bem conhecido e bom.

Embora, o caminho inverso é proposto pelos desenvolvedores da biblioteca [JSBI](https://github.com/GoogleChromeLabs/jsbi).

Esta biblioteca implementa números grandes usando seus próprios métodos. Podemos usá-los em vez de bigints nativos:

| Operação | `BigInt` nativo | JSBI |
|-----------|-----------------|------|
| Criação a partir de Number | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Adição | `c = a + b` | `c = JSBI.add(a, b)` |
| Subtração	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...E então use o polyfill (plugin do Babel) para converter chamadas JSBI para bigints nativos para aqueles navegadores que os suportam.

Em outras palavras, essa abordagem sugere que escrevamos código em JSBI em vez de bigints nativos. Mas o JSBI trabalha com números como se fossem bigints internamente, emula-os de perto seguindo a especificação, então o código será "pronto para bigint".

Podemos usar esse código JSBI "como está" para motores que não suportam bigints e para aqueles que suportam - o polyfill converterá as chamadas para bigints nativos.

## Referências

- [Documentação da MDN sobre BigInt](mdn:/JavaScript/Reference/Global_Objects/BigInt).
- [Especificação](https://tc39.es/ecma262/#sec-bigint-objects).
