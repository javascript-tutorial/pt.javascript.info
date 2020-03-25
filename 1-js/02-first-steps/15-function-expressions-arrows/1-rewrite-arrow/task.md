
# Reescreva com arrow functions

Substitua Expressões de função por arrow functions no seguinte código:

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
