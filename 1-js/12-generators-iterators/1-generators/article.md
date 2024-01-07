# Geradores

Funções regulares retornam apenas um único valor (ou nenhum).

Geradores podem retornar ("yield") múltiplos valores, um após o outro, sob demanda. Eles funcionam muito bem com [iteráveis](info:iterable), permitindo criar fluxos de dados com facilidade.

## Funções geradoras

Para criar um gerador, precisamos de uma construção sintática especial: `function*`, chamada de "função geradora" (generator function).


Parece com isso:

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```

Funções geradoras se comportam diferente das funções regulares. Quando tal função é chamada, ela não executa seu código de imediato. Em vez disso, ela retorna um objeto especial, chamado "objeto gerador" (generator object), para gerenciar a execução.

Aqui, dê uma olhada:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "função geradora" cria "objeto gerador"
let generator = generateSequence();
*!*
alert(generator); // [object Generator]
*/!*
```
A execução do código da função ainda não começou:

![](generateSequence-1.svg)

O método principal de um gerador é `next()`. Quando chamado, ele executa até a instrução `yield <valor>` mais próxima (`valor` pode ser omisso, sendo então `undefined`). Em seguida, a execução da função pausa, e o `valor` gerado é retornado para o código externo.   

O resultado de `next()` é sempre um objeto com duas propriedades: 
- `value`: o valor gerado.
- `done`: `true` se o código da função tiver terminado, caso contrário, `false`.

Por exemplo, aqui criamos o gerador e obtemos o seu primeiro valor:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

*!*
let one = generator.next();
*/!*

alert(JSON.stringify(one)); // {value: 1, done: false}
```

Até agora, obtivemos apenas o primeiro valor, e a execução da função está na segunda linha:

![](generateSequence-2.svg)

Vamos chamar `generator.next()` novamente. Ele retoma a execução do código e retorna o próximo `yield`:  

```js
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```

![](generateSequence-3.svg)

E, se o chamarmos pela terceira vez, a execução chega na instrução `return` que finaliza a função:

```js
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, *!*done: true*/!*}
```

![](generateSequence-4.svg)

Agora o `generator` está concluído. Vemos isso em `done:true` e `value:3` como resultado final. 

Novas chamadas à `generator.next()` não fazem mais sentido. Se as fizermos, elas retornam o mesmo objeto: `{done: true}`.

```smart header="`function* f(…)` or `function *f(…)`?"
Ambas as sintaxes estão corretas.

Mas, geralmente a primeira sintaxe é preferida, já que o asterisco `*` denota que é uma função geradora, ela descreve o tipo, não o nome, então deve permanecer com a palavra-chave `function`.
```

## Geradores são iteráveis

Como você provavelmente já imaginou ao observar o método `next()`, os geradores são [iteráveis](info:iterable).

Podemos percorrer seus valores usando `for..of`

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2
}
```

Parece muito mais limpo do que chamar `.next().value`, não é mesmo?

...Mas por favor, observe: o exemplo acima mostra `1`, depois `2`, e isso é tudo. não mostra `3`! 

Isso ocorre porque a iteração `for..of` ignora o último `value`, quando `done: true`. Portanto, se quisermos que todos os resultados sejam mostrados por `for..of`, devemos retorná-los com `yield`:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
*!*
  yield 3;
*/!*
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2, then 3
}
```

Como geradores são iteráveis, podemos chamar todas as funcionalidades relacionadas, por exemplo, a sintaxe de propagação `...`:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```

No código acima, `...generateSequence()` transforma o objeto gerador iterável em um array de itens (leia mais sobre a sintaxe de propagação no capítulo <info:rest-parameters-spread#spread-syntax>)

## Utilizando geradores para iteráveis

Há algum tempo, no capítulo <info:iterable>, criamos um objeto iterável `range` que retorna valores `from..to`.

Aqui, vamos relembrar o código:

```js run
let range = {
  from: 1,
  to: 5,

  // intervalo for..of  chama seu método uma vez no início
  [Symbol.iterator]() {
    // ...ele retorna o objeto iterador:
    // A partir desse ponto, for..of funciona apenas com esse objeto, solicitando a ele os próximos valores
    return {
      current: this.from,
      last: this.to,

      // next() é chamado em cada iteração pelo laço for..of 
      next() {
        // deve retornar o valor como um objeto {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// A iteração pelo objeto `range` retorna números de range.from a range.to
alert([...range]); // 1,2,3,4,5
```

Podemos usar uma função geradora para iteração, fornecendo-a como `Symbol.iterator`.

Aqui está o mesmo objeto `range`, porém muito mais compacto:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // uma forma abreviada de [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1,2,3,4,5
```

Isso funciona porque `range[Symbol.iterator]()` agora retorna um gerador, e os métodos do gerador são exatamente o que `for..of` espera:
- ele tem um método `.next()`
- que retorna valores no formato `{value: ..., done: true/false}`

Isso não é uma coincidência, é claro. Os geradores foram adicionados à linguagem JavaScript com iteradores em mente, para implementá-los facilmente. 

A variante com um gerador é muito mais concisa do que o código iterável original de `range`, e mantém a mesma funcionalidade.

```smart header="Geradores podem gerar valores eternamente"
Nos exemplos acima geramos sequencias finitas, mas também podemos criar um gerador que gera valores infinitamente. Por exemplo, uma sequência interminável de números pseudoaleatórios.

Certamente, isso exigiria um `break` (ou `return`) em um `for..of` sobre tal gerador. Caso contrário, o laço se repetiria infinitamente e travaria.
```

## Composição de geradores

A composição de geradores é uma característica especial de geradores que permite "incorporar" geradores uns nos outros de maneira transparente.

Por exemplo, temos uma função que gera uma sequência de números:

```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
```
Agora gostaríamos de reutilizá-la para gerar uma sequência mais complexa:
- primeiro, dígitos `0..9` (com códigos de caracteres de 48 a 57),
- seguido de letras maiúsculas do alfabeto `A..Z` (códigos de caracteres de 65 a 90)
- seguido de letras minúsculas do alfabeto `a..\` (códigos de caracteres de 97 a 122)

Podemos usar essa sequência, por exemplo, para criar senhas, selecionando os caracteres dela (poderíamos adicionar caracteres de sintaxe também), mas vamos gerá-la primeiro.

Em uma função regular, para combinar resultados de várias outras funções, as chamamos, armazenamos os resultados e, em seguida, os juntamos no final.

Para geradores, há uma sintaxe especial `yield*` para "incorporar" (compor) um gerador em outro.
O gerador composto:
```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

*!*
  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
*/!*

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

A diretiva `yield*` *delega* a execução para outro gerador. Isso significa que `yield* gen` itera sobre o gerador `gen` e encaminha transparentemente seus valores para fora. Como se os valores fossem gerados pelo gerador externo.

O resultado é o mesmo que se incorporássemos o código dos geradores aninhados:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

*!*
  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;
*/!*

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

A composição de geradores é uma maneira natural para inserir o fluxo de um gerador para outro. Não utiliza memória adicional para armazenar resultados intermediários.

## "yield" é uma via de mão dupla

Até esse momento, geradores eram similares a objetos iteráveis, com uma sintaxe especial para gerar valores. Mas, na verdade, eles são muito mais poderosos e flexíveis. 

Isso ocorre porque `yield` é uma via de mão dupla: ele não apenas retorna o resultado para o exterior, mas também pode passar o valor para dentro do gerador.

Para fazer isso, devemos chamar `generator.next(arg)`, com um argumento. Este argumento se torna o resultado do `yield`.

Vamos ver um exemplo:

```js run
function* gen() {
*!*
  // Passa uma pergunta para o código externo e aguarda por uma resposta
  let result = yield "2 + 2 = ?"; // (*)
*/!*

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield retorna o valor

generator.next(4); // --> passa o valor para dentro do gerador  
```

![](genYield2.svg)

1. A primeira chamada `generator.next()` sempre deve ser feito sem um argumento (o argumento é ignorado se passado). Isso inicia a execução e retorna o resultado do primeiro `yield "2+2=?"`. Nesse ponto, o gerador pausa a execução, enquanto espera na linha `(*)`.
2. Então, como mostrado na imagem acima, o resultado do `yield` vai para a variável `question` no código que o chamou. 
3. Em `generator.next(4)`, o gerador é retomado, e `4` entra como o resultado: `let result = 4`.

Observe que o código externo não precisa chamar `next(4)` imediatamente. Pode levar algum tempo. Isso não é um problema: o gerador esperará.

Por exemplo:

```js
// retoma o gerador depois de algum tempo
setTimeout(() => generator.next(4), 1000);
```

Como podemos ver, ao contrário de funções regulares, um gerador e o código que o chamou pode trocar resultados passando valores em `next/yield`  

Para tornar as coisas mais claras, aqui está outro exemplo com mais chamadas:

```js run
function* gen() {
  let ask1 = yield "2 + 2 = ?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3 = ?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2 = ?"

alert( generator.next(4).value ); // "3 * 3 = ?"

alert( generator.next(9).done ); // true
```

A imagem da execução:

![](genYield2-2.svg)

1. O primeiro `.next()` inicia a execução... Alcança o primeiro `yield`.
2. O resultado é retornado para o código externo.
3. O segundo `.next(4)` passa `4` de volta para o gerador como resultado do primeiro `yield` e retoma a execução.
4. ...Alcança o segundo `yield`, que se torna o resultado da chamada do gerador.
5. O terceiro `next(9)` passa `9` para o gerador como resultado do segundo `yield` e retoma a execução que alcança o final da função, então `done: true`.

É como um jogo de "pingue-pongue". Cada `next(value)` (com exceção do primeiro) passa um valor para o gerador, que se torna o resultado do `yield` atual, e então recebe de volta o valor do próximo `yield`.

## generator.throw

Como observamos nos exemplos acima, o código externo pode passar um valor para o gerador, como resultado do `yield`. 

...Mas também pode iniciar (lançar) um erro lá. Isso é natural, já que um erro é uma espécie de resultado.

Para passar um erro para um `yield`, devemos chamar `generator.throw(err)`. Nesse caso, o `err` é lançado na linha com este `yield`.

Por exemplo, aqui o `yield` de `"2 + 2 = ?"` leva a um erro:

```js run
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    alert("A execução não chega aqui, por que a exceção é lançada acima");
  } catch(e) {
    alert(e); // exibe o erro
  }
}

let generator = gen();

let question = generator.next().value;

*!*
generator.throw(new Error("A resposta não foi encontrada no meu banco de dados")); // (2)
*/!*
```

O erro, lançado no gerador na linha `(2)` leva a uma exceção na linha `(1)` com `yield`. No exemplo acima, `try..catch` captura e o exibe.

Se não o capturamos, então assim como qualquer exceção, ela "cai para fora" do gerador para o código que o chamou. 

A linha atual do código que chama é a linha com `generator.throw`, rotulada como `(2)`. Portanto, devemos capturá-lo aqui, assim:

```js run
function* generate() {
  let result = yield "2 + 2 = ?"; // Erro nessa linha
}

let generator = generate();

let question = generator.next().value;

*!*
try {
  generator.throw(new Error("A resposta não foi encontrada no meu banco de dados"));
} catch(e) {
  alert(e); // exibe o erro
}
*/!*
```

Se não capturarmos o erro ali, então, como de costume, ele passa para o código que chamou (se houver) e, se não for capturado, encerra o script. 

## generator.return

`generator.return(valor)` finaliza a execução do gerador e retorna o `valor` fornecido.

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

g.next();        // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next();        // { value: undefined, done: true }
```

Se usarmos novamente `generator.return()` em um gerador finalizado, ele retornará esse valor novamente ([MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Generator/return)).

Frequentemente, não o usamos, pois, na maioria das vezes queremos obter todos os valores retornados, mas pode ser útil quando queremos interromper um gerador em uma condição específica.

## Resumo

- Geradores são criados por funções geradoras `function* f(…) {…}`.
- Dentro dos geradores (apenas) existe um operador `yield`.
- O código externo e o gerador podem trocar resultados através de chamadas `next/yield`.

No JavaScript moderno, geradores são raramente usados. Mas às vezes eles são úteis, porque a capacidade de uma função trocar dados como o código que a chama durante a execução é bastante única. E, certamente, eles são ótimos para ciar objetos iteráveis.

Além disso, no próximo capítulo, aprenderemos sobre geradores assíncronos (async generators), que são usados para ler fluxos de dados gerados de forma assíncrona (por exemplo, buscas paginadas em uma rede) em laços `for await ... of`.

Na programação web, frequentemente trabalhamos com transmissão de dados, então este é outro caso de uso muito importante.
