Primeiro, precisamos encontrar todas referências externas.

Há duas formas.

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

Por favor observe: usamos `link.getAttribute('href')`. Não `link.href`, porque precisamos do valor do HTML.

...Outra forma mais simples seria apenas adicionar os checks ao seletor CSS

```js
// procura todos os links que tem :// em href
// mas href não começa com http://internal.com
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```
