# Formulários: evento e método submit

O evento `submit` é disparado quando o formulário é submetido. Geralmente, é usado para validar o formulário antes de enviá-lo ao servidor ou para abortar o envio e processá-lo no JavaScript.

O método `form.submit()` permite iniciar o envio de formulários a partir do JavaScript. Podemos usá-lo para criar e enviar dinamicamente nossos próprios formulários para o servidor.

Vamos ver mais detalhes sobre eles.

## Evento: submit

Há duas maneiras principais de enviar um formulário:

1. A Primeira -- clicar em `<input type="submit">` ou `<input type="image">`.
2. A Segunda -- pressione `key:Enter` em um campo de input.

Ambas as ações levam a execução do evento `submit` no formulário. O handler pode verificar os dados, e se houver erros, será mostrado e chamado o `event.preventDefault()`, logo, o formulário não será enviado para o servidor.

No formulário abaixo:
1. Vá para o campo de texto e pressione `key:Enter`.
2. Clique em `<input type="submit">`.

Ambas as ações mostram um `alert` e o formulário não é enviado a lugar nenhum devido ao `return false`:

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  Primeiro: Insira no campo de entrada <input type="text" value="text"><br>
  Segundo: Clique em "submit": <input type="submit" value="Submit">
</form>
```

````smart header="Relação entre `submit` e `click`"
Quando um formulário é enviado usando `key:Enter` no campo de entrada, um evento de `click` dispara no `<input type="submit">`.

Isso é até bem engraçado, porque não houve nenhum clique.

Aqui está uma demonstração:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## Método: submit

Para enviar um formulário ao servidor manualmente, podemos chamar `form.submit()`.

Nesse caso, o evento `submit` não é gerado. Podemos presumir que, se o programador chamar `form.submit()`, o script já terá realizado todo o processamento relacionado.

Às vezes, isso é usado para criar e enviar um formulário manualmente, como este:

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// o formulário deve estar incluído no documento para que ele seja enviado.
document.body.append(form);

form.submit();
```
