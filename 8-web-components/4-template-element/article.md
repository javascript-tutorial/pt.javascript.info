
# Elemento `template`

<<<<<<< HEAD
O elemento nativo `<template>` atua como um armazenamento para modelos de marcação HTML. O navegador ignora seu conteúdo, apenas verifica a validade da sintaxe, mas podemos acessá-lo e usá-lo em JavaScript para criar outros elementos.
=======
A built-in `<template>` element serves as a storage for HTML markup templates. The browser ignores its contents, only checks for syntax validity, but we can access and use it in JavaScript, to create other elements.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Em teoria, poderíamos criar qualquer elemento invisível em algum lugar do HTML para fins de armazenamento de marcação HTML. O que há de especial no `<template>`?

Primeiro, seu conteúdo pode ser qualquer HTML válido, mesmo que normalmente exija uma tag de fechamento apropriada.

Por exemplo, podemos colocar lá uma linha de tabela `<tr>`:
```html
<template>
  <tr>
    <td>Conteúdo</td>
  </tr>
</template>
```

Geralmente, se tentarmos colocar `<tr>` dentro, digamos, de um `<div>`, o navegador detecta a estrutura DOM inválida e a "corrige", adicionando `<table>`ao redor. Isso não é o que queremos. Por outro lado, `<template>` mantém exatamente o que colocamos lá.

Também podemos incluir estilos e scripts dentro do `<template>`:

```html
<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Hello");
  </script>
</template>
```

O navegador considera o conteúdo dentro de `<template>` "fora do documento": estilos não são aplicados, scripts não são executados, `<video autoplay>` não é iniciado, etc.

O conteúdo se torna ativo (estilos são aplicados, scripts são executados, etc.) quando o inserimos no documento.

## Inserindo um modelo

O conteúdo do modelo está disponível em sua propriedade `content` como um [DocumentFragment](info:modifying-document#document-fragment) -- um tipo especial de nó DOM.

Podemos tratá-lo como qualquer outro nó DOM, exceto por uma propriedade especial: quando o inserimos em algum lugar, seus filhos são inseridos no lugar dele.

Por exemplo:

```html run
<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Olá, mundo!</div>
</template>

<script>
  let elem = document.createElement('div');

*!*
  // Clona o conteúdo do modelo para reutilizá-lo várias vezes
  elem.append(tmpl.content.cloneNode(true));
*/!*

  document.body.append(elem);
  // Agora, o script dentro de <template> é executado.
</script>
```

Vamos reescrever um exemplo de Shadow DOM do capítulo anterior usando `<template>`:

```html run untrusted autorun="no-epub" height=60
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Clique em mim</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

*!*
    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)
*/!*

    elem.shadowRoot.getElementById('message').innerHTML = "Olá das sombras!";
  };
</script>
```

Na linha `(*)` ao clonar e inserir `tmpl.content`, como um `DocumentFragment`, seus filhos (`<style>`, `<p>`) são inseridos no lugar.

Eles formam o DOM sombra:

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
```

## Resumo

Para resumir:

- O conteúdo de `<template>` pode ser qualquer HTML sintaticamente correto.
- O conteúdo de `<template>` é considerado "fora do documento", portanto, não afeta nada.
- Podemos acessar `template.content` via JavaScript, cloná-lo para reutilizar em um novo componente.

A tag `<template>` é única, pois:

- O navegador verifica a sintaxe HTML dentro dela (ao contrário de usar uma string de modelo dentro de um script).
- ...Mas ainda permite o uso de quaisquer tags HTML de nível superior, mesmo aquelas que não fazem sentido sem envoltórios apropriados (por exemplo, `<tr>`).
- O conteúdo se torna interativo: scripts são executados, `<video autoplay>` é reproduzido etc., quando inserido no documento.

O elemento `<template>` não apresenta mecanismos de iteração, vinculação de dados ou substituição de variáveis, mas podemos implementar esses recursos em cima dele.
