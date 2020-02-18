Para executar precisamente a funcionalidade do `switch`, o `if` deve empregar uma comparação exata (*strict comparison*) `'==='`.

Contudo, para certas *strings* um simples `'=='` tanbém serve.

```js no-beautify
if(browser == 'Edge') {
  alert("Você usa o Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Esta bem, também suportamos esse navegador (browser).' );
} else {
  alert( 'Esperamos que esta página tenha uma boa apresentação!' );
}
```

Por favor, note: a construção `browser == 'Chrome' || browser == 'Firefox' …` está repartida por múltiplas linhas para melhor leitura.

Mas, a construção `switch` ainda é mais simples e mais descritiva.
