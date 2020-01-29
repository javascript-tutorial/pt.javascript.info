
# Reescreva com arrow functions

Substitua as *Expressöes de Funçöes* por Arrow Functions no código:

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
