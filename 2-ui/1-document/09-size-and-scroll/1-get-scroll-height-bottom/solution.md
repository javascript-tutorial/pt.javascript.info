A solução é:

```js
let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
```

Em outras palavras: (altura total) menos (parte rolada para fora no topo) menos (parte visível) -- isso é exatamente a parte rolada para fora na parte de baixo.
