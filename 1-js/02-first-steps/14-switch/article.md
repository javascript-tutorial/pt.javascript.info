# A expressão "switch"

A expressão `switch` pode substituir multiplas verificações de `if`.

Ela permite uma forma mais descritiva de comparar um valor com multiplas variantes.

## A sintaxe

O switch tem um ou mais blocos `case` e uma opção padrão.

Ela se parece com isso:

``` js no-beautify
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

- O valor de `x` é verificado por uma igualdade estrita para o valor do primeiro `case` (que é, `valor1`) então o segundo (`valor2`) e assim em diante.
- se a igualdade é encontrada, `switch` inicia a execução do código do `case` correspondente até o `break` mais próximo (ou até o final do `switch`).
- Se nenhum caso for correspondente, então o código `default` é executado (se ele existe).

## Um exemplo

Um exemplo de `switch` (o código executado está em destaque):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Muito pequeno' );
    break;
*!*
  case 4:
    alert( 'Exatamente!' );
    break;
*/!*
  case 5:
    alert( 'Muito grande' );
    break;
  default:
    alert( "Eu não conheço tais valores" );
}
```

Aqui o `switch` começa a comparar `a` da primeira variação de `case` que é `3`. A correspondência falha.

Então `4`, que é correspondente, inicia sua execução do `case 4` até o próximo `break`.

**Se não há um `break`, então a execução continua com o próximo `case` sem qualquer verificação.**

Um exemplo sem `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Muito pequeno' );
*!*
  case 4:
    alert( 'Exatamente!' );
  case 5:
    alert( 'Muito grande' );
  default:
    alert( "Eu não conheço tais valores" );
*/!*
}
```

No exemplo acima nós vemos uma execução sequencial de três `alert`s:

```js
alert( 'Exatamente!' );
alert( 'Muito grande' );
alert( "Eu não conheço tais valores" );
```

````smart header="Qualquer expressão pode ser um argumento `switch/case`
Ambos, `switch` e `case` permitem expressões arbitrárias.

Por exemplo:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("Este executa porque +a é 1, exatamente igual a b+1");
    break;
*/!*

  default:
    alert("Este não executa");
}
```
Aqui `+a` dá `1`, que é comparado com `b + 1` no `case`, e a correspondência é executada.
````

## Agrupamento de "case"

Diversas variações de `case` que compartilham o mesmo código podem ser agrupadas.

Por exemplo, se nós queremos que o mesmo código execute para o `case 3` e `case 5`:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Correto!');
    break;

*!*
  case 3: // (*) grouped two cases
  case 5:
    alert('Errado!');
    alert("Por que você não estuda Matemática?");
    break;
*/!*

  default:
    alert('O resultado é estranho. Realmente.');
}
```

Agora ambos `3` e ``5` exibem a mesma mensagem.

A habilidade de agrupar casos é um efeito colateral de como `switch/case` funciona sem `break`. Aqui a execução de `case 3` inicia da linha `(*)` e vai até o `case 5` porque não há `break`.

## Tipo importa

Vamos enfatizar que a igualdade é sempre verificada estritamente. Os valores precisam ser do mesmo tipo para corresponder.

Por exemplo, vamos considerar o código:

```js run
let arg = prompt("Entre com um valor?");
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

1. Para `0` e `1` o primeiro `alert` executa.
2. Para `2` o segundo `alert` executa.
3. Mas para `3`, o resultado do `prompt` é uma string `"3"`, que não é estritamente igual `===` ao número `3`. Então nós temos um código morto no `case 3`! A variação `default` será executada.