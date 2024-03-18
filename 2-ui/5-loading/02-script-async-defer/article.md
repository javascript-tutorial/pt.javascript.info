
# Scripts: async, defer

Em sites modernos, os scripts geralmente são "mais pesados" do que o HTML: seu tamanho para download é maior e o tempo de processamento também é maior.

Quando o navegador carrega o HTML e encontra uma tag `<script>...</script>`, ele não pode continuar construindo o DOM. Ele deve executar o script no momento exato que o encontra. O mesmo acontece com scripts externos `<script src="..."></script>`: o navegador deve aguardar o download do script, executar o script baixado e só então pode processar o resto da página.

Isso nos leva a duas questões importantes:

1. Os scripts não conseguem ver os elementos do DOM abaixo deles, então não conseguem manipular eventos, etc.
2. Se houver um script volumoso no topo da página, ele vai "bloquear a página". Os usuários não podem ver o conteúdo da página até que o script seja baixado e executado.

```html run height=100
<p>...conteúdo antes do script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- Isso não se torna visível até que o script carregue -->
<p>...conteúdo depois do script...</p>
```

Existem algumas soluções alternativas para esses problemas. Por exemplo, podemos colocar um script no final da página. Assim, ele pode ver os elementos acima dele e consequentemente, não bloqueia a exibição do conteúdo da página:

```html
<body>
  ...todo o conteúdo acima do script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

Mas essa solução está longe de ser perfeita. Por exemplo, o navegador percebe o script (e pode começar a baixá-lo) somente depois de baixar o documento HTML por completo. Para documentos HTML longos, isso pode ser um atraso perceptível para o usuário.

Essas coisas são invisíveis para pessoas que usam conexões de internet muito rápidas, mas muitas pessoas no mundo ainda têm velocidades lentas e usam uma conexão de internet móvel longe de ser perfeita.

Felizmente, existem dois atributos `<script>` que resolvem o problema para nós: `defer` e `async`.

## defer

O atributo `defer` diz ao navegador para não esperar pelo script. Em vez disso, o navegador continuará processando o HTML e criando a DOM. O script carrega "em segundo plano" e, em seguida, é executado quando a DOM está totalmente criada.

Aqui está o mesmo exemplo acima, mas utilizando o `defer`:

```html run height=100
<p>...conteúdo antes do script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- visível imediatamente -->
<p>...conteúdo depois do script...</p>
```

Em outras palavras:

- Scripts com `defer` nunca bloqueiam a página.
- Scripts com `defer` sempre são executados quando a DOM está pronto (mas antes do evento `DOMContentLoaded`).

O exemplo a seguir demonstra a segunda parte:

```html run height=100
<p>...conteúdo antes do script...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM pronta antes do defer!"));
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...conteúdo depois do script...</p>
```

1. O conteúdo da página aparece imediatamente.
2. O manipulador de eventos `DOMContentLoaded` espera pelo script com a tag defer. O evento é disparado só quando o script é baixado e executado.

**Os scripts com a tag defer mantêm sua ordem relativa, assim como os scripts normais.**
Digamos que temos dois scripts com a tag defer: o `long.js` e o `small.js`:


```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

Os navegadores examinam a página em busca de scripts e os baixam em paralelo para melhorar o desempenho. Portanto, no exemplo acima, os dois scripts são baixados em paralelo. O `small.js` provavelmente terminará primeiro.

... Mas o atributo `defer`, além de dizer ao navegador "não bloquear", garante que a ordem relativa seja mantida. Portanto, embora `small.js` carregue primeiro, ele ainda espera e executa após a execução de `long.js`.

Isso pode ser importante para os casos em que precisamos carregar uma biblioteca JavaScript e, em seguida, um script que depende dela.

```smart header="O atributo `defer` é apenas para scripts externos"
O atributo `defer` é ignorado se a tag `<script>` não possui o atributo `src`.
```

## async

O atributo `async` é parecido com o `defer`. Ele também não bloqueia a página, mas tem diferenças importantes no seu comportamento.

O atributo `async` significa que um script é completamente independente:

- O navegador não bloqueia em scripts `async` (como `defer`).
- Outros scripts não esperam por scripts `async`, e scripts `async` não esperam por eles.
- O evento `DOMContentLoaded` e os scripts `async` não esperam um pelo outro:
    - `DOMContentLoaded` pode acontecer antes de um script `async` (se um script `async` terminar de carregar depois que a página for concluída)
    - ... ou após um script `async` (se um script `async` for curto ou estiver em cache HTTP)

Em outras palavras, os scripts `async` são carregados em segundo plano e executados quando prontos. O DOM e outros scripts não esperam por eles e não esperam por nada. Um script totalmente independente que é executado quando carregado. Tão simples quanto parece, não é mesmo?

Aqui está um exemplo parecido ao que vimos com o `defer`: dois scripts `long.js` e `small.js`, mas agora com `async` em vez de `defer`.

Eles não esperam um pelo outro. Qualquer um que carregue primeiro (provavelmente `small.js`) - é executado primeiro:

```html run height=100
<p>...conteúdo antes dos scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM pronta!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...conteúdo depois dos scripts...</p>
```

- O conteúdo da página aparece imediatamente: `async` não o bloqueia.
- `DOMContentLoaded` pode acontecer antes e depois de `async`, sem garantias aqui.
- Um script menor `small.js` está em segundo lugar, mas provavelmente carrega antes de `long.js`, então `small.js` é executado primeiro. Embora, pode ser que `long.js` carregue primeiro, se armazenado em cache, ele executa primeiro. Em outras palavras, os scripts `async` são executados na ordem que "carregar primeiro".

Os scripts `async` são ótimos quando integramos um script independente de terceiros na página: contadores, anúncios e assim por diante, pois eles não dependem de nossos scripts, e nossos scripts não devem esperar por eles:

```html
<!-- O Google Analytics geralmente é adicionado assim -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

```smart header="O atributo `async` é apenas para scripts externos"
Assim como `defer`, o atributo `async` é ignorado se a tag `<script>` não tiver `src`.
```

## Scripts dinâmicos

Existe mais uma maneira importante de adicionar um script à página.

Podemos criar um script e anexá-lo ao documento dinamicamente usando JavaScript:

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

O script começa a carregar assim que é anexado ao documento `(*)`.

**Os scripts dinâmicos se comportam como "async" por padrão.**

Resumindo:
- Eles não esperam nada, nada os espera.
- O script que carrega primeiro -- é executado primeiro (ordem que "carregar primeiro").

Isso pode ser alterado se definirmos explicitamente `script.async=false`. Em seguida, os scripts serão executados na ordem do documento, assim como `defer`.

Neste exemplo, a função `loadScript(src)` adiciona um script e também define `async` como `false`.

Portanto, `long.js` sempre executa primeiro (como é adicionado primeiro):

```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js roda primeiro por causa do async=false
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

Sem `script.async=false`, os scripts seriam executados na ordem padrão de carregamento primeiro (o `small.js` provavelmente primeiro).

Novamente, como acontece com o `defer`, a ordem é importante se quisermos carregar uma biblioteca e depois outro script que dependa dela.


## Resumo

Ambos `async` e `defer` têm uma coisa em comum: o download dos scripts não bloqueia a renderização da página. Assim, o usuário pode ler o conteúdo da página e familiarizar-se com a página imediatamente.

Mas também existem diferenças essenciais entre eles:

|         | Ordem | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Ordem do que carregar primeiro*. A ordem dos documentos não importa - o que carrega primeiro é executado primeiro |  Irrelevante. Pode carregar e executar enquanto o documento ainda não foi totalmente baixado. Isso acontece se os scripts forem pequenos ou armazenados em cache e o documento for longo o suficiente. |
| `defer` | *Ordem do documento* (conforme estão no documento). |  Executa depois que o documento é carregado e transformado (eles esperam se for preciso), logo antes do `DOMContentLoaded`. |

Na prática, `defer` é usado para scripts que precisam de todo o DOM e/ou sua ordem de execução relativa é importante.

E `async` é usado para scripts independentes, como contadores ou anúncios. E sua ordem de execução relativa não importa.

```warn header="A página sem scripts deve ser utilizável"
Atenção: se você estiver usando `defer` ou `async`, o usuário verá a página *antes* do script carregar.

Nesse caso, alguns componentes podem não ter inicializado na tela ainda.

Não se esqueça de indicar que eles estão "carregando" e desabilitar os botões que ainda não devem funcionar. Deixe o usuário ver claramente o que ele pode fazer na página e o que ainda está sendo preparado.
```