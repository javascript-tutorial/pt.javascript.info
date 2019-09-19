

```js run demo
let userName = prompt("Quem está aí?", '');

if (userName == 'Admin') {

  let pass = prompt('Senha?', '');

  if (pass == 'TheMaster') {
    alert( 'Bem vindo!' );
  } else if (pass == '' || pass == null) {
    alert( 'Cancelado.' );
  } else {
    alert( 'Senha incorreta.' );
  }

} else if (userName == '' || userName == null) {
  alert( 'Cancelado' );
} else {
  alert( "Eu não conheço você." );
}
```

Note as identações verticais dentro dos blocos de `if`s. Tecnicamente, elas não são necessárias, mas fazem o código mais legível.
