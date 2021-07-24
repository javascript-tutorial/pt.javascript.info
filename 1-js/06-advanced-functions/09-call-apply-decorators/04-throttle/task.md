importance: 5

---

# O Decorador Throttle

Crie um decorador de "estrangulamento" `throttle(f, ms)` -- que retorna um encapsulador.

Quando for chamado várias vezes, ela passa a chamada para `f` no máximo uma vez por `ms` milissegundos.

A diferença de debounce é que é um decorador completamente diferente:
- `debounce` executa a função uma vez depois do período de "espera". Boa para processar o resultado final.
- `throttle` não é executada mais do que uma vez em `ms` de tempo. Boa para atualizações regulares que não sejam num intervalo de tempo pequeno.

Em outras palavras, `throttle` é como uma secretária que aceita chamadas telefónicas, mas incomonda o chefe (chama a `f` atual) não mais do que uma vez por`ms` milissegundos.

Vamos verificar a aplicação na vida real para melhor compreender esse requesito e ver de onde ele vem.

**Por exemplo, queremos rastrear movimentos do rato**

Num navegador, nós podemos configurar uma função para ser executada a cada movimento do rato e receber a localização do ponteiro à medida que ele se move. Num período de uso constante do rato, esta função geralmente é executada com muita frequência, pode ser algo como 100 vezes por segundo (a cada 10 ms).
**Gostaríamos de atualizar alguma informação na página web sempre que o ponteiro se mover.**

A função de atualização `update()` é muito pesada de se fazer a cada micro-movimento. Também não faz sentido executar isso mais de uma vez por 100ms.

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

// f1000 passa chamadas para f no máximo uma vez por 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // exibe 1
f1000(2); // (estrangulamento, 1000ms ainda não passaram)
f1000(3); // (estrangulamento, 1000ms ainda não passaram)

// quando o tempo de 1000ms estiver esgotado...
// ...exibe 3, o valor intermédio 2 foi ignorado
```

P.S. Os argumentos e o contexto `this` passados para `f1000` devem ser passados para a função original `f`.
