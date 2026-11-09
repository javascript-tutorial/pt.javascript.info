# Agendamento: setTimeout e setInterval

Podemos decidir executar uma função não agora, mas em um certo momento mais tarde. Isso é chamado de "agendar uma chamada".

Existem dois métodos para isso:

- `setTimeout` nos permite rodar uma função uma vez depois de um intervalo de tempo.
- `setInterval` nos permite rodar uma função repetidamente, começando depois do intervalo de tempo, e então repetindo continuamente nesse intervalo.

Esses métodos não fazem parte da especificação do JavaScript. Mas a maioria dos ambientes tem o agendador interno e fornece esses métodos. Em particular, eles são suportados em todos os navegadores e no Node.js.

## setTimeout

A sintaxe:

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

Parâmetros:

`func|code`
: Função ou uma string de código para executar.
Normalmente, é uma função. Por motivos históricos, uma string de código pode ser passada, mas isso não é recomendado.

`delay`
: O atraso antes de rodar, em milissegundos (1000 ms = 1 segundo), por padrão 0.

`arg1`, `arg2`...
: Argumentos para a função

Por exemplo, este código chama `sayHi()` depois de um segundo:

```js run
function sayHi() {
  alert('Hello');
}

*!*
setTimeout(sayHi, 1000);
*/!*
```

Com argumentos:

```js run
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

*!*
setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John
*/!*
```

Se o primeiro argumento for uma string, então o JavaScript cria uma função a partir dela.

Então, isso também vai funcionar:

```js run no-beautify
setTimeout("alert('Hello')", 1000);
```

Mas usar strings não é recomendado, use funções seta no lugar delas, assim:

```js run no-beautify
setTimeout(() => alert('Hello'), 1000);
```

````smart header="Passe uma função, mas não a execute"
Desenvolvedores iniciantes às vezes cometem o erro de adicionar parênteses `()` depois da função:

```js
// errado!
setTimeout(sayHi(), 1000);
```
Isso não funciona, porque `setTimeout` espera uma referência a uma função. E aqui `sayHi()` executa a função, e o *resultado da sua execução* é passado para `setTimeout`. No nosso caso, o resultado de `sayHi()` é `undefined` (a função não retorna nada), então nada é agendado.
````

### Cancelando com clearTimeout

Uma chamada a `setTimeout` retorna um "identificador de timer" `timerId` que podemos usar para cancelar a execução.

A sintaxe para cancelar:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

No código abaixo, agendamos a função e depois a cancelamos (mudamos de ideia). Como resultado, nada acontece:

```js run no-beautify
let timerId = setTimeout(() => alert("nunca acontece"), 1000);
alert(timerId); // identificador do timer

clearTimeout(timerId);
alert(timerId); // mesmo identificador (não vira null depois de cancelar)
```

Como podemos ver pela saída do `alert`, num navegador o identificador do timer é um número. Em outros ambientes, pode ser outra coisa. Por exemplo, o Node.js retorna um objeto timer com métodos adicionais.

De novo, não existe uma especificação universal para esses métodos, então tudo bem.

Para navegadores, os timers são descritos na [seção de timers](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) do HTML Living Standard.

## setInterval

O método `setInterval` tem a mesma sintaxe que `setTimeout`:

```js
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

Todos os argumentos têm o mesmo significado. Mas, diferente de `setTimeout`, ele roda a função não só uma vez, mas regularmente, depois do intervalo de tempo dado.

Para parar as próximas chamadas, devemos chamar `clearInterval(timerId)`.

O exemplo a seguir vai mostrar a mensagem a cada 2 segundos. Depois de 5 segundos, a saída é interrompida:

```js run
// repete com o intervalo de 2 segundos
let timerId = setInterval(() => alert('tick'), 2000);

// depois de 5 segundos, para
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

```smart header="O tempo continua passando enquanto o `alert` é exibido"
Na maioria dos navegadores, incluindo Chrome e Firefox, o timer interno continua "correndo" enquanto `alert/confirm/prompt` é exibido.

Então, se você rodar o código acima e não fechar a janela do `alert` por algum tempo, o próximo `alert` vai aparecer imediatamente assim que você fechar. O intervalo real entre os alerts vai ser mais curto do que 2 segundos.
```

## setTimeout aninhado

Existem duas formas de rodar algo regularmente.

Uma é `setInterval`. A outra é um `setTimeout` aninhado, assim:

```js
/** em vez de:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
*!*
  timerId = setTimeout(tick, 2000); // (*)
*/!*
}, 2000);
```

O `setTimeout` acima agenda a próxima chamada bem no final da atual `(*)`.

O `setTimeout` aninhado é um método mais flexível do que `setInterval`. Dessa forma, a próxima chamada pode ser agendada de forma diferente, dependendo dos resultados da atual.

Por exemplo, precisamos escrever um serviço que envia uma requisição ao servidor a cada 5 segundos pedindo dados, mas, caso o servidor esteja sobrecarregado, deve aumentar o intervalo para 10, 20, 40 segundos...

Aqui está o pseudocódigo:
```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...envia a requisição...

  if (a requisição falhou por sobrecarga do servidor) {
    // aumenta o intervalo para a próxima execução
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```


E se as funções que estamos agendando consomem muito processamento, então podemos medir o tempo gasto na execução e planejar a próxima chamada mais cedo ou mais tarde.

**O `setTimeout` aninhado permite definir o atraso entre as execuções com mais precisão do que o `setInterval`.**

Vamos comparar dois trechos de código. O primeiro usa `setInterval`:

```js
let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

O segundo usa `setTimeout` aninhado:

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

Para `setInterval`, o agendador interno vai rodar `func(i++)` a cada 100ms:

![](setinterval-interval.svg)

Você percebeu?

**O atraso real entre as chamadas de `func` para `setInterval` é menor do que no código!**

Isso é normal, porque o tempo gasto na execução de `func` "consome" uma parte do intervalo.

É possível que a execução de `func` acabe sendo mais longa do que esperávamos e demore mais de 100ms.

Nesse caso, o motor espera `func` terminar, então checa o agendador e, se o tempo já passou, roda de novo *imediatamente*.

No caso extremo, se a função sempre executa por mais tempo do que `delay` ms, então as chamadas vão acontecer sem nenhuma pausa.

E aqui está a figura para o `setTimeout` aninhado:

![](settimeout-interval.svg)

**O `setTimeout` aninhado garante um atraso mínimo (100ms aqui) entre o final de uma chamada e o início da seguinte.**

Isso acontece porque uma nova chamada é planejada no final da anterior.

````smart header="Coleta de lixo e o callback de setInterval/setTimeout"
Quando uma função é passada em `setInterval/setTimeout`, uma referência interna é criada para ela e salva no agendador. Isso impede que a função seja coletada pelo coletor de lixo, mesmo que não existam outras referências a ela.

```js
// a função fica na memória até o agendador chamá-la
setTimeout(function() {...}, 100);
```

Para `setInterval`, a função fica na memória até `clearInterval` ser chamado.

Existe um efeito colateral. Uma função referencia o ambiente léxico externo, então, enquanto ela viver, as variáveis externas também vivem. Elas podem ocupar muito mais memória do que a própria função. Então, quando não precisarmos mais da função agendada, é melhor cancelá-la, mesmo que seja bem pequena.
````

## setTimeout com atraso zero

Existe um caso de uso especial: `setTimeout(func, 0)`, ou simplesmente `setTimeout(func)`.

Isso agenda a execução de `func` o quanto antes possível. Mas o agendador só vai chamá-la depois que o script em execução no momento terminar.

Então a função é agendada para rodar "logo depois" do script atual.

Por exemplo, isso mostra "Hello", depois imediatamente "World":

```js run
setTimeout(() => alert("World"));

alert("Hello");
```

A primeira linha "coloca a chamada no calendário depois de 0ms". Mas o agendador só vai "checar o calendário" depois que o script atual terminar, então `"Hello"` vem primeiro, e `"World"` -- depois dele.

Também existem casos de uso mais avançados, relacionados a navegadores, de atraso zero, que vamos discutir no capítulo <info:event-loop>.

````smart header="O atraso zero, na verdade, não é zero (num navegador)"
No navegador, existe uma limitação de com que frequência timers aninhados podem rodar. O [HTML Living Standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) diz: "depois de cinco timers aninhados, o intervalo é forçado a ser de pelo menos 4 milissegundos.".

Vamos demonstrar o que isso significa com o exemplo abaixo. A chamada `setTimeout` nele reagenda a si mesma com atraso zero. Cada chamada lembra o tempo real desde a anterior no array `times`. Como são os atrasos reais? Vamos ver:

```js run
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // lembra o atraso desde a chamada anterior

  if (start + 100 < Date.now()) alert(times); // mostra os atrasos depois de 100ms
  else setTimeout(run); // senão, reagenda
});

// um exemplo da saída:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

Os primeiros timers rodam imediatamente (exatamente como está escrito na especificação), e depois vemos `9, 15, 20, 24...`. O atraso obrigatório de 4+ ms entre as chamadas entra em cena.

A mesma coisa acontece se usarmos `setInterval` em vez de `setTimeout`: `setInterval(f)` roda `f` algumas vezes com atraso zero, e depois com atraso de 4+ ms.

Essa limitação vem de tempos antigos e muitos scripts dependem dela, então ela existe por motivos históricos.

Para o JavaScript do lado do servidor, essa limitação não existe, e existem outras formas de agendar um trabalho assíncrono imediato, como o [setImmediate](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args) para o Node.js. Então essa observação é específica de navegadores.
````

## Resumo

- Os métodos `setTimeout(func, delay, ...args)` e `setInterval(func, delay, ...args)` nos permitem rodar `func` uma vez/regularmente depois de `delay` milissegundos.
- Para cancelar a execução, devemos chamar `clearTimeout/clearInterval` com o valor retornado por `setTimeout/setInterval`.
- Chamadas de `setTimeout` aninhadas são uma alternativa mais flexível ao `setInterval`, nos permitindo definir o tempo *entre* as execuções com mais precisão.
- Agendamento com atraso zero usando `setTimeout(func, 0)` (o mesmo que `setTimeout(func)`) é usado para agendar a chamada "o quanto antes possível, mas depois que o script atual terminar".
- O navegador limita o atraso mínimo para cinco ou mais chamadas aninhadas de `setTimeout` ou para `setInterval` (depois da 5ª chamada) a 4ms. Isso é por motivos históricos.

Observe que todos os métodos de agendamento não *garantem* o atraso exato.

Por exemplo, o timer no navegador pode ficar mais lento por vários motivos:
- A CPU está sobrecarregada.
- A aba do navegador está em segundo plano.
- O notebook está no modo de economia de bateria.

Tudo isso pode aumentar a resolução mínima do timer (o atraso mínimo) para 300ms ou até 1000ms, dependendo do navegador e das configurações de desempenho do sistema operacional.
