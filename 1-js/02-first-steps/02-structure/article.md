# Estrutura do código

A primeira coisa que vamos estudar são os blocos de construção do código.

## Declarações

As expressões são construções de sintaxe e comandos que executam ações.

Nós já vimos uma declaração, `alert('Olá, mundo!')`, que mostra a mensagem "Olá, mundo!".

Podemos ter tantas declarações em nosso código quanto quisermos. Declarações podem ser separadas por ponto-e-vírgula.

Por exemplo, aqui dividimos " Olá Mundo" em dois alertas:

```js run no-beautify
alert('Olá'); alert('Mundo');
```

Normalmente, as declarações são escritas em linhas separadas para tornar o código mais legível:

```js run no-beautify
alert('Olá');
alert('Mundo');
```

## Ponto e vírgula [#semicolon]

Um ponto e vírgula pode ser omitido na maioria dos casos quando existe uma quebra de linha.

Isto também funcionaria:

```js run no-beautify
alert('Olá')
alert('Mundo')
```

Aqui, o JavaScript interpreta a quebra de linha como um ponto-e-vírgula "implícito". Isso é chamado de [inserção automática de ponto-e-vírgula](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**Na maioria dos casos, uma nova linha implica um ponto e vírgula. Mas "na maioria dos casos" não significa "sempre"!

Há casos em que uma nova linha não significa ponto e vírgula. Por exemplo:
```js run no-beautify
alert(3 +
1
+ 2);
```

O código produz `6` porque o Javascript não insere pontos e virgulas aqui. É intuitivamente óbvio que se a linha termina com um sinal de mais `"+"`, então é uma "expressão incompleta", logo o ponto e vírgula não é necessário. E neste caso isso funciona como pretendido.

**Mas há situações em que o JavaScript "falha" em assumir um ponto e vírgula onde ele é realmente necessário.**

Erros que ocorrem em tais casos são bastante difíceis de encontrar e corrigir.

````smart header="Um exemplo de erro"
Se você está curioso para ver um exemplo concreto de tal erro, verifique este código:

```js run
[1, 2].forEach(alert)
```

Não há necessidade de pensar sobre o significado dos parênteses `[]` e `forEach` ainda. Nós vamos estudá-los mais tarde. Por enquanto, apenas lembre-se que o resultado do código: mostra `1` e depois` 2`.

Agora, vamos adicionar um `alert` antes do código e * não * terminá-lo com um ponto e vírgula:

```js run no-beautify
alert("Haverá um erro")

[1, 2].forEach(alert)
```

Agora, se nós executarmos o código, apenas o primeiro `alert` é mostrado e então temos um erro!

Mas tudo está bem novamente se adicionarmos um ponto e vírgula após `alert`:
```js run
alert("Tudo bem agora");

[1, 2].forEach(alert)  
```

Agora temos a mensagem "Tudo bem agora" seguida por "1" e "2".


O erro na variante sem ponto e vírgula ocorre porque o JavaScript não assume um ponto e vírgula antes dos colchetes `[...]`.

Portanto, como o ponto e vírgula não é inserido automaticamente, o código no primeiro exemplo é tratado como uma única instrução. Veja como o mecanismo vê isso:

```js run no-beautify
alert("Haverá um erro")[1, 2].forEach(alert)
```

Mas devem ser duas declarações separadas, não uma. Tal fusão neste caso é completamente errado, daí o erro. Isso pode acontecer em outras situações.
````

Recomendamos colocar ponto e vírgula entre as frases, mesmo que estejam separadas por novas linhas. Esta regra é amplamente adotada pela comunidade. Vamos notar mais uma vez -- *é possível* deixar de fora os pontos e vírgulas na maior parte do tempo. Mas é mais seguro -- especialmente para um iniciante -- usá-los.

## Comentários

Com o passar do tempo, os programas tornam-se cada vez mais complexos. Torna-se necessário adicionar *comentários* que descrevem o que o código faz e porquê.

Comentários podem ser colocados em qualquer lugar de um script. Eles não afetam sua execução porque o motor simplesmente os ignora.

**Comentários de uma linha começam com dois caracteres de barra `//`.**

O resto da linha é um comentário. Ele pode ocupar uma linha inteira ou seguir uma instrução.

Como aqui:
```js run
// Este comentário ocupa uma linha própria
alert('Olá');

alert('Mundo'); // Este comentário segue-se à afirmação
```

**Comentários de várias linhas começam com uma barra e um asterisco <code>/&#42;</code> e terminar com um asterisco e uma barra frontal <code>&#42;/</code>.**

Assim:

```js run
/* Um exemplo com duas mensagens.
Este é um comentário multilinha.
*/
alert('Olá');
alert('Mundo');
```

O conteúdo dos comentários é ignorado, então se colocarmos código dentro de <code>/&#42; ... &#42;/</code>, ele não vai executar.

Às vezes, pode ser útil desativar temporariamente uma parte do código:

```js run
/* Comentando o código
alert('Olá');
*/
alert('Mundo');
```

```smart header="Use hotkeys!"
Na maioria dos editores, uma linha de código pode ser comentada pressionando a tecla de atalho `key:Ctrl+/` para um comentário de linha única e algo como `key:Ctrl+Shift+/` -- para comentários multilinha (selecione um pedaço de código e pressione a tecla de atalho). Para Mac, tente `key:Cmd` em vez de `key:Ctrl`.
```

````warn header="Comentários aninhados não são suportados!"
Pode não haver `/*...*/` dentro de outro `/*...*/`.

Tal código morrerá com um erro:

```js run no-beautify
/*
  /* comentário aninhado ?!? */
*/
alert( 'Mundo' );
```
````

Por favor, não hesite em comentar o seu código.

Os comentários aumentam a pegada global do código, mas isso não é um problema. Há muitas ferramentas que minificam o código antes de publicar em um servidor de produção. Elas removem comentários, então elas não aparecem nos scripts de trabalho. Portanto, os comentários não têm efeitos negativos na produção.

Mais tarde no tutorial haverá um capítulo <info:code-quality> que também explica como escrever melhores comentários.
