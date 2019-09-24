Para se equiparar precisamente à funcionalidade do `switch`, o `if` deve utilizar uma comparação exata (*strict comparison*) `'==='`.

Embora para certas *strings* (cadeias-de-carateres), uma `'=='` simples também sirva.

```js no-beautify
if(browser == 'Edge') {
  alert("Você está no Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Está bem, também suportamos este navegador' );
} else {
  alert( 'Esperamos que esta página tenha uma boa apresentação!' );
}
```

Por favor, note: a construção `browser == 'Chrome' || browser == 'Firefox' …` está particionada em linhas diferentes para melhor legíbilidade.

Mas a construção `switch` ainda é mais apresentável e descritiva.
