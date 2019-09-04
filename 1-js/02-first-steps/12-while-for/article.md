# Loops: while e for

Frequentemente precisamos repetir ações.

Por exemplo, retornar itens de uma lista, um atrás do outro, ou apenas executar o mesmo código para cada número de 1 a 10.

*Loops* são uma maneira de repetir o mesmo código múltiplas vezes.

## O loop "while"

O `while` loop tem a sintaxe seguinte:

```js
while (condição) {
  // código
  // chamado de "loop body" (corpo do loop)
}
```

Enquanto `condição` for verdadeira, o `código` do corpo do loop é executado.

Por exemplo, o loop abaixo retorna `i` enquanto `i < 3`:

```js run
let i = 0;
while (i < 3) { // retorna 0, depois 1, depois 2
  alert( i );
  i++;
}
```

Uma única execução do corpo do loop é chamada de *uma iteração*. O loop no exemplo acima realiza três iterações.

Se `i++` não estivesse presente no exemplo acima, o loop repetiria (teoricamente) para sempre. Na prática, o navegador nos oferece maneira de interromper tais loops, e em JavaScript server-side, é possível matar o processo.

Qualquer expressão ou variável pode ser uma condição para um loop, não apenas comparações: a condição é avaliada e convertida por `while` para um booleano.

Por exemplo, uma maneira mais curta de escrever `while (i != 0)` é `while (i)`:

```js run
let i = 3;
*!*
while (i) { // quando i se tornar 0, a condição se torna falsa, e o loop para
*/!*
  alert( i );
  i--;
}
```

````smart header="Colchetes não são necessários se o corpo possuir só uma linha"
Se o corpo do loop possuir uma única declaração, podemos omitir os colchetes `{...}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## O loop "do..while"

A verificação da condição pode ser movida *abaixo* do corpo do loop utilizando a sintaxe `do..while`:

```js
do {
  // corpo do loop
} while (condição);
```

O loop vai executar primeiro o corpo, depois checar a condição e, enquanto ela permanecer verdadeira, executar o corpo novamente.

Por exemplo:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Esta forma de sintaxe deve ser usada apenas quando você deseja que o corpo do loop seja executado **pelo menos uma vez**, independente de a condição ser verdadeira. Geralmente, prefere-se a outra forma: `while(...) {...}`.

## O loop "for"

O loop `for` é o mais comumente utilizado.

Ele tem esse formato:

```js
for (início; condição; etapa) {
  // ... corpo do loop ...
}
```

Vamos aprender o que significam cada uma dessas partes através de exemplos. O loop abaixo executa `alert(i)` para `i` de `0` a (não incluso) `3`:

```js run
for (let i = 0; i < 3; i++) { // retorna 0, depois 1, depois 2
  alert(i);
}
```

Vamos examinar a declaração `for` parte por parte:

| part     |            |                                                                                |
|----------|------------|--------------------------------------------------------------------------------|
| início   | `i = 0`    | Executado uma vez na entrada do loop.                                          |
| condição | `i < 3`    | Verificada a cada iteração do loop. Se falsa, o loop é interrompido.           |
| etapa    | `i++`      | Executado depois do corpo, a cada iteração, mas antes de verificar a condição. |
| corpo    | `alert(i)` | Executado repetidamente enquanto a condição  for verdadeira.                   |


O algoritmo geral do loop funciona assim:
```
Executar início
→ (se condição verdadeira → executar corpo e executar etapa)
→ (se condição verdadeira → executar corpo e executar etapa)
→ (se condição verdadeira → executar corpo e executar etapa)
→ ...
```

Caso loops sejam novos para você, pode ser útil voltar ao exemplo e reproduzir sua execução passo-a-passo em uma folha de papel.

No nosso exemplo, o que acontece exatamente é isso:

```js
// for (let i = 0; i < 3; i++) alert(i)

// executar condição
let i = 0
// se condição verdadeira → executar corpo e executar etapa
if (i < 3) { alert(i); i++ }
// se condição verdadeira → executar corpo e executar etapa
if (i < 3) { alert(i); i++ }
// se condição verdadeira → executar corpo e executar etapa
if (i < 3) { alert(i); i++ }
// ...encerrar, pois agora i == 3
```

````smart header="Declaração de variável inline"
Aqui, a variável "de contagem" `i` é declarada diretamente no loop. Isso é chamado de declaração de variável "inline". Tais variáveis são visíveis somente no interior do loop.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // erro, variável não existente
```

Ao invés de definir a variável, podemos utilizar uma já existente:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // usando uma variável pré-existente
  alert(i); // 0, 1, 2
}

alert(i); // 3, visível, porque declarada fora do loop
```

````


### Omitindo partes

Qualquer parte de `for` pode ser omitida.

Por exemplo, podemos omitir `início` caso não seja necessário fazer nada no início do loop.

Como neste exemplo:

```js run
let i = 0; // já temos i declarada e atribuída

for (; i < 3; i++) { // "início" não é necessário
  alert( i ); // 0, 1, 2
}
```

Também podemos remover a parte da `etapa`:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Isso torna o loop idêntico a `while (i < 3)`.

Na verdade, podemos remover tudo, criando um loop infinito:

```js
for (;;) {
  // repete sem limites
}
```

Note que os dois pontos-e-vírgulas `;` dentro do `for` devem estar presentes. Caso contrário, haverá um erro de sintaxe.

## Quebrando o loop

Normalmente, um loop se encerra quando sua condição se torna falsa.

Mas podemos forçar a saída a qualquer momento utilizando o comando especial `break`.

Por exemplo, o loop abaixo pede ao usuário uma série de números, e "quebra" quando nenhum número é informado:

```js
let sum = 0;

while (true) {

  let value = +prompt("Digite um número", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Soma: ' + sum );
```

O comando `break` é ativado na linha `(*)` se o usuário deixa a linha em branco ou cancela o diálogo. Ele interrompe o loop imediatamente, passando o controle à primeira linha depois do loop. Neste caso, `alert`.

A combinação "loop infinito " `break` quando necessário" é ótima para situações onde a condição do loop precisa ser verificada não no início ou no fim do loop, mas no meio, ou até mesmo em vários lugares do corpo do loop.

## Continue para a próxima iteração [#continue]

O comando `continue` é uma "versão mais light" de `break`. Ele não interrompe o loop como um todo. Ao invés disso, ele interrompe a iteração atual e força o loop a começar uma nova (se a condição permitir).

Você pode utilizá-lo caso a iteração atual já não seja útil e você deseje passar para a próxima.

O loop abaixo usa `continue` para exibir apenas valores ímpares:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // se verdadeiro, pular o restante do corpo
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

Para valores pares de `i`, o comando `continue` interrompe a execução do corpo e passa o controle para a próxima iteração de `for` (com o número seguinte). Então `alert` só é chamado para valores ímpares.

````smart header="O comando `continue` ajuda a reduzir aninhamento"
Um loop que retorna apenas valores ímpares poderia ter a seguinte forma:

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

De uma perspectiva técnica, isso é idêntico ao exemplo anterior. Certamente, podemos apenas envolver o código em um bloco `if` ao invés de utilizar `continue`.

Mas como efeito colateral, isso criou mais um nível de aninhamento (o `alert` dentro dos colchetes). Se o código dentro de `if` for mais longo do que algumas linhas, isso pode reduzir a legibilidade de forma geral.
````

````warn header="Não utilize `break/continue` do lado direito de '?'"
Note que construções sintáticas que não sejam expressões não podem ser utilizados com o operador ternário `?`. Em particular, comandos como `break/continue` não são permitidos nesta posição.

Por exemplo, se tomarmos este código:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...e reescrevermos utilizando o ponto de interrogação:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue não é permitido aqui
```

...ele para de funcionar. Códigos como este vão gerar um erro de sintaxe.

Esta é apenas mais uma razão para não utilizar o operador ternário `?` no lugar de `if`.
````

## Labels for break/continue

Às vezes, precisamos quebrar vários loops aninhados de uma vez só.

Por exemplo, no código abaixo nós utilizamos dois loops, com `i` e `j`, dando as coordenadas `(i, j)` de `(0,0)` a `(3,3)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Valor nas coordenadas (${i},${j})`, '');

    // e se quisermos sair daqui diretamente para "Pronto" (abaixo)?
  }
}

alert('Pronto!');
```

Precisamos de uma maneira de interromper o processo caso o usuário cancele o input.

O `break` comum depois de `input` quebraria apenas o loop interno. Isso não é suficiente--labels, ao resgate!

Um *label* é um identificador com dois pontos antes de um loop:
```js
labelName: for (...) {
  ...
}
```

A declaração `break <labelName>` no loop abaixo quebra o loop designado pelo label:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Valor nas coordenadas (${i},${j})`, '');

    // se retornar um string vazio ou cancelar, quebrar ambos os loops
    if (!input) *!*break outer*/!*; // (*)

    // fazer algo com input...
  }
}
alert('Pronto!');
```

No código acima, `break outer` procura acima dele o label chamado `outer` e quebra aquele loop.

Assim o controle vai direto de `(*)` para `alert('Pronto!')`.

Também podemos colocar o label em uma linha separada:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

O comando `continue` também pode ser utilizado com um label. Nesse caso, a execução do código pula para a próxima iteração do loop nomeado pelo label.

````warn header="Labels não significam \"ir para\""
Labels não nos permitem pular para qualquer lugar do código.

Por exemplo, é impossível fazer isso:
```js
break label;  // pula para label? Não.

label: for (...)
```

Uma chamada de `break/continue` só é possível de dentro de  um loop e o label deve estar em algum lugar acima do comando.
````

## Resumo

Nós cobrimos 3 tipos de loops:

- `while` -- A condição é verificada antes de cada iteração.
- `do..while` -- A condição é verificada após cada iteração.
- `for (;;)` -- A condição é verificada antes de cada iteração, configurações adicionais disponíveis.

Para fazer um loop "infinito", geralmente se utiliza a construção `white(true)`. Este loop, como qualquer outro, pode ser interrompido com o comando `break`.

Se não quisermos fazer nada na iteração atual e gostaríamos de pular para a próxima iteração, podemos utilizar o comando `continue`.

`break/continue` suportam labels antes do loop. Um label é a única maneira de fazer  um `break/continue` escapar um loop aninhado e ir para o loop de fora.