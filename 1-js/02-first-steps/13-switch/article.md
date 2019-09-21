# A instrução "switch"

Uma instrução `switch` pode substituir muitas comparações `se`.

Ela é uma forma mais descritiva de comparar um valor com múltiplas variantes.

## A sintaxe

O `switch` tem um ou mais blocos `case` (caso) e um `default` (padrão) opcional.

Tem uma apresentação similar a:

```js no-beautify
switch(x) {
  case 'valor1':  // if (x === 'valor1')
    ...
    [break]

  case 'valor2':  // if (x === 'valor2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- O valor de `x` é comparado por meio de uma igualdade exata ao valor do primeiro `case` (isto é, ao `valor1`), a seguir ao do segundo (`valor2`) e assim sucessivamente.
- Se uma igualdade é encontrada, o `switch` começa a executar o código a partir do início do `case` correspondente, até ao próximo `break` (ou até ao fim do `switch`).
- Se nenhum `case` é equiparado então o código em `default` é executado (se existir).

## Um exemplo

Um exemplo de `switch` (o código executado está em destaque):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Muito baixo' );
    break;
*!*
  case 4:
    alert( 'Exacto!' );
    break;
*/!*
  case 5:
    alert( 'Muito alto' );
    break;
  default:
    alert( "Não conheço tais valores" );
}
```

Aqui o `switch` começa por comparar `a` à variante no primeiro `case`, que é `3`. A correspondência falha.

Então a `4`. Existe uma correspondência, e assim a execução começa a partir do `case 4` até ao próximo `break`.

**Se não existir um `break` então a execução continua pelo próximo `case` sem quaisquer verificações.**

Um exemplo sem `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Muito baixo' );
*!*
  case 4:
    alert( 'Exacto!' );
  case 5:
    alert( 'Muito alto' );
  default:
    alert( "Não conheço tais valores" );
*/!*
}
```

No exemplo acima, vemos uma execução sequential de três `alert`'s:

```js
alert( 'Exacto!' );
alert( 'Muito alto' );
alert( "Não conheço tais valores" );
```

````smart header="Any expression can be a switch/case argument"
Ambos `switch` e `case` permitem expressões arbitrárias.

Por exemplo:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("isto executa, porque +a é 1, e é exatamente igual a b+1");
    break;
*/!*

  default:
    alert("isto não executa");
}
```
Aqui `+a` dá `1`, o que é comparado a `b + 1` no `case`, e o código correspondente é executado.
````

## Grupos de "case"

Múltiplas variantes de `case` que partihem o mesmo código podem ser agrupadas.

Por exemplo, se quisermos que o mesmo código corra por `case 3` e `case 5`:

```js run no-beautify
let a = 2 + 2;

switch (a) {
  case 4:
    alert('Certo!');
    break;

*!*
  case 3:                    // (*) dois cases agrupados
  case 5:
    alert('Errado!');
    alert("Porque não tem aulas de matemática?");
    break;
*/!*

  default:
    alert('O resultado é stranho. Realmente.');
}
```

Agora ambos `3` e `5` mostram a mesma mensagem.

A habilidade para "agrupar" cases é um efeito secundário de como `switch/case` funciona sem `break`. Aqui a execução do `case 3` começa pela linha `(*)` e prossegue pelo `case 5`, por não existir `break`.

## O tipo importa

Vamos emfatizar que a verificação da igualdade é sempre exata. Os valores devem também ser do mesmo tipo para existir correspondência.

Por exemplo, consideremos o código:

```js run
let arg = prompt("Insira um valor?");
switch (arg) {
  case '0':
  case '1':
    alert( 'Um ou zero' );
    break;

  case '2':
    alert( 'Dois' );
    break;

  case 3:
    alert( 'Nunca executa!' );
    break;
  default:
    alert( 'Um valor desconhecido' );
}
```

1. Para `0`, `1`, o primeiro `alert` executa.
2. Para `2` o segundo `alert` corre.
3. Mas para `3`, o resultado do `prompt` á a string `"3"`, que não é estritamente igual `===` ao número `3`. Assim temos código não
executável em `case 3`! A variante `default` será executada.
