

# Introdução: callbacks


```warn header="Nós usamos métodos do navegador nos exemplos aqui"
Para demonstrar o uso de callbacks, promessas e outros conceitos abstratos, nós vamos utilizar alguns métodos do navegador: especificamente, carregando scripts e executando ações simples no documento.

Se você não está familiarizado com esses métodos e o uso deles está confuso nos exemplos, você pode querer ler alguns capítulos da [próxima parte](/document) do tutorial.

Apesar disso, nós vamos tentar tornar as coisas mais claras de qualquer forma. Não vai haver nada realmente complexo em termos de navegadores.
```

Muitas funções que são encontradas em ambientes Javacript permitem que você agende ações "assíncronas". Em outras palavras, ações que nós iniciamos agora, mas que terminam mais tarde.

Um exemplo dessas funções é a função `setTimeout`.

Exitem outros exemplos de ações assíncronas usadas na vida real, como carregamento de scripts e módulos (nós vamos cobrir esses casos nos próximos capítulos).

Veja a função `loadScript(src)`, que carrega um script com um dado `src`:

```js
function loadScript(src) {
  // cria um tag <script> e anexa à página
  // isso inicia o carregamento do script com um dado src e, quando completo, o executa
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

Ela insere no documento uma nova tag `<script src="…">`, que foi criada dinamicamente com o `src` dado. O navegador automaticamente inicia o carregamento do script e o executa quando concluir o carregamento.

Nós podemos usar essa função assim:

```js
// carrega e executa o script localizado no caminho passado
loadScript('/my/script.js');
```

O script é executado "assincronamente", já que o seu carregamento inicia agora, mas ele é executado depois, quando a função já terminou.

Se houver qualquer código abaixo do `loadScript(…)`, ele não vai esperar até o carregamento terminar.

```js
loadScript('/my/script.js');
// o código abaixo do loadScript não espera o carregamento do script terminar
// ...
```

Digamos que nós precisamos usar o script assim que ele terminar de carregar. Ele delcara novas funções e nós precisamos usá-las.

Mas se nós nós terntarmos usá-las logo após chamar `loadScript(…)`, isso não vai funcionar:

```js
loadScript('/my/script.js'); // o script declara "function newFunction() {…}"

*!*
newFunction(); // Erro: no such function!
*/!*
```

Naturalmente, o navegador provavelmente não teve tempo de terminar o carregamento do script. Então a chamada da nova função falhou. Da forma como está agora, a função `loadScript` não possui uma forma de monitorar o término do carregamento. O script carrega, eventualmente é executado e pronto. Mas nós gostaríamos de saber quando terminar para usar as novas funções e variáveis declaradas no script.

Vamos adicionar uma função `callback` como segundo argumento de `loadScript`. Ela deve ser executada quando o script já estiver carregado:

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

Agora, se nós quisermos chamar as novas funções do script, nós devemos fazer isso dentro do callback:

```js
loadScript('/my/script.js', function() {
  // o callback é executado depois do script ser carregado
  newFunction(); // agora funciona
  ...
});
```

Essa é a ideia: o segundo argumento é uma função (geralmente anônima) que roda quando uma ação foi finalizada.

Aqui está um exemplo executável com um script real:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // função declarada no script carregado
});
*/!*
```

Isso é chamado de programação assíncrona baseada em callback ("callback-based"). Uma função que executa algo assincronamente deve prover um argumento `callback`, onde nós podemos passar uma função que será executada assim que ela finalizar.

Nós acabamos de fazer isso com o `loadScript`, mas claro, essa é uma abordagem geral.

## Callback de callback

Como nós podemos carregar dois scripts em sequência: o primeiro, e então o segundo logo depois?

A solução natural seria colocar a segunda chamada do `loadScript` dentro do callback, dessa forma:

```js
loadScript('/my/script.js', function(script) {

  alert(`Boa, o ${script.src} foi carregado, vamos carregar o próximo`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Boa, o segundo script foi carregado`);
  });
*/!*

});
```

Depois que o `loadScript` mais externo terminou, o callback inicia o `loadScript` mais interno.

E se nós quisermos mais um script...?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...continue depois de todos os scripts estarem carregados
    });
*/!*

  });

});
```

Então, toda ação nova está dentro de um callback. Tudo bem fazer isso para poucas ações seguidas, mas não para muitas. Nós veremos outras variantes em breve.

## Lidando com erros

Nos exemplos acima nós não consideramos os erros. E se o carregamento do script falhar? Nosso callback deveria saber como reagir a isso.

Aqui está uma versão melhorada do `loadScript` que rastreia erros no carregamento:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Erro de carregamento para o script ${src}`));
*/!*

  document.head.append(script);
}
```

Ele chama `callback(null, script)` quando obteve sucesso no carregamento e `callback(error)` caso contrário.

O uso fica assim:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // tratamento de erro
  } else {
    // o script carregou com sucesso
  }
});
```

Mais uma vez, essa receita que usamos para o `loadScript` é bem comum na verdade. É chamada de estilo "error-first callback".

A conveção é assim:
1. O primeiro argumento do `callback` é reservado para o erro, caso ele ocorra. Então o `callback(err)` é chamado.
2. O segundo argumento (e os próximos, se necessário) são para os resultados bem sucedidos. Então `callback(null, result1, result2…)` é chamado.

Assim, uma única função `callback` pode ser usada para as duas coisas: reportar erros; e retornar os resultados.

## Pirâmide da Ruína

À primeira vista, esta é uma forma viável de fazer códigos assíncronos. E de fato é. Para uma ou talvez duas chamadas aninhadas parece bom.

Mas para múltiplas ações assíncronas que são chamadas uma depois da outra, nós vamos ter que codificar assim:

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
            // ...continue depois de todos os scripts estarem carregados (*)
  */!*
          }
        });

      }
    });
  }
});
```

No código acima:
1. Nós carregamos `1.js`. Se não der erro...
2. Nós carregamos `2.js`. Se não der erro...
3. Nós carregamos `3.js`. Se não der erro, faz alguma ação `(*)`.

Ao aninhar cada vez mais chamadas, o código fica cada vez mais profundo e aumenta a dificuldade de mantê-lo, especialmente se houver códigos reais ao invés de `...`, o que pode incluir loops, conditional statements e por aí vai.

Às vezes isso é chamado de "inferno de callbacks" ("callback hell") ou "pirâmide da ruína" ("pyramid of doom").

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
    });
  }
});
-->

![](callback-hell.svg)

A "pirâmide" de chamadas aninhadas cresce para a direita, junto com cada ação assíncrona. Isso foge do controle rapidamente.

Então essa forma de codificar não é muito recomendada.

Nós podemos tentar aliviar o problema transformando cada ação em uma função separada, dessa forma:

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
    // ...continue depois de todos os scripts estarem carregados (*)
  }
}
```

Viu? Esse código faz a mesma coisa e não há um aninhamento profundo porque cada ação está separada em uma função top-level, ou seja, no escopo mais externo.

Funciona, mas o código parece picado. É difícil de ler e você provavelmente vai perceber que qualquer um precisa "pular com os olhos" entre as partes enquanto está lendo. Isso é incoveniente, especialmente se o leitor não estiver familiarizado com o código e não sabe para onde precisa "pular com os olhos".

Além disso, as funções nomeadas com `step*` são todas de uso único, e são criadas apenas para evitar a "pirâmide da ruína". Ninguém vai reutilizá-las fora da cadeia de ações. Então a nomenclatura está um pouco atrapalhada aqui.

Nós gostaríamos de fazer algo melhor.

Por sorte, existem outras formas de evitar essas pirâmides. Uma das melhores formas de se fazer isso é usando as promessas ("promises"), descritas no próximo capítulo.
