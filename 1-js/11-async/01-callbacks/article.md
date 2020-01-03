

# Introdução: callbacks

Muitas ações em JavaScript são *assíncronas*.

Por exemplo, veja a função `loadScript(src)`:

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

O objetivo da função é carregar um novo script. Quando ela adiciona o `<script src="…">` no documento, o navegador carrega e executa esse script.

Podemos usar essa função assim:

```js
// carrega e executa o script
loadScript('/my/script.js');
```

A função é chamada "assincronamente" porque a ação (carregar o script) não termina no mesmo instante. Ela termina mais tarde.

A chamada inicia o carregamento do script, e depois a execução continua. Enquanto o script está carregando, o código que está embaixo pode terminar de executar. E se o carregamento demorar, outros scripts podem executar enquanto isso.

```js
loadScript('/my/script.js');
// o código embaixo de loadScript não espera o carregamento do script terminar
// ...
```

Agora, vamos imaginar que queremos usar o novo script quando ele terminar de carregar. Ele provavelmente declara novas funções, e queremos executar elas.

Mas se nós fizermos isso imediatamente depois da chamada `loadScript(…)`, não iria funcionar.

```js
loadScript('/my/script.js'); // o script tem "function newFunction() {…}"

*!*
newFunction(); // a função não existe!
*/!*
```

Naturalmente, o navegador provavelmente não teve tempo de carregar o script. Então a chamada imediata para a nova função falha. Do jeito que está, a função `loadScript` não provê uma maneira de saber quando o carregamento termina. O script carrega e eventualmente é executado, isso é tudo. Mas nós queremos saber quando isso acontece, para podermos usar as novas funções e variáveis daquele script.

Vamos adicionar uma função `callback` como segundo argumento em `loadScript` que deve executar quando o script terminar de carregar:

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```

Agora se nós quisermos chamar as novas funções do script, nós podemos fazer isso no callback:

```js
loadScript('/my/script.js', function() {
  // o callback executa depois que o script termina de carregar
  newFunction(); // então agora funciona
  ...
});
```

Esta é a ideia: o segundo argumento é uma função (normalmente anônima) que executa quando a ação termina.

Veja um exemplo executável com um script real:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Legal, o ${script.src} está carregado`);
  alert( _ ); // função declarada no script carregado
});
*/!*
```

Isso é chamado de programação assíncrona "baseada em callbacks". A função que faz alguma coisa assincronamente deve prover um argumento `callback` onde nós colocamos a função que vai executar depois que ela terminar.

Aqui nós fizemos isso em `loadScript`, mas é claro que isso é uma abordagem genérica.

## Callback no callback

Como poderíamos carregar dois scripts sequencialmente? Carregar um primeiro, e depois o segundo?

A solução natural seria colocar a segunda chamada de `loadScript` dentro do callback, assim:

```js
loadScript('/my/script.js', function(script) {

  alert(`Legal, ${script.src} foi carregado, vamos carregar mais um`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Legal, o segundo script foi carregado`);
  });
*/!*

});
```

Depois que o `loadScript` de fora termina, o callback inicia o `loadScript` de dentro.

E se nós quisermos mais um script...?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...continua depois que todo os scripts forem carregados
    });
*/!*

  })

});
```

Então, toda ação nova fica dentro de um callback. Tudo bem para poucas ações, mas não é bom para muitas ações. Por isso nós vamos ver outras variantes em breve.

## Tratando erros

No exemplo acima nós não consideramos erros. E se o carregamento do script falhar? Nosso callback deveria ser capaz de reagir a isso.

Abaixo temos uma versão melhorada do `loadScript` que pega os erros de carregamento:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Erro no carregamento do script ${src}`));
*/!*

  document.head.append(script);
}
```

O código acima chama `callback(null, script)` quando o carregamento é feito com sucesso e `callback(error)` caso contrário.

Usando a função:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // tratar o erro
  } else {
    // script carregado com sucesso
  }
});
```

De novo, o padrão que nós usamos para o `loadScript` é bem comum. É chamado de estilo "error-first callback".

A convenção é:
1. O primeiro argumento do `callback` é reservado para um erro, se algum ocorrer. Então `callback(err)` é chamado.
2. O segundo argumento (e o próximo se for necessário) são para quando houver sucesso. Então `callback(null, result1, result2…)` é chamado.

Assim uma única função `callback` é usada tanto para reportar erros quanto para retornar os resultados.

## Pyramid of Doom

From the first look, it's a viable way of asynchronous coding. And indeed it is. For one or maybe two nested calls it looks fine.

But for multiple asynchronous actions that follow one after another we'll have code like this:

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...continue after all scripts are loaded (*)
  */!*
          }
        });

      }
    })
  }
});
```

In the code above:
1. We load `1.js`, then if there's no error.
2. We load `2.js`, then if there's no error.
3. We load `3.js`, then if there's no error -- do something else `(*)`.

As calls become more nested, the code becomes deeper and increasingly more difficult to manage, especially if we have a real code instead of `...`, that may include more loops, conditional statements and so on.

That's sometimes called "callback hell" or "pyramid of doom."

<!--
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
          }
        });
      }
    })
  }
});
-->

![](callback-hell.svg)

The "pyramid" of nested calls grows to the right with every asynchronous action. Soon it spirals out of control.

So this way of coding isn't very good.

We can try to alleviate the problem by making every action a standalone function, like this:

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
};
```

See? It does the same, and there's no deep nesting now because we made every action a separate top-level function.

It works, but the code looks like a torn apart spreadsheet. It's difficult to read, and you probably noticed that one needs to eye-jump between pieces while reading it. That's inconvenient, especially if the reader is not familiar with the code and doesn't know where to eye-jump.

Also, the functions named `step*` are all of single use, they are created only to avoid the "pyramid of doom." No one is going to reuse them outside of the action chain. So there's a bit of a namespace cluttering here.

We'd like to have something better.

Luckily, there are other ways to avoid such pyramids. One of the best ways is to use "promises," described in the next chapter.
