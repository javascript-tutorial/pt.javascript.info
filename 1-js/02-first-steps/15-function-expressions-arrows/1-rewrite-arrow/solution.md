
```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Você concorda?",
*!*
  () => alert("Você concordou."),
  () => alert("Você cancelou a execução.")
*/!*
);
```

Tem uma apresentação curta e limpa, não?
