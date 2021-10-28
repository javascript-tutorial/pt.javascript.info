# Interação: alert, prompt, confirm

Como usuaremos o navegador como nosso ambiente de demonstração, vamos ver algumas funções para interagir com o usuário: `alert`, `prompt` e `confirm`.

## alert

Esta já vimos. Ela mostra uma mensagem e aguarda o usuário pressionar "OK".

Por exemplo:

```js run
alert('Olá');
```

A mini-janela com a mensagem é chamada de _modal window_. A palavra "modal" significa que o visitante não pode interagir com o resto da página, pressionar outros botões, etc, até que ele tenha lidado com a janela. Nesse caso -- até pressionar "OK".

## prompt

A função `prompt` aceita dois argumentos:

```js no-beautify
result = prompt(title, [default]);
```

Mostra uma janela modal com uma mensagem de texto, um campo de entrada para o visitante, e os botões OK/Cancel.

`title`
: Texto para ser mostrado ao visitante.

`default`
: Um parâmetro opcional, o valor inicial para o campo de entrada.

```smart header="Os colchetes na sintaxe `[...]`"
 Os colchetes ao redor de `default` na sintaxe acima denotam que o parâmetro é opcional, não é obrigatório.
````

O visitante pode digitar algo no campo de entrada do prompt e pressionar OK. Então nós temos esse texto no `result`.  Ou ele pode cancelar a entrada pressionando Cancelar ou `key:Esc`, então nos temos `null` como o `result`.

A chamada do `prompt` retorna o texto do campo de entrada ou `null` se a entrada for cancelada.

Por exemplo:

```js run
let age = prompt('Qual a sua idade?', 100);

alert(`Você tem ${age} anos!`); //Você tem 100 anos!
````

````warn header="No IE: sempre forneça um `default`"
O segundo parâmetro é opcional, mas se não o fornecermos, o Internet Explorer irá inserir o texto `"undefined"` no prompt.

Execute este código no Internet Explorer para visualizar:

```js run
let test = prompt('Teste');
```

Portanto, para que os prompts tenham boa aparência no IE, recomendamos que sempre forneça o segundo argumento:

```js run
let test = prompt('Teste', ''); // <-- para o IE
```
````

## confirm

A sintaxe:

```js
result = confirm(question);
```

A função `confirm` mostra uma janela modal com uma `question` e dois botões: OK e Cancelar.

O resultado é `true` se OK for pressionado e `false` caso contrário.

Por exemplo:

```js run
let isBoss = confirm("Você é o chefe?");

alert( isBoss ); // true se OK for pressionado
```

## Sumário

Cobrimos 3 funções específicas do navegador para interagir com o visitante:

`alert`
: mostra uma mensagem.

`prompt`
: mostra uma mensagem pedindo para o usuário inserir texto. Ela retorna o texto ou, se CANCEL ou `key:Esc` for clicado, `null`.

`confirm`
: mostra uma mensagem e espera que o usuário pressione  "OK" ou "Cancel". Ela retorna `true` para OK e `false` para Cancel/`key:Esc`.

Todos esse métodos são modais: eles pausam a execução do script e não permitem ao visitante interagir com o resto da página até que a janela seja descartada.

Existem duas limitações compartilhadas entre esses metódos acima:

1. A localização exata da janela modal é determinada pelo navegador. Geralmente, está no centro.
2. A aparência exata da janela também depende do navegador. Nós não podemos modificá-la.

Este é o preço da simplicidade. Existem outras maneiras de mostrar janelas mais agradáveis e interações mais ricas aos visitantes, mas se "sinos e assobios" não importam muito, esses métodos funcionam bem.
