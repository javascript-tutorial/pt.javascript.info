# Importações dinâmicas

As declarações de importação e exportação que abordamos nos capítulos anteriores são chamadas de "estáticas". A sintaxe é bem simples e rígida. 

Primeiro, não podemos gerar dinamicamente quaisquer parâmetros de `import`.

O caminho do módulo deve ser uma string primitiva, não pode ser uma chamada de função. Isso não funcionará:

```js
import ... from *!*getModuleName()*/!*; // Erro, apenas a partir de "string" é permitido
```

Segundo, não podemos importar condicionalmente ou em tempo de execução:

```js
if(...) {
  import ...; // Erro, não permitido!
}

{
  import ...; // Erro, não podemos colocar import em qualquer bloco
}
```

Isso ocorre porque `import`/`export` têm como objetivo fornecer uma estrutura básica para a organização do código. Isso é algo bom, pois a estrutura do código pode ser analisada, os módulos podem ser reunidos e agrupados em um único arquivo por ferramentas especiais, e as exportações não utilizadas podem ser removidas ("tree-shaken"). Isso é possível apenas porque a estrutura de importações/exportações é simples e fixa.

Mas como podemos importar um módulo dinamicamente, sob demanda?

## A expressão import()

A expressão `import(módulo)` carrega o módulo e retorna uma promise que é resolvida para um objeto de módulo contendo todas as suas exportações. Pode ser chamado de qualquer lugar no código.

Podemos utilizá-lo dinamicamente em qualquer lugar do código , por exemplo:

```js
let modulePath = prompt("Qual módulo carregar?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <Erro de carregamento, por exemplo, se o módulo não existir>)
```

Ou, poderíamos usar `let module = await import(caminhoDoModulo)` se estiver dentro de uma função assíncrona.

Por exemplo, se temos o seguinte módulo `say.js`:

```js
// 📁 say.js
export function hi() {
  alert(`Olá`);
}

export function bye() {
  alert(`Adeus`);
}
```

...Então a importação dinâmica pode ser assim:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

Ou, se `say.js` tiver a exportação padrão>

```js
// 📁 say.js
export default function() {
  alert("Módulo carregado (exportação padrão)!");
}
```

...Então, para acessá-lo, podemos usar a propriedade `default` do objeto do módulo:

```js
let obj = await import('./say.js');
let say = obj.default;
// Ou, em uma linha: let {default: say} = await import('./say.js');

say();
```

Aqui está o exemplo completo:

[codetabs src="say" current="index.html"]

```smart
Importações dinâmicas funcionam em scripts regulares, não requerem `script type="module"`.
```

```smart
Embora `import()` pareça uma chamada de função, é uma sintaxe especial que, por acaso, utiliza parênteses (semelhante a `super()`).

Portanto, não podemos copiar `import` para uma variável ou usar `call/apply` com ele. Não é uma função.
```
