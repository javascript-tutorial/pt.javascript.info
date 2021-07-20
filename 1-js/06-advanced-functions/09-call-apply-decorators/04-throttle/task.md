importance: 5

---

# O Decorador Throttle

Crie um decorador de "throttling" `throttle(f, ms)` -- que retorna um encapsulador.

Quando é chamada várias vezes, ela passa a chamada para `f` no máximo uma vez por `ms` milissegundos.

A diferença com debounce é que é um decorador completamente diferente:
- `debounce` executa a função uma vez depois do período de "espera". Boa para o processamento final do resultado.
- `throttle` executa-o não mais frequentemente do que no tempo `ms` determinado.

Em outras palavras, `throttle` é como uma secretária que aceita chamadas de telefone, mas incomonda o chefe (chama `f` atual) não mais do que uma vez por`ms` milissegundos.

Vamos verificar a aplicação na vida real para melhor entender esse requesito e ver de onde ela vem.

**Por exemplo, queremos rastrear os movimentos do mouse**

Em um browser nós podemos configurar uma função para executar em todo movimento do mouse e receber a localização do ponteiro conforme ele se move. Durante o uso constante do mouse, esta função geralmente é executada com muita frequência, pode ser algo como 100 vezes por segundo (a cada 10 ms).
**Gostariamos de atualizar algumas informações na página web sempre que o ponteiro se mover.**

A atualização da função `update()` é uma tarefa muito pesada de se fazer em todo micro-movimento. Também não há sentido em fazer isso mais do que uma vez por 100ms.

Portanto, vamos atribuir `throttle(update, 100)` como a função a ser executar em cada movimento de mouse ao invés do `update()` original. O decorador será chamada sempre, porém o `update()` será chamado no máximo uma vez por 100ms.

Visualmente, ela parecerá com algo como isso:

1. Para o primeiro movimento do mouse a variante decorada passa a chamada para `update`. É importante, os usuários verem nossa reação aos seus movimentos imediatamente.
2. Assim ao mover o mouse, até `100ms` nada acontece. A variante decorada é ignora chamadas.
3. Ao final de `100ms` -- mais um `update` acontece com as últimas coordenadas.
4. Assim, finalmente, o mouse para em algum lugar. A variante decorada espera até `100ms` expirar e depois executa o `update` com as últimas coordinadas. Então, talvez o mais importante, a coordenadas finais do mouse são processadas.

Um código de exemplo:

```js
function f(a) {
  console.log(a);
}

// f1000 passa a chamada para f no máximo uma vez por 1000ms
let f1000 = throttle(f, 1000);

f1000(1); // exibi 1
f1000(2); // (throttling, 1000ms ainda não saiu)
f1000(3); // (throttling, 1000ms ainda não saiu)

// quando o tempo de 1000ms estiver esgotado...
// ...exibi 3, o valor intermediário 2 foi ignorado
```

P.S. Os argumentos e o contexto `this` passados para `f1000` devem ser passados para a função original `f`.