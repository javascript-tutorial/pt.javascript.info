
# Scripts: async, defer

Em sites modernos, os scripts geralmente são "mais pesados" do que o HTML: seu tamanho de download é maior e o tempo de processamento também é maior.

Quando o navegador carrega HTML e encontra uma tag `<script>...</script>`, ele não pode continuar construindo o DOM. Ele deve executar o script no momento exato que o encontra. O mesmo acontece com scripts externos `<script src="..."></script>`: o navegador deve aguardar o download do script, executar o script baixado e só então pode processar o resto da página em seguida.

Isso leva a duas questões importantes:

1. Os scripts não conseguem ver os elementos da DOM abaixo deles, então não conseguem manipular eventos, etc.
2. Se houver um script volumoso no topo da página, ele "bloqueia a página". Os usuários não podem ver o conteúdo da página até que ele faça o download e execute:

```html run height=100
<p>...conteúdo antes do script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- Isso não se torna visível até que o script carregue -->
<p>...conteúdo depois do script...</p>
```
Existem algumas soluções alternativas para esses problemas. Por exemplo, podemos colocar um script no final da página. Assim, ele pode ver os elementos acima dele e consequentemente não bloqueia a exibição do conteúdo da página:

```html
<body>
  ...todo o conteúdo acima do script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

Mas essa solução está longe de ser perfeita. Por exemplo, o navegador percebe o script (e pode começar a baixá-lo) somente depois de baixar o documento HTML completo. Para documentos HTML longos, isso pode ser um atraso perceptível para o usuário.

Essas coisas são invisíveis para pessoas que usam conexões de internet muito rápidas, mas muitas pessoas no mundo ainda têm velocidades lentas e usam uma conexão de internet móvel longe de ser perfeita.

Felizmente, existem dois atributos `<script>` que resolvem o problema para nós: `defer` e `async`.

## defer

O atributo `defer` diz ao navegador para não esperar pelo script. Em vez disso, o navegador continuará processando o HTML e criando a DOM. O script carrega "em segundo plano" e, em seguida, é executado quando o DOM está totalmente criado.

Aqui está o mesmo exemplo acima, mas utilizando o `defer`:

```html run height=100
<p>...conteúdo antes do script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- visível imediatamente -->
<p>...conteúdo depois do script...</p>
```

Em outras palavras:

- Scripts com `defer` nunca bloqueiam a página.
- Scripts com `defer` sempre são executados quando o DOM está pronto (mas antes do evento `DOMContentLoaded`).

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

Browsers scan the page for scripts and download them in parallel, to improve performance. So in the example above both scripts download in parallel. The `small.js` probably finishes first.

...But the `defer` attribute, besides telling the browser "not to block", ensures that the relative order is kept. So even though `small.js` loads first, it still waits and runs after `long.js` executes.

That may be important for cases when we need to load a JavaScript library and then a script that depends on it.

```smart header="O atributo `defer` é apenas para scripts externos"
O atributo `defer` é ignorado se a tag `<script>` não possui o atributo `src`.
```

## async

The `async` attribute is somewhat like `defer`. It also makes the script non-blocking. But it has important differences in the behavior.

The `async` attribute means that a script is completely independent:

- The browser doesn't block on `async` scripts (like `defer`).
- Other scripts don't wait for `async` scripts, and `async` scripts don't wait for them.
- `DOMContentLoaded` and async scripts don't wait for each other:
    - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
    - ...or after an async script (if an async script is short or was in HTTP-cache)

In other words, `async` scripts load in the background and run when ready. The DOM and other scripts don't wait for them, and they don't wait for anything. A fully independent script that runs when loaded. As simple, as it can get, right?

Here's an example similar to what we've seen with `defer`: two scripts `long.js` and `small.js`, but now with `async` instead of `defer`.

They don't wait for each other. Whatever loads first (probably `small.js`) -- runs first:

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
```

- The page content shows up immediately: `async` doesn't block it.
- `DOMContentLoaded` may happen both before and after `async`, no guarantees here.
- A smaller script `small.js` goes second, but probably loads before `long.js`, so `small.js` runs first. Although, it might be that `long.js` loads first, if cached, then it runs first. In other words, async scripts run in the "load-first" order.

Async scripts are great when we integrate an independent third-party script into the page: counters, ads and so on, as they don't depend on our scripts, and our scripts shouldn't wait for them:

```html
<!-- Google Analytics is usually added like this -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

## Dynamic scripts
 
There's one more important way of adding a script to the page.

We can create a script and append it to the document dynamically using JavaScript:

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

The script starts loading as soon as it's appended to the document `(*)`.

**Dynamic scripts behave as "async" by default.**

That is:
- They don't wait for anything, nothing waits for them.
- The script that loads first -- runs first ("load-first" order).

This can be changed if we explicitly set `script.async=false`. Then scripts will be executed in the document order, just like `defer`.

In this example, `loadScript(src)` function adds a script and also sets `async` to `false`.

So `long.js` always runs first (as it's added first):

```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js runs first because of async=false
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

Without `script.async=false`, scripts would execute in default, load-first order (the `small.js` probably first).

Again, as with the `defer`, the order matters if we'd like to load a library and then another script that depends on it.


## Summary

Both `async` and `defer` have one common thing: downloading of such scripts doesn't block page rendering. So the user can read page content and get acquainted with the page immediately.

But there are also essential differences between them:

|         | Order | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Load-first order*. Their document order doesn't matter -- which loads first runs first |  Irrelevant. May load and execute while the document has not yet been fully downloaded. That happens if scripts are small or cached, and the document is long enough. |
| `defer` | *Document order* (as they go in the document). |  Execute after the document is loaded and parsed (they wait if needed), right before `DOMContentLoaded`. |

In practice, `defer` is used for scripts that need the whole DOM and/or their relative execution order is important. 

And  `async` is used for independent scripts, like counters or ads. And their relative execution order does not matter.

```warn header="Page without scripts should be usable"
Please note: if you're using `defer` or `async`, then user will see the page *before* the script loads.

In such case, some graphical components are probably not initialized yet.

Don't forget to put "loading" indication and disable buttons that aren't functional yet. Let the user clearly see what he can do on the page, and what's still getting ready.
```
