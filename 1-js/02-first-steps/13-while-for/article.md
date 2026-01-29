# Laços: while e for

Frequentemente precisamos repetir ações.

Por exemplo, exibir produtos de uma lista um após o outro, ou apenas executar o mesmo código para cada número de 1 a 10.

*Laços* são uma forma de repetir o mesmo código múltiplas vezes.

```smart header="Os laços for..of e for..in"
Um pequeno aviso para leitores avançados.

Este artigo cobre apenas laços básicos: `while`, `do..while` e `for(..;..;..)`.

Se você veio a este artigo procurando outros tipos de laços, aqui estão as referências:

- Veja [for..in](info:object#forin) para iterar sobre propriedades de objetos.
- Veja [for..of](info:array#loops) e [iteráveis](info:iterable) para iterar sobre arrays e objetos iteráveis.

Caso contrário, por favor continue lendo.
```

## O laço "while"

O laço `while` tem a seguinte sintaxe:

```js
while (condition) {
  // código
  // chamado de "corpo do laço"
}
```

Enquanto a `condition` for verdadeira, o `código` do corpo do laço é executado.

Por exemplo, o laço abaixo exibe `i` enquanto `i < 3`:

```js run
let i = 0;
while (i < 3) { // mostra 0, depois 1, depois 2
  alert( i );
  i++;
}
```

Uma única execução do corpo do laço é chamada de *iteração*. O laço no exemplo acima faz três iterações.

Se `i++` estivesse faltando no exemplo acima, o laço repetiria (em teoria) para sempre. Na prática, o navegador fornece formas de parar tais laços, e no JavaScript do lado do servidor, podemos encerrar o processo.

Qualquer expressão ou variável pode ser uma condição de laço, não apenas comparações: a condição é avaliada e convertida para um booleano pelo `while`.

Por exemplo, uma forma mais curta de escrever `while (i != 0)` é `while (i)`:

```js run
let i = 3;
*!*
while (i) { // quando i se torna 0, a condição se torna falsa, e o laço para
*/!*
  alert( i );
  i--;
}
```

````smart header="Chaves não são necessárias para um corpo de uma única linha"
Se o corpo do laço tem uma única instrução, podemos omitir as chaves `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## O laço "do..while"

A verificação da condição pode ser movida para *abaixo* do corpo do laço usando a sintaxe `do..while`:

```js
do {
  // corpo do laço
} while (condition);
```

O laço primeiro executa o corpo, depois verifica a condição, e, enquanto ela for verdadeira, executa novamente e novamente.

Por exemplo:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Esta forma de sintaxe deve ser usada apenas quando você quer que o corpo do laço execute **pelo menos uma vez**, independentemente da condição ser verdadeira. Geralmente, a outra forma é preferida: `while(…) {…}`.

## O laço "for"

O laço `for` é mais complexo, mas também é o laço mais comumente usado.

Ele se parece com isto:

```js
for (begin; condition; step) {
  // ... corpo do laço ...
}
```

Vamos aprender o significado dessas partes pelo exemplo. O laço abaixo executa `alert(i)` para `i` de `0` até (mas não incluindo) `3`:

```js run
for (let i = 0; i < 3; i++) { // mostra 0, depois 1, depois 2
  alert(i);
}
```

Vamos examinar a instrução `for` parte por parte:

| parte  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `let i = 0`    | Executa uma vez ao entrar no laço.                                      |
| condition | `i < 3`| Verificada antes de cada iteração do laço. Se falsa, o laço para.              |
| body | `alert(i)`| Executa repetidamente enquanto a condição for verdadeira.                         |
| step| `i++`      | Executa após o corpo em cada iteração. |

O algoritmo geral do laço funciona assim:

```
Executa begin
→ (se condition → executa body e executa step)
→ (se condition → executa body e executa step)
→ (se condition → executa body e executa step)
→ ...
```

Ou seja, `begin` executa uma vez, e então itera: após cada teste de `condition`, `body` e `step` são executados.

Se você é novo em laços, pode ajudar voltar ao exemplo e reproduzir como ele executa passo a passo em um pedaço de papel.

Aqui está exatamente o que acontece no nosso caso:

```js
// for (let i = 0; i < 3; i++) alert(i)

// executa begin
let i = 0
// se condition → executa body e executa step
if (i < 3) { alert(i); i++ }
// se condition → executa body e executa step
if (i < 3) { alert(i); i++ }
// se condition → executa body e executa step
if (i < 3) { alert(i); i++ }
// ...fim, porque agora i == 3
```

````smart header="Declaração de variável em linha"
Aqui, a variável "contador" `i` é declarada diretamente no laço. Isto é chamado de declaração de variável "em linha". Tais variáveis são visíveis apenas dentro do laço.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // erro, não existe tal variável
```

Em vez de definir uma variável, poderíamos usar uma existente:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // usa uma variável existente
  alert(i); // 0, 1, 2
}

alert(i); // 3, visível, porque declarada fora do laço
```
````

### Omitindo partes

Qualquer parte do `for` pode ser omitida.

Por exemplo, podemos omitir `begin` se não precisamos fazer nada no início do laço.

Como aqui:

```js run
let i = 0; // já temos i declarada e atribuída

for (; i < 3; i++) { // não precisa de "begin"
  alert( i ); // 0, 1, 2
}
```

Também podemos remover a parte `step`:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Isso torna o laço idêntico a `while (i < 3)`.

Na verdade, podemos remover tudo, criando um laço infinito:

```js
for (;;) {
  // repete sem limites
}
```

Por favor note que os dois ponto-e-vírgulas `;` do `for` devem estar presentes. Caso contrário, haveria um erro de sintaxe.

## Interrompendo o laço

Normalmente, um laço termina quando sua condição se torna falsa.

Mas podemos forçar a saída a qualquer momento usando a diretiva especial `break`.

Por exemplo, o laço abaixo pede ao usuário uma série de números, "interrompendo" quando nenhum número é inserido:

```js run
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

A diretiva `break` é ativada na linha `(*)` se o usuário inserir uma linha vazia ou cancelar a entrada. Ela para o laço imediatamente, passando o controle para a primeira linha após o laço. Nomeadamente, `alert`.

A combinação "laço infinito + `break` quando necessário" é ótima para situações quando a condição do laço deve ser verificada não no início ou fim do laço, mas no meio ou até em vários lugares do seu corpo.

## Continue para a próxima iteração [#continue]

A diretiva `continue` é uma "versão mais leve" do `break`. Ela não para o laço inteiro. Em vez disso, ela para a iteração atual e força o laço a iniciar uma nova (se a condição permitir).

Podemos usá-la se terminamos com a iteração atual e gostaríamos de passar para a próxima.

O laço abaixo usa `continue` para exibir apenas valores ímpares:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // se verdadeiro, pula a parte restante do corpo
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, depois 3, 5, 7, 9
}
```

Para valores pares de `i`, a diretiva `continue` para a execução do corpo e passa o controle para a próxima iteração do `for` (com o próximo número). Então o `alert` é chamado apenas para valores ímpares.

````smart header="A diretiva `continue` ajuda a diminuir aninhamento"
Um laço que mostra valores ímpares poderia ser assim:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Do ponto de vista técnico, isso é idêntico ao exemplo acima. Certamente, podemos apenas envolver o código em um bloco `if` em vez de usar `continue`.

Mas como efeito colateral, isso criou mais um nível de aninhamento (a chamada `alert` dentro das chaves). Se o código dentro do `if` for maior que algumas linhas, isso pode diminuir a legibilidade geral.
````

````warn header="Não use `break/continue` do lado direito de '?'"
Por favor note que construções de sintaxe que não são expressões não podem ser usadas com o operador ternário `?`. Em particular, diretivas como `break/continue` não são permitidas lá.

Por exemplo, se pegarmos este código:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...e reescrevê-lo usando um ponto de interrogação:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue não é permitido aqui
```

...ele para de funcionar: há um erro de sintaxe.

Esta é apenas mais uma razão para não usar o operador ponto de interrogação `?` em vez de `if`.
````

## Rótulos para break/continue

Às vezes precisamos sair de múltiplos laços aninhados de uma vez.

Por exemplo, no código abaixo iteramos sobre `i` e `j`, pedindo as coordenadas `(i, j)` de `(0,0)` a `(2,2)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Valor nas coordenadas (${i},${j})`, '');

    // e se quisermos sair daqui para Concluído (abaixo)?
  }
}

alert('Concluído!');
```

Precisamos de uma forma de parar o processo se o usuário cancelar a entrada.

O `break` comum após `input` só quebraria o laço interno. Isso não é suficiente -- rótulos, venham ao resgate!

Um *rótulo* é um identificador com dois-pontos antes de um laço:

```js
labelName: for (...) {
  ...
}
```

A instrução `break <labelName>` no laço abaixo sai para o rótulo:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Valor nas coordenadas (${i},${j})`, '');

    // se uma string vazia ou cancelado, então sai de ambos os laços
    if (!input) *!*break outer*/!*; // (*)

    // faz algo com o valor...
  }
}

alert('Concluído!');
```

No código acima, `break outer` procura acima pelo rótulo chamado `outer` e sai daquele laço.

Então o controle vai direto de `(*)` para `alert('Concluído!')`.

Também podemos mover o rótulo para uma linha separada:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

A diretiva `continue` também pode ser usada com um rótulo. Neste caso, a execução do código pula para a próxima iteração do laço rotulado.

````warn header="Rótulos não permitem \"pular\" para qualquer lugar"
Rótulos não nos permitem pular para um lugar arbitrário no código.

Por exemplo, é impossível fazer isso:

```js
break label; // pula para o rótulo abaixo (não funciona)

label: for (...)
```

Uma diretiva `break` deve estar dentro de um bloco de código. Tecnicamente, qualquer bloco de código rotulado serve, por exemplo:

```js
label: {
  // ...
  break label; // funciona
  // ...
}
```

...Embora, 99,9% das vezes `break` é usado dentro de laços, como vimos nos exemplos acima.

Um `continue` só é possível de dentro de um laço.
````

## Resumo

Cobrimos 3 tipos de laços:

- `while` -- A condição é verificada antes de cada iteração.
- `do..while` -- A condição é verificada após cada iteração.
- `for (;;)` -- A condição é verificada antes de cada iteração, configurações adicionais disponíveis.

Para fazer um laço "infinito", geralmente a construção `while(true)` é usada. Tal laço, assim como qualquer outro, pode ser parado com a diretiva `break`.

Se não queremos fazer nada na iteração atual e gostaríamos de avançar para a próxima, podemos usar a diretiva `continue`.

`break/continue` suportam rótulos antes do laço. Um rótulo é a única forma para `break/continue` escapar de um laço aninhado para ir para um externo.
