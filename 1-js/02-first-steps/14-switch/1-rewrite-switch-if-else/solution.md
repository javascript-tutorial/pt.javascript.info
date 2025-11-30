Para precisamente se equiparar à funcionalidade do `switch`, o `if` deve utilizar uma comparação exata `'==='`.

Contudo, para certas *strings*, um simples `'=='` também funciona.

```js no-beautify
if(browser == 'Edge') {
  alert("Você tem o Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Ok, nós também suportamos esses navegadores' );
} else {
  alert( 'Esperamos que esta página pareça bem!' );
}
```

Por favor, note: a construção `browser == 'Chrome' || browser == 'Firefox' …` está repartida por múltiplas linhas para melhor leitura.

Numa comparação, a construção `switch` é mais clara e descritiva.
