Quando o navegador lê o atributo `on*`, como `onclick`, ele cria o manipulador a partir do seu conteúdo.

Para `onclick="handler()"` a função será:

```js
function(event) {
  handler() // o conteúdo de onclick
}
```

Agora podemos ver que o valor retornado por `handler()` não é usado e não afeta o resultado.

A correção é simples:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

Também podemos usar `event.preventDefault()`, assim:

```html run
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="https://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
