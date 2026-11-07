
# Tratamento de erros com promessas

Cadeias de promessas são ótimas no tratamento de erros. Quando uma promessa é rejeitada, o controle salta para o tratador de rejeição mais próximo. Isso é bem conveniente na prática.

Por exemplo, no código abaixo a URL do `fetch` está errada (não existe esse site), e o `.catch` trata o erro:

```js run
*!*
fetch('https://no-such-server.blabla') // é rejeitada
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (o texto pode variar)
```

Como você pode ver, o `.catch` não precisa vir logo em seguida. Ele pode aparecer depois de um ou vários `.then`.

Ou, talvez, não tenha nada de errado com o site, mas a resposta não seja um JSON válido. A forma mais fácil de capturar todos os erros é colocar um `.catch` no final da cadeia:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

Normalmente, esse `.catch` nem dispara. Mas se qualquer uma das promessas acima for rejeitada (um problema de rede, um json inválido, ou qualquer outra coisa), ele vai capturar.

## try..catch implícito

O código de um executor de promessa e dos tratadores de promessa tem um "try..catch invisível" ao redor dele. Se uma exceção acontece, ela é capturada e tratada como uma rejeição.

Por exemplo, este código:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

...Funciona exatamente igual a este:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
```

O "try..catch invisível" ao redor do executor captura o erro automaticamente e o transforma em uma promessa rejeitada.

Isso acontece não só na função executora, mas também nos seus tratadores. Se dermos um `throw` dentro de um tratador de `.then`, isso significa uma promessa rejeitada, então o controle salta para o tratador de erro mais próximo.

Aqui está um exemplo:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // rejeita a promessa
*/!*
}).catch(alert); // Error: Whoops!
```

Isso acontece para todos os erros, não só os causados pelo comando `throw`. Por exemplo, um erro de programação:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // não existe essa função
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

O `.catch` final não só captura rejeições explícitas, mas também erros acidentais nos tratadores acima.

## Relançando

Como já percebemos, o `.catch` no final da cadeia é parecido com `try..catch`. Podemos ter quantos tratadores `.then` quisermos, e então usar um único `.catch` no final para tratar os erros de todos eles.

Em um `try..catch` normal, podemos analisar o erro e talvez relançá-lo se não puder ser tratado. A mesma coisa é possível com promessas.

Se dermos um `throw` dentro do `.catch`, o controle vai para o próximo tratador de erro mais próximo. E se tratarmos o erro e terminarmos normalmente, então ele continua para o próximo tratador `.then` de sucesso mais próximo.

No exemplo abaixo, o `.catch` trata o erro com sucesso:

```js run
// a execução: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("O erro foi tratado, continua normalmente");

}).then(() => alert("O próximo tratador de sucesso roda"));
```

Aqui o bloco `.catch` termina normalmente. Então o próximo tratador `.then` de sucesso é chamado.

No exemplo abaixo, vemos a outra situação com `.catch`. O tratador `(*)` captura o erro e simplesmente não consegue tratá-lo (por exemplo, ele só sabe tratar `URIError`), então ele o relança:

```js run
// a execução: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // trata isso
  } else {
    alert("Não sei lidar com esse tipo de erro");

*!*
    throw error; // lançar esse erro ou outro salta para o próximo catch
*/!*
  }

}).then(function() {
  /* não roda aqui */
}).catch(error => { // (**)

  alert(`Ocorreu um erro desconhecido: ${error}`);
  // não retorna nada => a execução segue o caminho normal

});
```

A execução salta do primeiro `.catch` `(*)` para o próximo `(**)` ao longo da cadeia.

## Rejeições não tratadas

O que acontece quando um erro não é tratado? Por exemplo, esquecemos de colocar um `.catch` no final da cadeia, como aqui:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Erro aqui (não existe essa função)
})
  .then(() => {
    // tratadores de promessa bem-sucedidos, um ou mais
  }); // sem .catch no final!
```

Em caso de erro, a promessa se torna rejeitada, e a execução deveria saltar para o tratador de rejeição mais próximo. Mas não existe nenhum. Então o erro fica "preso". Não há código para tratá-lo.

Na prática, assim como acontece com erros normais não tratados no código, isso significa que algo deu muito errado.

O que acontece quando um erro normal ocorre e não é capturado por `try..catch`? O script morre com uma mensagem no console. Uma coisa parecida acontece com rejeições de promessa não tratadas.

O motor do JavaScript rastreia essas rejeições e gera um erro global nesse caso. Você pode ver isso no console se rodar o exemplo acima.

No navegador, podemos capturar esses erros usando o evento `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // o objeto event tem duas propriedades especiais:
  alert(event.promise); // [object Promise] - a promessa que gerou o erro
  alert(event.reason); // Error: Whoops! - o objeto do erro não tratado
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // sem catch para tratar o erro
```

Esse evento é parte do [padrão HTML](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

Se um erro ocorre, e não há `.catch`, o tratador de `unhandledrejection` dispara, e recebe o objeto `event` com as informações sobre o erro, para que possamos fazer alguma coisa.

Geralmente esses erros são irrecuperáveis, então nossa melhor saída é informar o usuário sobre o problema e, provavelmente, reportar o incidente ao servidor.

Em ambientes que não são navegador, como o Node.js, existem outras formas de rastrear erros não tratados.

## Resumo

- O `.catch` trata erros em promessas de todos os tipos: seja uma chamada a `reject()`, ou um erro lançado em um tratador.
- O `.then` também captura erros da mesma forma, se receber o segundo argumento (que é o tratador de erro).
- Devemos colocar o `.catch` exatamente nos lugares onde queremos tratar erros e sabemos como tratá-los. O tratador deve analisar os erros (classes de erro personalizadas ajudam) e relançar os desconhecidos (talvez sejam erros de programação).
- Não tem problema não usar `.catch` de jeito nenhum, se não houver como se recuperar de um erro.
- Em qualquer caso, devemos ter o tratador do evento `unhandledrejection` (para navegadores, e equivalentes para outros ambientes) para rastrear erros não tratados e informar o usuário (e provavelmente nosso servidor) sobre eles, para que nosso app nunca "simplesmente morra".
