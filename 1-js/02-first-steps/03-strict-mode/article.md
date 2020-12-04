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

Muito em breve, nós vamos aprender sobre funções (uma forma de agrupar comandos), assim vamos pré-anotar que `"use strict"` pode ser colocado no início de uma função. Fazer isso habilita o modo estrito apenas nessa função. Mas geralmente, as pessoas usam no script inteiro.

````warn header="Se assegure que \"use strict\" está no topo"
Por favor, se assegure que `"use strict"` está no topo dos seus scripts, de contrário o modo estrito pode não estar ativado.

O modo estrito não está ativado aqui:

```js no-strict
alert("algum código");
// "use strict" abaixo é ignorado - deve estar no topo

"use strict";

// modo estrito não está ativado
```

Apenas comentários podem aparecer acima de `"use strict"`.
````

```warn header="Não há forma de cancelar `use strict`"
Não existe uma diretiva como `"no use strict"` para reverter o interpretador (*engine*) para o comportamento antigo.

Assim que entramos para o modo estrito, não podemos voltar atrás.
```

## Console do navegador

Quando você usar o [console do navegador](info:devtools) para testar funcionalidades, por favor observe que ele não "usa strict" por padrão.

As vezes, quando usar `use strict` fizer alguma diferença, você terá resultados incorretos.

Assim, como ativar `use strict` no console?

Primeiro, podemos tentar pressionar `key: Shift + Enter` para inserir várias linhas, e colocar` use strict` no topo, assim:

```js
'use strict'; <Shift+Enter para uma nova linha>
//  ...seu código
<Enter para executar>
```

Funciona em vários navegadores, nomeadamente Firefox and Chrome.

Se não funcionar, ex. num navegador antigo, existe uma maneira feia, mas confiável, de garantir `use strict`. Coloque ele dentro deste tipo de contentor (*wrapper*):

```js
(function() {
  'use strict';

  // ...seu código aqui...
})()
```

## Devemos usar "use strict"?

A questão pode parecer óbvia, mas não é tanto.

Pode-se recomendar iniciar scripts com `" use strict "`... Mas sabe o que é legal?

O JavaScript moderno suporta "classes" e "módulos" - estruturas avançadas da linguagem (vamos seguramente chegar até elas), que ativam `use strict` automaticamente. Assim, não precisamos de adicionar a diretiva `" use strict "`, quando as usamos.

**Assim, por agora `" use strict "` é um convidado bem-vindo no topo dos seus scripts. Mais adiante, quando todo o seu código  estiver em classes e módulos, você pode omitir**

Por agora, nós temos de saber sobre `use strict` de um modo geral.

Nos próximos capítulos, à medida que aprendermos novas funcionalidades, vamos ver as diferenças entre o modo estrito e os modos padrões. Felizmente, não há muitos e eles realmente tornam nossas vidas melhores.

Todos os exemplos neste tutorial assumem o modo estrito, a menos que (muito raramente) seja especificado de outra forma.
