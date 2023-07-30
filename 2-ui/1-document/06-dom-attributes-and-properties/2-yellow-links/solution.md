
Primeiro, precisamos encontrar todas as referências externas.

Há duas maneiras.

A primeira é encontrar todos os links usando `document.querySelectorAll('a')` e então filtrar o que precisamos:

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // sem atributo

  if (!href.includes('://')) continue; // sem protocolo

  if (href.startsWith('http://internal.com')) continue; // internal

  link.style.color = 'orange';
}
```

Observe: usamos `link.getAttribute('href')`. Não `link.href`, porque precisamos do valor do HTML.

...Outra forma mais simples seria apenas adicionar as verificações ao seletor CSS

```js
// procura por todos os links que tem :// em href
// mas href não começa com http://internal.com
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```
