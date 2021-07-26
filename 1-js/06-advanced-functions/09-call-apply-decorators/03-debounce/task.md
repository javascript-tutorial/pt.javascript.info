importance: 5

---

# O decorador Debounce

O resultado do decorador `debounce(f, ms)` é um encapsulador que suspende chamadas de `f` até haver `ms` milissegundos de inactividade (nenhuma chamada, "período de espera"), depois invoca `f` uma vez com os últimos argumentos.

Por outras palavras, `debounce` é como uma secretária que aceita "chamadas telefónicas", e espera até existirem `ms` milissegundos de inatividade. E, somente então transfere a informação da última chamada para "o chefe" (chama a `f` atual).

Por exemplo, tinhamos uma função `f` e a substituimos por `f = debounce(f, 1000)`.

Então se a função encapsulada for chamada aos 0ms, 200ms, e 500ms, e depois não houver chamadas, a `f` atual será somente chamada uma vez, aos 1500ms. Ou seja, depois do período de espera de 1000ms após a última chamada.

![](debounce.svg)

...E receberá os argumentos da última chamada, outras chamadas são ignoradas.

Aqui está o código para isso (que usa o decorador debounce da [biblioteca Lodash](https://lodash.com/docs/4.17.15#debounce)):

```js
let f = _.debounce(alert, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);
// a função de debounce espera 1000ms após a última chamada e depois executa: alert("c")
```

Agora um exemplo prático. Vamos dizer, que o usuário digita alguma coisa, e gostaríamos de fazer um pedido ao servidor quando a entrada tiver terminado.

Não adianta enviar um pedido por cada caractere digitado. Ao invés disso gostariamos de esperar, e então processar todo o resultado.

Num navegador, nós podemos configurar um gerenciador de eventos -- uma função que é chamada em todas as alterações no campo de entrada. Normalmente, um gerenciador de eventos é chamado com frequência, a cada tecla pressionada. Porém, se nós fizermos o `debounce` dele por 1000ms, então ele será chamando apenas uma vez, depois de 1000ms após a última entrada.

```online

Neste exemplo online, o gerenciador coloca o resultado na caixa abaixo, experimente:

[iframe border=1 src="debounce" height=200]

Você vê? A segunda entrada chama a função de debounce, assim o seu conteúdo será processado após 1000ms depois da última entrada.
```

Portanto, `debounce` é uma excelente maneira de processar uma sequência de eventos: seja ela uma sequência de teclas pressionadas, movimentos do rato ou alguma outra coisa.

Ela espera o tempo dado depois da última chamada, e depois executa a sua tarefa, que pode processar o resultado.

A tarefa é implementar o decorador `debounce`.

Dica: são apenas uma poucas linhas se você pensar sobre ela :)
