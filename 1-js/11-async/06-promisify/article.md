# Promisificação

"Promisificação" é uma palavra longa para uma transformação simples. É a conversão de uma função que aceita um callback em uma função que retorna uma promessa.

Esse tipo de transformação é frequentemente necessário na vida real, já que muitas funções e bibliotecas são baseadas em callback. Mas promessas são mais convenientes, então faz sentido promisificá-las.

Para entender melhor, vamos ver um exemplo.

Por exemplo, temos a `loadScript(src, callback)` do capítulo <info:callbacks>.

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// uso:
// loadScript('path/script.js', (err, script) => {...})
```

A função carrega um script com o `src` fornecido, e então chama `callback(err)` em caso de erro, ou `callback(null, script)` em caso de carregamento bem-sucedido. Esse é um acordo bastante difundido para usar callbacks, já vimos isso antes.

Vamos promisificá-la.

Vamos criar uma nova função `loadScriptPromise(src)`, que faz a mesma coisa (carrega o script), mas retorna uma promessa em vez de usar callbacks.

Em outras palavras, passamos a ela só o `src` (sem `callback`) e recebemos uma promessa de volta, que é resolvida com `script` quando o carregamento tem sucesso, e rejeitada com o erro caso contrário.

Aqui está:
```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// uso:
// loadScriptPromise('path/script.js').then(...)
```

Como podemos ver, a nova função é um invólucro ao redor da função original `loadScript`. Ela a chama fornecendo seu próprio callback que traduz para `resolve/reject` da promessa.

Agora a `loadScriptPromise` se encaixa bem em código baseado em promessas. Se gostamos mais de promessas do que de callbacks (e logo vamos ver mais motivos para isso), então vamos usá-la no lugar.

Na prática, podemos precisar promisificar mais de uma função, então faz sentido usar uma função auxiliar.

Vamos chamá-la de `promisify(f)`: ela aceita uma função `f` a ser promisificada e retorna uma função invólucro.

```js
function promisify(f) {
  return function (...args) { // retorna uma função invólucro (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // nosso callback personalizado para f (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // adiciona nosso callback personalizado ao final dos argumentos de f

      f.call(this, ...args); // chama a função original
    });
  };
}

// uso:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

O código pode parecer um pouco complexo, mas é essencialmente o mesmo que escrevemos acima, quando promisificamos a função `loadScript`.

Uma chamada a `promisify(f)` retorna um invólucro ao redor de `f` `(*)`. Esse invólucro retorna uma promessa e encaminha a chamada para o `f` original, rastreando o resultado no callback personalizado `(**)`.

Aqui, o `promisify` assume que a função original espera um callback com exatamente dois argumentos `(err, result)`. Isso é o que encontramos com mais frequência. Então nosso callback personalizado está exatamente no formato certo, e o `promisify` funciona ótimo para esse caso.

Mas e se o `f` original espera um callback com mais argumentos `callback(err, res1, res2, ...)`?

Podemos melhorar nosso auxiliar. Vamos fazer uma versão mais avançada do `promisify`.

- Quando chamado como `promisify(f)`, deve funcionar parecido com a versão acima.
- Quando chamado como `promisify(f, true)`, deve retornar a promessa que é resolvida com o array dos resultados do callback. Isso é exatamente para callbacks com muitos argumentos.

```js
// promisify(f, true) para obter um array de resultados
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // nosso callback personalizado para f
        if (err) {
          reject(err);
        } else {
          // resolve com todos os resultados do callback se manyArgs for especificado
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// uso:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

Como você pode ver, é essencialmente o mesmo que acima, mas o `resolve` é chamado com apenas um ou com todos os argumentos, dependendo se `manyArgs` é verdadeiro.

Para formatos de callback mais exóticos, como aqueles sem `err` de jeito nenhum: `callback(result)`, podemos promisificar essas funções manualmente, sem usar a função auxiliar.

Também existem módulos com funções de promisificação um pouco mais flexíveis, por exemplo [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). No Node.js, existe uma função nativa `util.promisify` para isso.

```smart
A promisificação é uma ótima abordagem, especialmente quando usamos `async/await` (coberto mais adiante, no capítulo <info:async-await>), mas não substitui totalmente os callbacks.

Lembre-se, uma promessa pode ter apenas um resultado, mas um callback pode, tecnicamente, ser chamado várias vezes.

Então a promisificação só serve para funções que chamam o callback uma única vez. Chamadas seguintes serão ignoradas.
```
