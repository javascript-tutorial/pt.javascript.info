# Interação: alert, prompt, confirm

Esta parte do tutorial tem como objetivo cobrir o JavaScript  "como é ", sem ajustes específicos de ambiente.

Mas ainda estaremos usando o navegador como nosso ambiente de demostração, portanto devemos conhecer pelo menos algumas das suas funções de interface com o usuário. Neste capítulo, iremos nos familiarizar com as funções do navegador `alert`, `prompt` e `confirm`.

## alert

Sintaxe:

```js
alert(message);
```

Mostra uma mensagem, e suspende a execução do programa (script) até o usuário pressionar "OK".

Por exemplo:

```js run
alert("Ola");
```

A mini-janela é chamada de modal  *window*. A palavra "modal" significa que o visitante não pode interagir com o resto da página, pressionar outros botões, etc. até que ele tenha lidado com a janela. Nesse caso -- até pressionar "OK"

## prompt

A função `prompt`  aceita dois argumentos

```js no-beautify
result = prompt(title, [default]);
```

Mostra uma janela modal com uma mensagem de texto,um campo de entrada para o visitante, e os botões OK/CANCEL

`title`
: Texto para ser mostrado ao visitante.
`default`
: Um parâmetro opcional, o valor inicial para o campo de entrada.
O visitante pode digitar algo no campo de entrada do prompt e pressionar OK. Ou ele pode cancelar a entrada pressionando CANCEL ou `key:Esc`.



A chamada do `prompt` retorna o texto do campo de entrada ou `null` se a entrada for cancelada.

Por exemplo:

```js run
let age = prompt('Qual a sua idade ?', 100);

alert(`Você tem ${age} anos!`); //Você tem 100 anos!
```

````warn header="In IE: always supply a `default`"
O segundo parâmetro é opcional, mas se não o fornecermos, o Internet Explorer irá inserir o texto `"undefined"` no prompt.

Execute este código no Internet Explorer para visualizar:

```js run
let test = prompt("Teste");
```

Portanto, para que os prompts tenham boa aparência no IE, recomendamos que sempre forneça o segundo argumento:

```js run
let test = prompt("Teste", ''); // <-- para o IE
```
````

## confirm

Sintaxe:

```js
result = confirm(question);
```

A função `confirm` mostra uma janela modal com uma `question` e dois botões: OK e CANCEL.
O resultado é `true` se OK for pressionado e `false` caso contrário
Por exemplo:

```js run
let isBoss = confirm("Você é o chefe ?");

alert( isBoss ); // true se OK for pressionado
```

## Sumário

Cobrimos 3 funções específicas do navegador para interagir com o visitante:



`alert`
: mostra uma mensagem.

`prompt`
: mostra uma mensagem pedindo para o usuário inserir texto. Ele retorna o texto ou, se CANCEL ou `key:Esc` for clicado, `null`.



`confirm`
: mostra uma mensagem e espera que o usuário pressione  "OK" ou "CANCEL". Ele retorna `true` para OK e `false` para CANCEL/`key:Esc`.

Todos esse métodos são modais: eles pausam a execução do script e não permitem o visitante interagir com o resto da página até que a janela seja descartada.

Existem duas limitações compartilhadas entre esses metódos acima:

1. A localização exata da janela modal é determinada pelo navegador. Geralmente, está no centro.
2. A aparência exata da janela também depende do navegador. Nós não podemos modificá-la.

Este é o preço da simplicidade. Existem outras maneiras de mostrar janelas mais agradáveis e interações mais ricas com os visitantes, mas se "sinos e assobios" não importam muito, esses métodos funcionam bem.