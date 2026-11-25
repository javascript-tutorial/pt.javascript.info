
# Módulos, introdução

Conforme nossa aplicação cresce, queremos dividi-la em vários arquivos, os chamados "módulos". Um módulo pode conter uma classe ou uma biblioteca de funções para um propósito específico.

Por muito tempo, o JavaScript existiu sem uma sintaxe de módulos em nível de linguagem. Isso não era um problema, porque, inicialmente, os scripts eram pequenos e simples, então não havia necessidade.

Mas, com o tempo, os scripts foram ficando cada vez mais complexos, então a comunidade inventou uma variedade de formas de organizar o código em módulos, bibliotecas especiais para carregar módulos sob demanda.

Para citar alguns (por motivos históricos):

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- um dos sistemas de módulos mais antigos, inicialmente implementado pela biblioteca [require.js](https://requirejs.org/).
- [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) -- o sistema de módulos criado para o servidor Node.js.
- [UMD](https://github.com/umdjs/umd) -- mais um sistema de módulos, sugerido como universal, compatível com AMD e CommonJS.

Hoje todos esses foram lentamente se tornando parte da história, mas ainda podemos encontrá-los em scripts antigos.

O sistema de módulos em nível de linguagem apareceu no padrão em 2015, evoluiu gradualmente desde então, e agora é suportado por todos os principais navegadores e no Node.js. Então vamos estudar os módulos modernos do JavaScript a partir de agora.

## O que é um módulo?

Um módulo é só um arquivo. Um script é um módulo. Simples assim.

Módulos podem carregar uns aos outros e usar as diretivas especiais `export` e `import` para trocar funcionalidade, chamar funções de um módulo a partir de outro:

- A palavra-chave `export` identifica variáveis e funções que devem ser acessíveis de fora do módulo atual.
- `import` permite a importação de funcionalidade de outros módulos.

Por exemplo, se temos um arquivo `sayHi.js` exportando uma função:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Olá, ${user}!`);
}
```

...Então outro arquivo pode importá-la e usá-la:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Olá, John!
```

A diretiva `import` carrega o módulo pelo caminho `./sayHi.js`, relativo ao arquivo atual, e atribui a função exportada `sayHi` à variável correspondente.

Vamos rodar o exemplo no navegador.

Como os módulos suportam palavras-chave e recursos especiais, precisamos avisar o navegador que um script deve ser tratado como um módulo, usando o atributo `<script type="module">`.

Assim:

[codetabs src="say" height="140" current="index.html"]

O navegador automaticamente busca e avalia o módulo importado (e suas importações, se necessário), e então roda o script.

```warn header="Módulos só funcionam via HTTP(s), não localmente"
Se você tentar abrir uma página web localmente, via protocolo `file://`, vai perceber que as diretivas `import/export` não funcionam. Use um servidor web local, como [static-server](https://www.npmjs.com/package/static-server#getting-started) ou use o recurso de "live server" do seu editor, como a [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) do VS Code, para testar módulos.
```

## Recursos principais dos módulos

O que é diferente nos módulos, comparados a scripts "comuns"?

Existem recursos principais, válidos tanto para o JavaScript do navegador quanto do lado do servidor.

### Sempre "use strict"

Módulos sempre funcionam em modo estrito. Por exemplo, atribuir a uma variável não declarada vai gerar um erro.

```html run
<script type="module">
  a = 5; // erro
</script>
```

### Escopo em nível de módulo

Cada módulo tem seu próprio escopo de nível superior. Em outras palavras, variáveis e funções de nível superior de um módulo não são vistas em outros scripts.

No exemplo abaixo, dois scripts são importados, e `hello.js` tenta usar a variável `user` declarada em `user.js`. Isso falha, porque é um módulo separado (você vai ver o erro no console):

[codetabs src="scopes" height="140" current="index.html"]

Módulos devem usar `export` para o que querem que seja acessível de fora, e `import` para o que precisam.

- `user.js` deve exportar a variável `user`.
- `hello.js` deve importá-la do módulo `user.js`.

Em outras palavras, com módulos usamos import/export em vez de depender de variáveis globais.

Essa é a variante correta:

[codetabs src="scopes-working" height="140" current="hello.js"]

No navegador, se falarmos de páginas HTML, um escopo de nível superior independente também existe para cada `<script type="module">`.

Aqui estão dois scripts na mesma página, ambos `type="module"`. Eles não veem as variáveis de nível superior um do outro:

```html run
<script type="module">
  // A variável só é visível neste script de módulo
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Erro: user não está definido
  */!*
</script>
```

```smart
No navegador, podemos tornar uma variável global, no nível de `window`, atribuindo-a explicitamente a uma propriedade de `window`, por exemplo, `window.user = "John"`.

Então todos os scripts vão vê-la, tanto com `type="module"` quanto sem. 

Dito isso, criar esse tipo de variável global é malvisto. Tente evitá-las.
```

### O código de um módulo é avaliado só na primeira vez em que é importado

Se o mesmo módulo é importado por vários outros módulos, seu código é executado só uma vez, na primeira importação. Depois, suas exportações são entregues a todos os importadores seguintes.

Essa avaliação única tem consequências importantes, que devemos conhecer. 

Vamos ver alguns exemplos.

Primeiro, se executar o código de um módulo traz efeitos colaterais, como mostrar uma mensagem, então importá-lo várias vezes só vai disparar isso uma vez -- a primeira:

```js
// 📁 alert.js
alert("O módulo foi avaliado!");
```

```js
// Importa o mesmo módulo a partir de arquivos diferentes

// 📁 1.js
import './alert.js'; // O módulo foi avaliado!

// 📁 2.js
import './alert.js'; // (não mostra nada)
```

A segunda importação não mostra nada, porque o módulo já foi avaliado.

Existe uma regra: o código de nível superior de um módulo deve ser usado para inicialização, criação de estruturas de dados internas específicas do módulo. Se precisarmos fazer algo chamável várias vezes -- devemos exportá-lo como uma função, como fizemos com `sayHi` acima.

Agora, vamos considerar um exemplo mais profundo.

Digamos que um módulo exporte um objeto:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

Se esse módulo é importado por vários arquivos, o módulo só é avaliado na primeira vez, o objeto `admin` é criado, e então é passado a todos os importadores seguintes.

Todos os importadores recebem exatamente o único e mesmo objeto `admin`:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// Tanto 1.js quanto 2.js referenciam o mesmo objeto admin
// Mudanças feitas em 1.js são visíveis em 2.js
*/!*
```

Como você pode ver, quando `1.js` muda a propriedade `name` no `admin` importado, então `2.js` consegue ver o novo `admin.name`.

Isso acontece exatamente porque o módulo é executado só uma vez. As exportações são geradas, e então são compartilhadas entre os importadores, então se algo muda o objeto `admin`, os outros importadores vão ver isso.

**Esse comportamento é, na verdade, bem conveniente, porque nos permite *configurar* módulos.**

Em outras palavras, um módulo pode fornecer uma funcionalidade genérica que precisa de uma configuração. Por exemplo, autenticação precisa de credenciais. Então ele pode exportar um objeto de configuração esperando que o código externo atribua valores a ele.

Aqui está o padrão clássico:
1. Um módulo exporta algum meio de configuração, por exemplo, um objeto de configuração.
2. Na primeira importação, nós o inicializamos, escrevendo em suas propriedades. O script principal da aplicação pode fazer isso.
3. As importações seguintes usam o módulo.

Por exemplo, o módulo `admin.js` pode fornecer certa funcionalidade (ex.: autenticação), mas espera que as credenciais venham de fora para o objeto `config`:

```js
// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Pronto para atender, ${config.user}!`);
}
```

Aqui, `admin.js` exporta o objeto `config` (inicialmente vazio, mas também pode ter propriedades padrão).

Então, em `init.js`, o primeiro script da nossa aplicação, importamos `config` dele e definimos `config.user`:

```js
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

...Agora o módulo `admin.js` está configurado. 

Os importadores seguintes podem chamá-lo, e ele mostra corretamente o usuário atual:

```js
// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Pronto para atender, *!*Pete*/!*!
```


### import.meta

O objeto `import.meta` contém informações sobre o módulo atual.

Seu conteúdo depende do ambiente. No navegador, ele contém a URL do script, ou a URL da página web atual, se estiver dentro de um HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // URL do script
  // para um script inline - a URL da página HTML atual
</script>
```

### Num módulo, o "this" é undefined

Esse é um recurso secundário, mas, para ficar completo, devemos mencioná-lo.

Num módulo, o `this` de nível superior é undefined.

Compare com scripts que não são módulos, onde `this` é um objeto global:

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Recursos específicos de navegador

Também existem várias diferenças específicas de navegador em scripts com `type="module"`, comparados aos comuns.

Você pode querer pular esta seção por enquanto, se está lendo pela primeira vez, ou se não usa JavaScript num navegador.

### Scripts de módulo são adiados

Scripts de módulo são *sempre* adiados, com o mesmo efeito do atributo `defer` (descrito no capítulo [](info:script-async-defer)), tanto para scripts externos quanto inline.

Em outras palavras:
- baixar scripts de módulo externos `<script type="module" src="...">` não bloqueia o processamento do HTML, eles carregam em paralelo com outros recursos.
- scripts de módulo esperam até o documento HTML estar totalmente pronto (mesmo que sejam pequenos e carreguem mais rápido que o HTML), e só então rodam.
- a ordem relativa dos scripts é mantida: scripts que vêm primeiro no documento são executados primeiro.

Como efeito colateral, scripts de módulo sempre "veem" a página HTML totalmente carregada, incluindo elementos HTML abaixo deles.

Por exemplo:

```html run
<script type="module">
*!*
  alert(typeof button); // object: o script consegue "ver" o botão abaixo
*/!*
  // como os módulos são adiados, o script roda depois que a página toda é carregada
</script>

Compare com o script comum abaixo:

<script>
*!*
  alert(typeof button); // button é undefined, o script não consegue ver elementos abaixo
*/!*
  // scripts comuns rodam imediatamente, antes do resto da página ser processado
</script>

<button id="button">Button</button>
```

Observe: o segundo script, na verdade, roda antes do primeiro! Então vamos ver `undefined` primeiro, e depois `object`.

Isso acontece porque os módulos são adiados, então esperamos o documento ser processado. O script comum roda imediatamente, então vemos sua saída primeiro.

Ao usar módulos, devemos estar cientes de que a página HTML aparece conforme carrega, e os módulos JavaScript rodam depois disso, então o visitante pode ver a página antes da aplicação JavaScript estar pronta. Algumas funcionalidades podem ainda não funcionar. Devemos colocar "indicadores de carregamento", ou de alguma forma garantir que o visitante não vá ficar confuso com isso.

### Async funciona em scripts inline

Para scripts que não são módulos, o atributo `async` só funciona em scripts externos. Scripts assíncronos rodam imediatamente quando prontos, independentemente de outros scripts ou do documento HTML.

Para scripts de módulo, ele funciona em scripts inline também.

Por exemplo, o script inline abaixo tem `async`, então ele não espera por nada.

Ele realiza a importação (busca `./analytics.js`) e roda quando pronto, mesmo que o documento HTML ainda não tenha terminado, ou se outros scripts ainda estiverem pendentes.

Isso é bom para funcionalidades que não dependem de nada, como contadores, anúncios, listeners de evento em nível de documento.

```html
<!-- todas as dependências são buscadas (analytics.js), e o script roda -->
<!-- não espera pelo documento ou outras tags <script> -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### Scripts externos

Scripts externos que têm `type="module"` são diferentes em dois aspectos:

1. Scripts externos com o mesmo `src` rodam só uma vez:
    ```html
    <!-- o script my.js é buscado e executado só uma vez -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. Scripts externos que são buscados de outra origem (ex.: outro site) exigem cabeçalhos [CORS](mdn:Web/HTTP/CORS), como descrito no capítulo <info:fetch-crossorigin>. Em outras palavras, se um script de módulo é buscado de outra origem, o servidor remoto precisa fornecer um cabeçalho `Access-Control-Allow-Origin` permitindo a busca.
    ```html
    <!-- another-site.com precisa fornecer Access-Control-Allow-Origin -->
    <!-- senão, o script não vai executar -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    Isso garante mais segurança por padrão.

### Módulos "soltos" não são permitidos

No navegador, `import` precisa receber uma URL relativa ou absoluta. Módulos sem nenhum caminho são chamados de módulos "soltos" (*bare*). Esses módulos não são permitidos em `import`.

Por exemplo, este `import` é inválido:
```js
import {sayHi} from 'sayHi'; // Erro, módulo "solto"
// o módulo precisa ter um caminho, ex.: './sayHi.js' ou onde quer que o módulo esteja
```

Certos ambientes, como Node.js ou ferramentas de empacotamento, permitem módulos "soltos", sem nenhum caminho, já que têm suas próprias formas de encontrar módulos e ganchos para ajustá-los. Mas navegadores ainda não suportam módulos "soltos".

### Compatibilidade, "nomodule"

Navegadores antigos não entendem `type="module"`. Scripts de tipo desconhecido são simplesmente ignorados. Para eles, é possível fornecer uma alternativa usando o atributo `nomodule`:

```html run
<script type="module">
  alert("Roda em navegadores modernos");
</script>

<script nomodule>
  alert("Navegadores modernos conhecem tanto type=module quanto nomodule, então pulam este")
  alert("Navegadores antigos ignoram script com type=module desconhecido, mas executam este.");
</script>
```

## Ferramentas de empacotamento (build)

Na vida real, módulos de navegador raramente são usados na sua forma "crua". Normalmente, nós os empacotamos juntos com uma ferramenta especial, como o [Webpack](https://webpack.js.org/), e fazemos o deploy para o servidor de produção.

Um dos benefícios de usar empacotadores -- eles dão mais controle sobre como os módulos são resolvidos, permitindo módulos "soltos" e muito mais, como módulos CSS/HTML.

Ferramentas de empacotamento fazem o seguinte:

1. Pegam um módulo "principal", aquele que vai ser colocado em `<script type="module">` no HTML.
2. Analisam suas dependências: importações e depois importações das importações etc.
3. Constroem um único arquivo com todos os módulos (ou vários arquivos, isso é ajustável), substituindo as chamadas nativas de `import` por funções do empacotador, para que tudo funcione. Tipos "especiais" de módulo, como módulos HTML/CSS, também são suportados.
4. No processo, outras transformações e otimizações podem ser aplicadas:
    - Código inalcançável é removido.
    - Exportações não usadas são removidas ("tree-shaking").
    - Instruções específicas de desenvolvimento, como `console` e `debugger`, são removidas.
    - Sintaxe moderna e de ponta do JavaScript pode ser transformada em uma mais antiga, com funcionalidade parecida, usando o [Babel](https://babeljs.io/).
    - O arquivo resultante é minificado (espaços removidos, variáveis trocadas por nomes mais curtos, etc.).

Se usarmos ferramentas de empacotamento, então, como os scripts são empacotados juntos num único arquivo (ou poucos arquivos), as instruções `import/export` dentro desses scripts são substituídas por funções especiais do empacotador. Então o script "empacotado" resultante não contém nenhum `import/export`, não exige `type="module"`, e podemos colocá-lo num script comum:

```html
<!-- Supondo que obtivemos bundle.js de uma ferramenta como o Webpack -->
<script src="bundle.js"></script>
```

Dito isso, módulos nativos também são utilizáveis. Então não vamos usar o Webpack aqui: você pode configurá-lo mais tarde.

## Resumo

Resumindo, os conceitos principais são:

1. Um módulo é um arquivo. Para fazer `import/export` funcionar, os navegadores precisam de `<script type="module">`. Módulos têm várias diferenças:
    - Adiados por padrão.
    - Async funciona em scripts inline.
    - Pra carregar scripts externos de outra origem (domínio/protocolo/porta), cabeçalhos CORS são necessários.
    - Scripts externos duplicados são ignorados.
2. Módulos têm seu próprio escopo local de nível superior e trocam funcionalidade via `import/export`.
3. Módulos sempre usam `use strict`.
4. O código de um módulo é executado só uma vez. Exportações são criadas uma vez e compartilhadas entre os importadores.

Quando usamos módulos, cada módulo implementa a funcionalidade e a exporta. Então usamos `import` para importá-la diretamente onde é necessária. O navegador carrega e avalia os scripts automaticamente.

Em produção, as pessoas costumam usar empacotadores como o [Webpack](https://webpack.js.org) para empacotar os módulos juntos, por motivos de desempenho e outros.

No próximo capítulo vamos ver mais exemplos de módulos, e como as coisas podem ser exportadas/importadas.
