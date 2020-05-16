# Export e Import

As diretivas export e import têm diversas variantes de sintaxe.

No artigo anterior vimos um uso simples, agora vamos explorar mais exemplos.

## Export before declarations

Podemos rotular qualquer declaração como exportada colocando `export` antes dela, seja uma variável, função ou classe.

Por exemplo, todas essas expressões são válidas:

```js
// exportando um array
*!*export*/!* let months = ['Jan', 'Fev', 'Mar','Abr', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// exportando uma constante
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// exportando uma classe
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="Sem ponto e vírgula depois de export class/function"
Note que `export` antes de uma classe ou uma função não a torna uma [function expression](info:function-expressions-arrows). Ainda é uma declaração de função, embora exportada.

A maioria dos guias de estilo não recomendam ponto e vírgula depois da declaração de funções ou de classes.

É por isso que não há necessidade para ponto e vírgula no fim de `export class` e `export function`:

```js
export function sayHi(user) {
  alert(`Olá, ${user}!`);
} *!* // sem ; no final */!*
```

````

## Export separado das declarações

Além disso, podemos colocar `export` separadamente.

Aqui primeiro declaramos e então exportamos:

```js  
// 📁 say.js
function sayHi(user) {
  alert(`Olá, ${user}!`);
}

function sayBye(user) {
  alert(`Tchau, ${user}!`);
}

*!*
export {sayHi, sayBye}; // uma lista de variáveis exportadas
*/!*
```

...Ou tecnicamente podemos colocar `export` acima das funções também.

## Import *

Normalmente, colocamos uma lista do que importar entre chaves `import {...}`, assim:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Olá, John!
sayBye('John'); // Tchau, John!
```

Mas se houver muita coisa para importar, podemos importar tudo como um objeto usando `import * as <obj>`, por exemplo:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

À primeira vista, "importar tudo" parece algo muito legal, curto para escrever, então por que devemos listar explicitamente o que precisamos importar?

Bem, existem algumas razões.

1. Ferramentas modernas de build ([webpack](http://webpack.github.io) e outras) agrupam os módulos e os otimizam para acelerar o carregamento e remover itens não utilizados.

    Digamos que adicionamos a biblioteca externa `say.js` em nosso projeto com muitas funções:
    ```js
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    Agora, se precisarmos apenas de uma das funções de `say.js` em nosso projeto:
    ```js
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
    ...Então o otimizador vai ver isso e remover as outras funções não utilizadas no código agrupado, tornando o build menor. Isso é chamado de "tree-shaking".

2. Listar explicitamente o que importar nos fornece nomes mais curtos: `sayHi()` ao invés de `say.sayHi()`.
3. Uma lista explícita do que importar fornece uma visão geral melhor da estrutura do código: o que é usado e onde. Torna o código fácil de prover suporte e de refatorar.

## Import "as"

Também podemos usar `as` para importar com diferentes nomes.

Por exemplo, vamos importar `sayHi` na variável local `hi` por questões de brevidade e importar `sayBye` como `bye`:

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Olá, John!
bye('John'); // Tchau, John!
```

## Export "as"

Uma sintaxe similar existe para `export`.

Vamos exportar funções como `hi` e `bye`:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

Agora `hi` e `bye` são nomes oficias para quem vê de fora, para serem usadas nos imports:

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Olá, John!
say.*!*bye*/!*('John'); // Tchau, John!
```

## Export default

Na prática, exitem principalmente dois tipos de módulos.

1. Módulos que contém uma biblioteca, pacote de funções, como `say.js` acima.
2. Módulos que declaram uma única entidade, por exemplo um módulo `user.js` exportando apenas `class User`.

Na maioria dos casos, a segunda abordagem é preferida, para que cada "coisa" tenha seu próprio módulo.

Naturalmente isso exige muitos arquivos porque tudo precisa do seu próprio módulo, mas isso não é problema. Na verdade a navegação do código se torna mais fácil se os arquivos forem bem nomeados e estruturados em pastas.

Módulos fornecem a sintaxe especial `export default` ("a exportação default") para melhorar a aparência de "uma coisa por módulo".

Coloque `export default` antes da entidade a ser exportada:

```js
// 📁 user.js
export *!*default*/!* class User { // apenas adicione "default"
  constructor(name) {
    this.name = name;
  }
}
```

Pode existir apenas um `export default` por arquivo.

...E então importamos sem as chaves:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // não {User}, apenas User

new User('John');
```

Imports sem chaves parecem mais agradáveis. Um erro comum quando se começa a usar módulos é esquecer das chaves. Então, lembre-se, `import` precisa de chaves para imports nomeados (named imports) e não precisa para os imports default.

| Export nomeado | Export default |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

Tecnicamente, podemos ter tanto exports nomeados como exports default em um único módulo, mas na prática as pessoas geralmente não misturam os dois. Um módulo possui exports nomeados ou o export default.

Como pode haver no máximo um export default por arquivo, a entidade exportada pode não ter nome.

Por exemplo, todos esses exports default são perfeitamente válidos:

```js
export default class { // classe sem nome
  constructor() { ... }
}
```

```js
export default function(user) { // função sem nome
  alert(`Olá, ${user}!`);
}
```

```js
// exporta um único valor, sem criar uma variável
export default ['Jan', 'Fev', 'Mar','Abr', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
```

Não prover um nome é ok, porque deve ter apenas um `export default` por arquivo, então `import` - sem as chaves - vai saber o que importar.

Sem `default`, esse export causaria um erro:

```js
export class { // Erro! (exports que não são default precisam de um nome)
  constructor() {}
}
```     

### O nome "default"

Em algumas situações a palavra-chave `default` é usada para referenciar o export default.

Por exemplo, para exportar uma função separadamente da sua definição:

```js
function sayHi(user) {
  alert(`Olá, ${user}!`);
}

//  o mesmo que adicionar "export default" antes da função
export {sayHi as default};
```

Ou, em outra situação, digamos que um módulo `user.js` tenha um export principal "default" e alguns outros nomeados (caso raro, mas acontece)::

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Olá, ${user}!`);
}
```

Assim é como importamos o export default junto com um nomeado:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

E, finalmente, se importarmos tudo `*` como um objeto, então a propriedade `default` é exatamente o export default:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // o export default
new User('John');
```

### Uma palavra contra exports default

Exports nomeados são explícitos. Eles nomeiam exatamente o que importam, então temos essas informações e isso é uma coisa boa.

Exports nomeados nos forçam a usar exatamente o nome certo para importar:

```js
import {User} from './user.js';
// import {MyUser} não funciona, o nome deve ser {User}
```

...Enquanto para o export default, nós sempre escolhemos o nome ao importar:

```js
import User from './user.js'; // funciona
import MyUser from './user.js'; // Também funciona
// pode ser import QualquerCoisa..., e ainda vai funcionar
```

Membros da mesma equipe podem usar nomes diferentes para importar a mesma coisa, e isso não é bom.

Geralmente, para evitar isso e manter o código consistente, existe uma regra que as variáveis importadas devem corresponder ao nome dos arquivos, por exemplo:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

Ainda assim, algumas equipes consideram isso uma séria desvantagem dos exports default. Então, eles preferem usar sempre exports com nomes. Mesmo se apenas uma coisa é exportada, ela ainda será exportada com um nome, sem `default`.

Isso também facilita a a reexportação (veja abaixo).

## Reexportação

A sintaxe de reexportação `export ... from ...` permite importar coisas e imediatamente exportá-las (possivelmente com outro nome), assim:

```js
export {sayHi} from './say.js'; // reexporta sayHi

export {default as User} from './user.js'; // reexporta o default
```

Por que isso seria necessário? Vamos ver um caso de uso prático.

Imagine que estamos escrevendo um "pacote": uma pasta com muitos módulos, com algumas funcionalidades exportadas (ferramentas como NPM permitem publicar e distribuir esses pacotes), e muitos módulos são apenas "auxiliares", para uso interno em outro pacote de módulos.

A estrutura de arquivos pode ser assim:
```
auth/
    index.js  
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

Gostaríamos de exportar a funcionalidade do pacote via um único ponto de entrada, o arquivo principal `auth/index.js`, para ser usado assim:

```js
import {login, logout} from 'auth/index.js'
```

A ideia é que os desenvolvedores que utilizarem nosso pacote não possam interferir na sua estrutura interna. Eles não devem procurar por arquivos dentro da pasta do nosso pacote. Apenas exportamos o que for necessário no `auth/index.js` e mantemos o resto escondido de olhos curiosos.

Como as funcionalidade exportadas estão espalhadas pelo pacote, podemos importá-las em `auth / index.js` e exportá-las nele:

```js
// 📁 auth/index.js

// import login/logout e imediatamente exportá-los
import {login, logout} from './helpers.js';
export {login, logout};

// importar default como User e exportá-lo
import User from './user.js';
export {User};
...
```

Agora os usuários do nosso pacote podem  `import {login} from "auth/index.js"`.

A sintaxe `export ... from ...` é apenas uma notação mais curta para essa import-export:

```js
// 📁 auth/index.js
// importar login/logout e imediatamente exportá-los
export {login, logout} from './helpers.js';

// importar default como User e exportá-lo
export {default as User} from './user.js';
...
```

### Reexportando o export default

O export default precisa de um tratamento separado ao reexportar.


Vamos dizer que temos `user.js`, e gostaríamos de reexportar a classe `User`

```js
// 📁 user.js
export default class User {
  // ...
}
```

1. `export User from './user.js'` não funcionará. O que pode dar errado? ... Mas isso é um erro de sintaxe!

    Para reexportar o export default, nós temos que escrever `export {default as User}`, como no exemplo acima.

2. `export * from './user.js'` reexporta apenas os exports com nome, mas ignora o default.

    Se desejarmos reexportar tanto os export com nome e o export default, serão necessárias duas declarações:
    ```js
    export * from './user.js'; // para reexportar exports com nome
    export {default} from './user.js'; // para reexportar o export default
    ```

Essas esquisitices de reexportar o export default são um dos motivos pelos quais alguns desenvolvedores não gostam deles.

## Resumo

Aqui estão todos os tipos de `export` que abordamos neste e em artigos anteriores.

Você pode verificar lendo-os e relembrando o que eles significam:

- Antes da declaração de uma class/function/..:
  - `export [default] class/function/variable ...`
- Standalone:
  - `export {x [as y], ...}`.
- Reexportação:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (não reexporta o default).
  - `export {default [as y]} from "module"` (reexporta o default).

Import:

- Exports com nome do módulo:
  - `import {x [as y], ...} from "module"`
- Export default:  
  - `import x from "module"`
  - `import {default as x} from "module"`
- Tudo:
  - `import * as obj from "module"`
- Importar o módulo (seu código executado), sem o atribuir a uma variável:
  - `import "module"`

Podemos colocar as declarações `import/export` no início ou no final de um script, isso não importa.

Então, tecnicamente, esse código é correto:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // import no final do arquivo
```

Na prática, as importações normalmente ficam no início do arquivo, mas isso é apenas por conveniência.

**Observe que as declarações de importação e exportação não funcionam dentro de `{...}`.**

Um import condicional como esse não vai funcionar:
```js
if (something) {
  import {sayHi} from "./say.js"; // Erro: importação deve estar em um nível acima
}
```

... Mas e se realmente precisarmos importar algo condicionalmente? Ou na hora certa? Como, carregar um módulo mediante solicitação, quando é realmente necessário?

Veremos importações dinâmicas no próximo capítulo.
