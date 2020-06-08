
# Reescreva com funções seta (*arrow functions*)

Substitua as Expressões de Função por funções seta no código abaixo:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Você concorda?",
  function() { alert("Você concordou."); },
  function() { alert("Você cancelou a execução."); }
);
```
