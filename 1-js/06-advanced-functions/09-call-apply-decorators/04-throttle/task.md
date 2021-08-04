importance: 5

---

# O Decorador Throttle

Crie um decorador de "estrangulamento" `throttle(f, ms)` -- que retorne um encapsulador.

Quando for chamado várias vezes, ele passa a chamada para `f` no máximo uma vez por `ms` milissegundos.

A diferença de debounce é que é um decorador completamente diferente:
- `debounce` executa a função uma vez depois do período de "espera". Boa para processar o resultado final.
- `throttle` não é executada mais do que uma vez em `ms` de tempo. Boa para atualizações regulares que não sejam efectuadas num intervalo de tempo pequeno.

Por outras palavras, `throttle` é como uma secretária que aceita chamadas telefónicas, mas incomonda o chefe (chama a `f` atual) não mais do que uma vez por`ms` milissegundos.

Vamos verificar a aplicação na vida real para melhor compreender esse requisito e ver de onde ele vem.

**Por exemplo, queremos rastrear movimentos do rato**

Num navegador, nós podemos configurar uma função para ser executada a cada movimento do rato e receber a localização do ponteiro à medida que ele se move. Num período de uso constante do rato, esta função geralmente é executada com muita frequência, pode ser algo como 100 vezes por segundo (a cada 10 ms).
**Gostaríamos de atualizar alguma informação na página web sempre que o ponteiro se mover.**

A função de atualização `update()` é muito pesada de se fazer a cada micro-movimento. Também não faz sentido executar isso mais de uma vez por 100ms.

Portanto, vamos atribuir `throttle(update, 100)` como a função a ser executada a cada movimento de rato ao invés da `update()` original. O decorador será chamado com frequência, porém `update()` será chamada no máximo uma vez por 100ms.

Visualmente, se parecerá com algo assim:

1. Para o primeiro movimento do rato a variante decorada passa a chamada para `update`. É importante que o usuário veja a nossa reação aos seus movimentos imediatamente.
2. Depois, ao mover do rato, até `100ms` nada acontece. A variante decorada ignora as chamadas.
3. Ao final de `100ms` -- mais um `update` acontece com as últimas coordenadas.
4. Continuando, finalmente, o rato pára em algum lugar. A variante decorada espera até `100ms` expirarem e depois executa o `update` com as últimas coordenadas. Então, talvez o mais importante, as coordenadas finais do rato são processadas.

Um código de exemplo:

```js
function f(a) {
  console.log(a);
}

// f1000 passa chamadas para f no máximo uma vez por 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // exibe 1
f1000(2); // (estrangulamento, 1000ms ainda não passaram)
f1000(3); // (estrangulamento, 1000ms ainda não passaram)

// quando o tempo de 1000ms estiver esgotado...
// ...exibe 3, o valor intermédio 2 foi ignorado
```

P.S. Os argumentos e o contexto `this` passados para `f1000` devem ser passados para a função original `f`.
