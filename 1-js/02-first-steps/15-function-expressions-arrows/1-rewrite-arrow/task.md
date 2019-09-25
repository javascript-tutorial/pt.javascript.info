
# Re-escreva com arrow functions

Substitua, no código, Expressões de Função por arrow functions:

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
