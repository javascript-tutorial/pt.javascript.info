importance: 5

---

# Decorador de Redução

O resultado do decorador `debounce(f, ms)` é um embrulhador que suspende as chamadas à `f` até existir `ms` milissegundos de inatividade (nenhuma chamada, "período de arrefecimento"), depois invoca `f` uma vez com os argumentos mais recentes.

Por outras palavras, `debounce` é como uma secretária que aceita "chamadas telefónicas", e espera até existir `ms` milissegundos de silêncio. E apenas depois transfere a informação da chamada mais recente ao "chefe" (chama a verdadeira `f`).

Por exemplo, tínhamos uma função `f` e a substituímos por `f = debounce(f, 1000)`.

Então se a função embrulhada for chamada aos 0ms, 200ms, e 500ms, e depois não existirem chamadas, a `f` verdadeira apenas será chamada uma vez, aos 1500ms. Isto é: depois do período de arrefecimento de 1000ms da última chamada.

![](debounce.svg)

...E obterá os argumentos da última chamada, outras chamadas são ignoradas.

Eis o código para isto (que usa o decorador de redução da [biblioteca Lodash](https://lodash.com/docs/4.17.15#debounce)):

```js
let f = _.debounce(alert, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);
// a função de redução espera 1000ms após a última chamada e depois executa: alert("c")
```

Agora um exemplo prático. Digamos, que o utilizador digita algo, e gostaríamos de enviar uma requisição a servidor quando a entrada for terminada.

Não faz sentido enviar uma requisição por cada carácter digitado. Em vez disto, gostaríamos de esperar e depois processar todo o resultado.

Num navegador da Web, podemos configurar um manipulador de evento -- uma função que é chamada sobre toda mudança dum campo de entrada. Normalmente, um manipulador de evento é chamado com muita frequência, para toda tecla digitada. Mas se usássemos `debounce` nesta por 1000ms, então apenas será chamada uma vez, após 1000ms depois da última entrada.

```online

Neste exemplo ao vivo, o manipulador coloca o resultado numa caixa abaixo, experimenta:

[iframe border=1 src="debounce" height=200]

Vês? A segunda entrada chama a função reduzida, então o seu conteúdo é processado após 1000ms depois da última entrada.
```

Portanto, `debounce` é uma excelente maneira de processar uma sequência de eventos: seja uma sequência de pressões de tecla, movimentos de rato ou qualquer outra coisa.

Esta espera o dado tempo depois da última chamada, e depois executa a sua função, que pode processar o resultado.

A tarefa é implementar o decorador `debounce`.

Sugestão: são apenas algumas linhas, se pensarmos bem :)
