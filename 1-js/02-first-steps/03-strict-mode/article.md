# O modo moderno, "use strict"

Por um longo tempo, o JavaScript evoluiu sem problemas de compatibilidade. Novos recursos foram adicionados ao idioma enquanto as funcionalidades antigas não foram alteradas.

Isso teve o benefício de nunca quebrar o código existente. Mas a desvantagem foi que qualquer erro ou decisão imperfeita feita pelos criadores do JavaScript acabou ficando presa na linguagem para sempre.

Este foi o caso até 2009, quando ECMAScript 5 (ES5) apareceu. Adicionou novos recursos à linguagem e modificou alguns dos existentes. Para manter o código antigo funcionando, a maioria das modificações está desativada por padrão. Você precisa habilitá-los explicitamente com uma diretiva especial: `" use strict "`.

## "use strict"

A diretiva parece uma string `"use strict"` ou `'use strict'`. Quando ele está localizado no topo de um script, todo o script funciona da maneira "moderna".

For example:

```js
"use strict";

// esse código funciona de forma moderna
...
```

Nós vamos aprender sobre funções, uma forma de agupar comandos, em breve.


Vamos apenas observar que "use strict" pode ser colocado no início da maioria dos tipos de funções em vez do script inteiro. Fazer isso habilita o modo estrito apenas nessa função. Mas geralmente, as pessoas usam no script inteiro.

O modo estrito não está ativado aqui:

```js no-strict
alert("algum código");
// "use strict" abaixo é ignorado - deve estar no topo

"use strict";

// modo estrito não está ativado
```

Apenas comentários devem aparecer acima de `"use strict"`.

## Console do navegador

Para o futuro, quando você usar o console do navegador para testar funcionalidades, observe que ele não "usa strict" por padrão.

As vezes, quando usar `use strict` faz alguma diferença, você terá resultados incorretos.

Mesmo se pressionarmos `key: Shift + Enter` para inserir várias linhas e colocar` use strict` no topo, isso não funcionará. Isso é por causa de como o console executa o código internamente.

A maneira confiável de garantir `use strict` seria inserir o código no console da seguinte forma:

```js
(function() {
  'use strict';

  // ...seu código...
})()
```

## Sempre "use strict"

Ainda precisamos cobrir as diferenças entre o modo estrito e o modo "padrão".

Nos próximos capítulos, assim como nós vamos aprender novas funcinalidades, vamos aprender as diferenças entre o modo estrito e os modos padrões. Felizmente, não há muitos e eles realmente tornam nossas vidas melhores.

Por agora, de um momento geral, basta saber sobre isso:

1. A diretiva `" use strict "` alterna o mecanismo para o modo "moderno", alterando o comportamento de alguns recursos internos. Vamos ver os detalhes mais tarde no tutorial.
2. O modo estrito é ativado colocando `" use strict "` no topo de um script ou função. Vários recursos de idioma, como "classes" e "módulos", ativam o modo estrito automaticamente.
3. Modo estrito é suportado por todos os navegadores modernos.
4. Recomendamos sempre iniciar scripts com `" use strict "`. Todos os exemplos neste tutorial assumem o modo estrito, a menos que (muito raramente) seja especificado de outra forma.
