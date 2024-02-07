# BigInt

[BigInt recentemente adicionado ao caniuse="bigint"]

BigInt é um tipo numérico especial que oferece suporte para inteiros de tamanho arbitrário.

Um bigint é criado anexando `n` ao final de um literal inteiro ou chamando a função `BigInt` que cria BigInts a partir de strings, números, etc.

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // o mesmo que 10n
```

## Operadores matemáticos

`BigInt` pode ser usado principalmente como um número comum, por exemplo:

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

Perceba: a divisão `5/2` retorna o resultado arredondado para zero, sem a parte decimal. Todas as operações com BigInts retornam BigInts.

Não podemos misturar BigInts e números comuns:

```js run
alert(1n + 2); // Erro: Não é possível misturar BigInt e outros tipos
```

Devemos convertê-los explicitamente, se necessário, usando `BigInt()` ou `Number()`, assim:

```js run
let bigint = 1n;
let number = 2;

// number para bigint
alert(bigint + BigInt(number)); // 3

// bigint para number
alert(Number(bigint) + number); // 3
```

As operações de conversão são sempre silenciosas, nunca dão erros, mas se o bigint for muito grande e não couber no tipo número, então bits extras serão cortados, então devemos ter cuidado ao fazer a conversão.

````smart header="O operador mais unário não é suportado em BigInts"
O operador mais unário `+valor` é uma maneira bem conhecida de converter `valor` para um número.

Para evitar confusão, não é suportado em BigInts:
```js run
let bigint = 1n;

alert( +bigint ); // erro
```
Então, devemos usar `Number()` para converter um BigInt em um número.
````

## Comparações

Comparações, como `<`, `>` funcionam bem com BigInts e números:

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

Note que, como números e BigInts pertencem a tipos diferentes, eles podem ser iguais `==`, mas não estritamente iguais `===`:

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

## Operações booleanas

Quando dentro de `if` ou outras operações booleanas, BigInts se comportam como números.

Por exemplo, em `if`, o bigint `0n` é falso, outros valores são verdadeiros:

```js run
if (0n) {
  // nunca executa
}
```
Operadores booleanos, como `||`, `&&` e outros também funcionam com BigInts semelhante aos números:

```js run
alert( 1n || 2 ); // 1 (1n é considerado verdadeiro)

alert( 0n || 2 ); // 2 (0n é considerado falso)
```

## Polyfills

Fazer um polyfill para BigInts é complicado. A razão é que muitos operadores JavaScript, como `+`, `-` e assim por diante se comportam de maneira diferente com BigInts em comparação com números regulares.

Por exemplo, a divisão de BigInts sempre retorna um bigint (arredondado se necessário).

Para emular tal comportamento, um polyfill precisaria analisar o código e substituir todos esses operadores com suas funções. Mas fazer isso é trabalhoso e custaria muito em termos de desempenho.

Então, não há um polyfill bem conhecido e bom.

Apesar disso, o caminho inverso é proposto pelos desenvolvedores da biblioteca [JSBI](https://github.com/GoogleChromeLabs/jsbi).

Esta biblioteca implementa números grandes usando seus próprios métodos. Podemos usá-los em vez de BigInts nativos:

| Operação | `BigInt` nativo | JSBI |
|-----------|-----------------|------|
| Criação a partir de Number | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Adição | `c = a + b` | `c = JSBI.add(a, b)` |
| Subtração	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...E então use o polyfill (plugin do Babel) para converter chamadas JSBI para BigInts nativos para aqueles navegadores que os suportam.

Em outras palavras, essa abordagem sugere que escrevamos código em JSBI em vez de BigInts nativos. Mas o JSBI trabalha com números como se fossem BigInts internamente, emula-os de perto seguindo a especificação, então o código será "pronto para bigint".

Podemos usar esse código JSBI "como está" para motores que não suportam BigInts e para aqueles que suportam - o polyfill converterá as chamadas para BigInts nativos.

## Referências

- [Documentação da MDN sobre BigInt](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
- [Especificação](https://tc39.es/ecma262/#sec-bigint-objects).
