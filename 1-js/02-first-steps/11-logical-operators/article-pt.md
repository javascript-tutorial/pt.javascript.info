# Operadores lógicos

Existem três operadores lógicos em JavaScript: `||` (OU), `&&` (E), `!` (NÃO).

Embora eles sejam chamados de "lógicos", podem ser aplicados a valores de qualquer tipo, não apenas a boolean. Seus resultados também podem ser de qualquer tipo.

Vamos ver os detalhes.

## || (OU)

O operador "OU" é representado com dois símbolos de linha vertical:

```js
result = a || b;
```

Na programação clássica, o operador OU é mencionado para manipular apenas valores booleanos. Se qualquer um dos seus argumentos for `true`, ele retorna `true`, se não, retorna `false`.

Em JavaScript, este operador é um pouco mais útil e poderoso. Mas primeir, vamos ver o que acontece com valores booleanos.

Existem quatro combinações lógicas possíveis:

```js run
alert( true || true);   // true
alert( false || true);  // true
alert( true || false);  // true
alert( false || false); // true
```

Como podemos ver, o resultado é sempre `true`, exceto para o caso onde os dois operandos são `false`.

Se um operando não é um boolean, ele é convertido em um boolean para sua verificação.

Sendo assim, o número `1` é tratado com `true` e o número `0` como `false`.

```js run
if (1 || 0) { // funciona como if( true || false)
  alert( 'truthy!');
}
```

Na maioria das vezes, OU `||` é usado dentro de um `if` STATEMENT para testar se *qualquer* uma das condições dadas é `true`.

Por exemplo:

```js run
let hour = 0;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'O escritório está fechado.' );
}
```

Nós podemos passar mais condições:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'O escritório está fechado.' ); // é final de semana
}
```

## OU encontrao primeiro valor verdadeiro

A lógica descrita acima é algo clássico. Agora, vamos ver as funcionalidades "extras" do JavaScript.

O algorítmo extendido funciona da seguinte forma.

Dando múltiplos valores OU's:

```js
result = value1 || value2 || value3;
```

O operador OU `||` faz o seguinte:

- Interpreta os operandos da esquerda para a direita.
- Para cada operando, o converte para boolean. Se o resultado é `true`, para e retorna o valor original daquele operando.
- Se todos os operandos foram interpretados (i.e. todos são `false`), retorna o último operando.

Um valor é retornado na sua forma original, sem conversão.

Em outras palavras, uma cadeia de OU `"||"` retorna o primeiro valor verdadeiro ou o último se nenhum `true` for encontrado.

Por exemplo:

```js run
alert( 1 || 0); // 1 (1 é verdadeiro)
alert( true || 'não importa o quê' ); // (true é verdadeiro)

alert( null || 1); // 1 (1 é o primeiro valor verdadeiro)
alert( null || 0 || 1); // 1 (o primeiro valor verdadeiro)
alert( undefined || null || 0); // 0 (todos falsos, retorna o último valor)
```

Isso nos mostra algumas utilidades interessantes comparadas ao "puro, clássico, apenas-boolean OU".

1. **Obtendo o primeiro valor verdadeiro de uma lista de variáveis ou expressões.**

  Imagine que temos várias variáveis que podem conter algum dado ou ser `null/undefined`. Como podemos encontrar a primeira com algum dado?

  Nós podemos usar OU `||`:

  ```js run
  let currentUser = null;
  let defaultUser = "John";

  *!*
  let name = currentUser || defaultUser || "unnamed";
  */!*

  alert( name ); // seleciona "John" - o primeiro valor verdadeiro
  ```

  Se ambos `currentUser` e `defaultUser` forem falsos, o resultado será `"unnamed"`.
2. **
