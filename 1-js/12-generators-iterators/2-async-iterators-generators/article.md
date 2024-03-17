
# Iteração assíncrona e geradores

A iteração assíncrona nos permite iterar sobre dados que são gerados de forma assíncrona, sob demanda. Por exemplo, ao baixarmos algo pedaço por pedaço pela rede. E os geradores assíncronos tornam isso ainda mais conveniente.

Vamos ver primeiro um exemplo simples para compreender a sintaxe e, em seguida, revisaremos um caso de uso da vida real.

## Relembrar os iteráveis

Vamos relembrar o tópico sobre iteráveis.

A ideia é que temos um objeto, como o `range` aqui:

```js
let range = {
  from: 1,
  to: 5
};
```

... E gostaríamos de usar o loop `for..of` nele, como for(valor of range), para obter valores de 1 a 5.

Em outras palavras, queremos adicionar uma capacidade de iteração ao objeto.

Isso pode ser implementado usando um método especial chamado `Symbol.iterator`:

- Este método é chamado pelo construtor `for..of` quando o loop é iniciado, e deve retornar um objeto com o método `next`.
- Para cada iteração, o método `next()` é invocado para o próximo valor.
- O `next()` deve retornar um valor no formato `{done: true/false, value:<valor do loop>}`, onde `done:true` significa o fim do loop.

Aqui está uma implementação para o iterável `range`:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // chamado uma vez, no início do for..of
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // chamado a cada iteração, para obter o próximo valor
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1, depois 2, depois 3, depois 4, depois 5
}
```
Se algo não estiver claro, consulte o capítulo  [](info:iterable), que fornece todos os detalhes sobre iteráveis tradicionais.

## Iteráveis assíncronos

A iteração assíncrona é necessária quando os valores são gerados de forma assíncrona: após `setTimeout` ou outro tipo de atraso.

O caso mais comum é quando o objeto precisa fazer uma solicitação de rede para fornecer o próximo valor. Veremos um exemplo real disso um pouco mais tarde.

Para tornar um objeto iterável de forma assíncrona:

1. Use o `Symbol.asyncIterator` em vez do `Symbol.iterator`.
2. O método `next()` deve retornar uma promise (para ser resolvida com o próximo valor).
   - A palavra-chave `async` cuida disso, podemos simplesmente fazer `async next()`.
3. Para iterar sobre esse objeto, devemos usar um loop `for await (let item of iterable)`.
   - Observe a palavra-chave `await`.

Como exemplo inicial, vamos fazer um objeto iterável `range`, semelhante ao anterior, mas agora ele retornará valores de forma assíncrona, um por segundo.

Tudo que precisamos para fazer isso é realizar algumas substituições no código acima:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // observe: podemos usar o "await" dentro de async next:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```
Como podemos ver, a estrutura é semelhante aos iteradores tradicionais: 

1. Para criar um objeto iterável de forma assíncrona, ele deve ter um método `Symbol.asyncIterator` `(1)`.
2. Este método deve retornar o objeto com o método `next()` que retorna uma promise `(2)`
3. O método `next()` não precisa ser `assíncrono (async)`, pode ser um método comum que retorna uma promise, mas o `async` nos permite usar o `await`, o que é conveniente. Aqui apenas atrasamos por um segundo `(3)`.
4. Para iterar, usamos `for await(let value of range)` `(4)`, ou seja, adicionamos o "await" após o "for". Isso chama `range[Symbol.asyncIterator]()` uma vez e, em seguida, seu `next()` para obter valores.

Aqui está uma pequena tabela com as diferenças:
|       | Iteradores | Iteradores assíncronos |
|-------|-----------|-----------------|
| Método para fornecer o iterador | `Symbol.iterator` | `Symbol.asyncIterator` |
| O valor retornado por `next()` é              | qualquer valor         | `Promise`  |
| Para fazer um loop, use                          | `for..of`         | `for await..of` |

````warn header="A sintaxe spread `...` não funciona de forma assíncrona"
Recursos que exigem iteradores tradicionais, síncronos, não funcionam com iteradores assíncronos.

Por exemplo, a sintaxe de spread não funcionará:
```js
alert( [...range] ); // Error, no Symbol.iterator
```

Isso é natural, pois espera encontrar `Symbol.iterator`, não `Symbol.asyncIterator`.

Isso também é válido para `for..of`: a sintaxe sem o `await` precisa do `Symbol.iterator`.
````

## Relembrando os geradores

Agora, vamos relembrar dos geradores, pois eles permitem encurtar o código de iteração. Na maioria das vezes, quando queremos criar um iterável, usaremos geradores.

Por pura simplicidade, omitindo algumas coisas importantes, eles são "funções que geram (yield) valores". Eles são explicados em detalhes no capítulo [](info:generators).

Os geradores são rotulados com `function*` (observe o asterisco) e usam `yield` para gerar um valor, então podemos usar `for..of` para iterar sobre eles.

Este exemplo gera uma sequência de valores de `start` a `end`:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, depois 2, depois 3, depois 4, depois 5
}
```

Como já sabemos, para tornar um objeto iterável, devemos adicionar `Symbol.iterator` a ele.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
*/!*
}
```

Uma prática comum para `Symbol.iterator` é retornar um gerador, o que torna o código mais curto, como você pode ver:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // uma forma reduzida de [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, depois 2, depois 3, depois 4, depois 5
}
```

Consulte o capítulo [](info:generators) se desejar mais detalhes.

Em geradores tradicionais, não podemos usar o `await`. Todos os valores devem vir de forma síncrona, conforme exigido pelo construtor `for..of`.

E se quisermos gerar valores de forma assíncrona? De solicitações de rede, por exemplo. 

Vamos mudar para geradores assíncronos para tornar isso possível.

## Geradores assíncronos (finalmente)

Para a maioria das aplicações práticas, quando desejamos fazer um objeto que gera de forma assíncrona uma sequência de valores, podemos usar um gerador assíncrono.

A sintaxe é simples: prefixe `function*` com o `async`. Isso torna o gerador assíncrono.

E então use `for await (...)` para iterar sobre ele, assim:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // Uau, podemos usar await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, depois 2, depois 3, depois 4, depois 5 (com atraso entre eles)
  }

})();
```

Como o gerador é assíncrono, podemos usar o `await` dentro dele, fazê-lo depender de promises, realizar requisições de rede e assim por diante.

````smart header="Diferença de baixo dos panos"
Tecnicamente, se você é um leitor avançado que se lembra dos detalhes dos geradores, há uma diferença interna.

Para geradores assíncronos, o método `generator.next()` é assíncrono, ele retorna promises. 

Em um gerador tradicional, usaríamos `result = generator.next()` para obter valores. Em um gerador assíncrono, devemos adicionar o `await`, assim: 

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
  É por isso que geradores assíncronos funcionam com `for await...of`. 
````

### Async iterable range

Geradores tradicionais podem ser usados ​​como `Symbol.iterator` para tornar o código de iteração mais curto.

Semelhante a isso, geradores assíncronos podem ser usados ​​como `Symbol.asyncIterator` para implementar a iteração assíncrona.

Por exemplo, podemos fazer o objeto `range` gerar valores de forma assíncrona, uma vez por segundo, substituindo `Symbol.iterator` síncrono por `Symbol.asyncIterator` assíncrono:

```js run
let range = {
  from: 1,
  to: 5,

  // essa linha é o mesmo que [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // faz uma pausa entre valores, espera por algo   
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, depois 2, depois 3, depois 4, depois 5
  }

})();
```

Agora os valores vêm com um atraso de um segundo entre eles.

```smart
Tecnicamente, podemos adicionar tanto `Symbol.iterator` quanto `Symbol.asyncIterator` ao objeto, tornando-o iterável tanto de forma síncrona (`for..of`) quanto assíncrona (`for await..of`)

Na prática, contudo, isso seria estranho de se fazer.
```

## Exemplo da vida real: dados paginados

Até agora vimos exemplos básicos para obter compreensão. Agora vamos rever um caso de uso da vida real. 

Existem muitos serviços online que entregam dados paginados. Por exemplo, ao solicitar uma lista de usuários, uma requisição retorna uma contagem pré-definida (por exemplo, 100 usuários) - "uma página", e fornece uma URL para a próxima página.

Esse padrão é bem comum. Não só com usuários, mas com qualquer coisa.

Por exemplo, GitHub nos permite recuperar commits da mesma maneira, de forma paginada:

- Devemos fazer uma requisição `fetch` no formato `https://api.github.com/repos/<repo>/commits`.
- Ela responde com um JSON contendo 30 commits e também fornece um link para a próxima pagina no cabeçalho `Link`.
- Podemos usar este link para a próxima requisição para obter mais commits, e assim por diante.

Para o nosso código, gostaríamos de ter uma maneira mais simples de obter commits.

Vamos criar uma função `fetchCommits(repo)` que obtém commits para nós, fazendo as requisições sempre que necessário. A deixar ela cuidar de toda a paginação. Para nós, será uma iteração assíncrona simples usando `for await..of`. 

Então, o uso será assim:

```js
for await (let commit of fetchCommits("username/repository")) {
  // processa o commit
}
```
Aqui está a função, implementada como um gerador assíncrono:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // O GitHub requer o cabeçalho "User-Agent".
    });

    const body = await response.json(); // (2) resposta é um JSON (array de commits).

    // (3) a URL da próxima página está nos cabeçalhos, extraia-a
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) produz commits um por um até que a página termine
      yield commit;
    }
  }
}
```

Mais explicações de como funciona:

1. Usamos o método [fetch](info:fetch) do navegador para baixar os commits.

  - A URL inicial é `https://api.github.com/repos/<repo>/commits` e a próxima página estará no cabeçalho `Link` da resposta.
  - O método `fetch` nos permite fornecer cabeçalhos de autorização e outros caso necessário -- aqui o GitHub requer o `User-Agent`.
2. Os commits são retornados no formato JSON.
3. Devemos obter a URL da próxima página do cabeçalho `Link` da resposta. Ele tem um formato especial, então usamos uma expressão regular para isso (vamos aprender essa funcionalidade em [Expressões regulares](info:regular-expressions))
    - A URL da próxima página deve parecer com `https://api.github.com/repositories/93253246/commits?page=2`. É gerada pelo próprio GitHub.
4. Em seguida, produzimos os commits recebidos um por um, e quando eles acabarem, a próxima interação `while(url)` vai disparar, fazendo mais uma requisição.

Um exemplo de uso (mostra os autores dos commits no console):
```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // vamos parar em 100 commits
      break;
    }
  }

})();

// Observe: Se você está rodando isso em um ambiente externo, você precisará colar aqui a função fetchCommits descrita acima. 
```

Isso é exatamente o que queremos.

A mecânica interna das requisições paginadas é invisível para quem está do lado de fora. Para nós, é apenas um gerador assíncrono que retorna commits.

## Resumo

Iteradores tradicionais e geradores funcionam bem com dados que não levam tempo para serem gerados.

Quando esperamos que os dados cheguem de forma assíncrona, com atrasos, podemos usar suas contrapartes assíncronas e `for await..of` em vez de `for..of`. 

Diferenças de sintaxe entre iteradores assíncronos e tradicionais:

|       | Iterável | Iterável assíncrono |
|-------|-----------|-----------------|
| Método para fornecer um iterador | `Symbol.iterator` | `Symbol.asyncIterator` |
| valor retornado por `next()` é          | `{value:…, done: true/false}`         | `Promise` que se resolve para  `{value:…, done: true/false}`  |

Diferenças de sintaxe entre geradores assíncronos e tradicionais:

|       | Geradores | Geradores assíncronos |
|-------|-----------|-----------------|
| Declaração | `function*` | `async function*` |
| valor retornado por `next()` é         | `{value:…, done: true/false}`         | `Promise` que se resolve para `{value:…, done: true/false}`  |

Na área de desenvolvimento web, frequentemente nos deparamos com fluxos de dados, nos quais os dados fluem pedaço por pedaço. Por exemplo, ao baixarmos ou enviarmos um arquivo grande.

Podemos usar geradores assíncronos para processar esses tipos de dados. Também é importante mencionar que em alguns ambientes, como em navegadores, existe outra API chamada Streams, que fornece interfaces especiais para trabalhar com esses fluxos, transformar dados e transmiti-los de um fluxo para outro (por exemplo, baixar de um local e enviar imediatamente para outro).