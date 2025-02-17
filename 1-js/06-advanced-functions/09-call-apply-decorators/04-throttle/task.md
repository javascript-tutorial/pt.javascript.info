importance: 5

---

# Decorador Regulador

Crie um decorador de "regulação" `throttle(f, ms)` -- que retorna uma função envolvente.

Quando é chamado várias vezes, este passa a chamada a `f` no máximo uma vez por `ms` milissegundos.

<<<<<<< HEAD
Em comparação com o decorador de redução, o comportamento é completamente diferente:
- `debounce` executa a função uma vez após o período de "arrefecimento". Bom para processar o resultado final.
- `throttle` executa a função não mais frequentemente do que o tempo dado `ms`. Bom para atualizações regulares que não devem ser muito frequentes.
=======
Compared to the debounce decorator, the behavior is completely different:
- `debounce` runs the function once after the "cooldown" period. Good for processing the final result.
- `throttle` runs it not more often than given `ms` time. Good for regular updates that shouldn't be very often.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Por outras palavras, `throttle` é como uma secretária que aceita chamadas telefónicas, mas que incomoda a chefe (chama a verdadeira `f`) não mais do que uma vez por `ms` milissegundos.

Vejamos a aplicação na realidade para compreender melhor este requisito e ver de onde vem.

**Por exemplo, queremos rastrear movimentos do rato**

Num navegador, podemos configurar uma função para ser executada em cada movimento do rato e obter a localização do ponteiro à medida que este se move. Durante uma utilização ativa do rato, esta função é normalmente executada com muita frequência, podendo ser algo como 100 vezes por segundo (a cada 10 milissegundos).**Gostaríamos de atualizar algumas informações na página da Web quando o ponteiro se move.**

...Mas a função de atualização `update()` é demasiado pesada para o fazer em cada micro-movimento. Também não faz sentido atualizar mais do que uma vez por 100ms.

Por isso, a envolveremos no decorador: usamos `throttle(update, 100)` como uma função a ser executada em cada movimento do rato, em vez da `update` original. O decorador será chamado frequentemente, mas encaminhará a chamada a `update` no máximo uma vez a cada 100ms.

Visualmente, terá o seguinte aspeto:

1. Para o primeiro movimento do rato a variante decorada passa a chamada para `update`. É importante que o usuário veja a nossa reação aos seus movimentos imediatamente.
1. Para o primeiro movimento do rato, a variante decorada passa imediatamente a chamada a `update`. Isso é importante, o usuário vê a nossa reação ao seu movimento imediatamente.
2. Depois, à medida que o rato se move, até `100ms` nada acontece. A variante decorada ignora as chamadas.
3. No final de `100ms` -- mais uma `update` acontece com as últimas coordenadas.
4. Então, finalmente, o rato para em algum lugar. A variante decorada espera até `100ms` expiraram e depois executa a `update` com as últimas coordenadas. Assim, o mais importante, as últimas coordenadas do rato são processadas.


Um exemplo de código:

```js
function f(a) {
  console.log(a);
}

// f1000 passa chamadas a `f` no máximo uma vez por 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // exibe 1
f1000(2); // (regulação, 1000ms ainda não passaram)
f1000(3); // (regulação, 1000ms ainda não passaram)

// quando o tempo de 1000ms se esgota...
// ...exibe 3, o valor intermédio 2 foi ignorado
```

P.S. Os argumentos e o contexto de `this` passados a `f1000` devem ser passados a `f` original.
