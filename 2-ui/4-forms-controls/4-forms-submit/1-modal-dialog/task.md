importance: 5

---

# Formuário modal

Crie uma função `showPrompt(html, callback)` onde mostra um formulário com uma mensagem `html`, um campo de entrada e botões `OK/CANCEL`.

- Um usuário deve esprever algo dentro do campo de texto e pressionar  `key:Enter` ou o botão de OK button, então é chamado o `callback(value)` com o valor que foi inserido.
- Porém, se o usuário pressionar `key:Esc` ou CANCEL, então `callback(null)` é chamado.

Em ambos os casos, isso encerra o processo de entrada e remove o formulário.

Requisitos:

- O formulário deve estar no centro da janela.
- O formulário é um *modal*. Em outras palavras, não será possível interagir com o restante da página até que o usuário a feche.
- Quando o formulário for exibido, o foco do usuário deverá estar dentro do campo `<input>`.
- As teclas `key:Tab`/`key:Shift+Tab` devem alternar o foco entre os campos do formulário, não permitindo que o foco saia para outros elementos da página.

Exemplo de uso:

```js
showPrompt("Enter something<br>...smart :)", function(value) {
  alert(value);
});
```

Uma demonstração dentro de um iframe:

[iframe src="solution" height=160 border=1]

Obs: O documento de origem contém HTML/CSS para o formulário com posicionamento fixo, mas cabe a você torná-lo um modal.
