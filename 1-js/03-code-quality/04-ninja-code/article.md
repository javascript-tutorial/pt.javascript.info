# Código ninja


```quote author="Confúcio"
Estudo sem pensamento é trabalho perdido; pensamento sem estudo é perigoso.
```

Programadores ninjas do passado usavam truques para moldar a mente dos mantenedores de códigos.

Os gurus da revisão de código procuram por essas artimanhas em testes avaliativos.

Desenvolvedores iniciantes muitas vezes usam essas habilidades até mesmo melhor que os programadores ninjas.

Leia tudo com atenção e descubra quem é você -- um ninja, um iniciante ou um revisor de código?


```warn header="Ironia detectada"
Muitos tentam ir pelo caminho dos ninjas. Poucos conseguem.
```


## Brevidade é a alma da perspicácia

Faça o código o mais curto possível. Mostre quão inteligente você é.

Deixe a linguagem implícita guiar você.

Por exemplo, dê uma olhada neste operador ternário `'?'`:

```js
// tirado de uma bem conhecida biblioteca javascript
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Lega, né? Se você escrever dessa forma, um desenvolvedor que passar por essa linha e tentar entender qual o valor de `i` irá gastar um bom tempo. E então irá até você pedindo uma resposta.

Diga a eles que o curto é sempre melhor. Introduza eles ao caminho do ninja.

## Variáveis de letra única

```quote author="Lao Zi (Tao Te Ching)"
O Caminho é invisível e não tem nome.
Assim, apenas o Caminho é bom em auxiliar e concluir.
```

Outra forma de escrever código mais rápido é usar nomes de variáveis de letra única em todo lugar. Como `a`, `b`, ou `c`.

Uma variável curta desaparece no código como um ninja de verdade desaparece na floresta. Ninguém conseguirá encontrar ela usando a ferramenta de pesquisa do editor. E mesmo se alguém o fizer, não será capaz de decifrar o que o nome `a` ou `b` significam.

...Mas há uma exceção. Um ninja de verdade nunca usa `i` como o contador de um loop `for`. Em qualquer lugar, menos aqui. Veja em sua volta, existem várias outras letras exóticas. Por exemplo, `x` ou `y`.

Uma variável exótica como um contador de loop é especialmente legal se o corpo do loop tiver uma ou duas páginas (faça ele bem longo se puder). Então se alguma pessoa der uma olhada dentro do loop, ela não será capaz de entender logo que aquela variável nomeada como `x` é simplesmente o contador do loop.

## Use abreviações

Se as regras do time proibem o uso de variáveis de letra única e nomes vagos -- encurte elas, faça abreviações.

Tipo assim:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...etc

Apenas aquele com uma intuição bem aguçada terá a capacidade de entender esses nomes. Tente encurtar tudo. Apenas uma pessoa dígna será capaz de manter o desenvolvimento do seu código.

## Voe alto. Seja abstrato.

```quote author="Lao Zi (Tao Te Ching)"
O grande quadrado não tem ângulos<br>
O grande recipiente conclui-se tarde<br>
O grande som carece de ruído<br>
A grande imagem não tem forma.
```

Ao escolher um nome tente usar a palavra mais abstrata possível. Como `obj`, `dado`, `valor`, `item`, `elem` e assim por diante.

- **O nome ideal para uma variável é `dado`.** Use ele em todo lugar que você puder. Aliás, toda variável armazena um *dado*, né?

    ...Mas o que fazer se `dado` já foi usado? Tente `valor`, também é universal. No fim das contas, uma variável eventualmente terá um *valor*.

- **Nomeie uma variável pelo seu tipo: `str`, `num`...**

    Experimente isso. Um jovem pupilo deve pensar -- esses nomes são realmente úteis para um ninja? Bem, eles são!

    É óbvio, o nome da variável continua significando alguma coisa. Ele diz o que tem dentro da variável: uma string, um número ou qualquer outra coisa. Mas quando um forasteiro tentar entender o código, ele ficará surpreso ao ver que ali na verdade não existe nenhuma informação! E irá falhar ao tentar alterar seu código que foi escrito friamente calculado.

    O tipo de uma variável é muito fácil de encontrar usando o debug. Mas qual é o real significado da variável? Que string/número ela armazena?

    Não existe nenhuma outra forma de descobrir isso sem uma boa meditaçao!

- **...Mas e se não há mais nenhum desses nomes disponíveis?** Simplesmente adicione números: `dado1, item2, elem5`...

## Teste de perspicácia

Apenas um programador perspicaz será capaz de entender o seu código. Mas como testar isso?

**Uma das formas -- use nomes similares para variáveis como `dado` e `data`.**

Misture onde você puder.

Uma leitura rápida no código se torna impossível. E quando temos um erro de digitação... Hummm... Ficaremos preso por um bom tempo, hora do chá.


## Sinônimos inteligentes

```quote author="Confúcio"
A coisa mais difícil do mundo é encontrar um gato preto numa sala escura, especialmente se não existir um gato.
```

Usando nomes *similares* para as *mesmas* coisas faz da vida mais interessante e expõe a sua criatividade para o público.

Por exemplo, considere o prefixo de funções. Se uma função mostra uma mensagem na tela -- começe ela com `mostra...`, como `mostraMensagem`. E se outra função mostra na tela alguma outra coisa, como o nome de um usário, começe com `exibe...` (como `exibeNome`).

Insinue que há uma pequena diferença entre as duas funções, quando na verdade não há.

Faça um pacto com seus parceiros ninjas do time: se João inicia funções de "exibir" com `mostra...` no código dele, então Pedro pode usar `renderiza...`, e Ana -- `imprime...`. Note como o código se torna bem mais interessante e diverso.

...Agora o pulo do gato!

Para duas funções com diferenças consideráveis -- use o mesmo prefixo!

Por exemplo, a função `imprimePagina(pagina)` vai usar a impressora. E a função `imprimeTexto(texto)` vai mostrar o texto na tela. Deixe um leitor não familiarizado refletir sobre a função com nome similar `imprimeMensagem`: "Onde isso vai pôr a mensagem? Na impressora ou na tela?". Para ficar ainda mais brilhante, `imprimeMensage(mensagem)` deveria mostrar sua saída numa nova janela!

## Reuse nomes

```quote author="Lao Zi (Tao Te Ching)"
Mas quando ocorre a limitação
Logo surgem os nomes.
Quando os nomes surgem
Deve-se então saber parar.
```

Adicione uma variável nova apenas quando for absolutamente necessário.

Ao invés disso, reuse os nomes já existentes. Apenas atribua novos valores para eles.

Em uma função tente usar apenas as funções usadas como parâmetros.

Isso fará com que seja bem mais difícil identificar o que exatamente está dentro da variável *agora*. E também de onde ela vem. Uma pessoa com intuição fraca terá que analisar o código linha por linha e observar as mudanças através de cada parte do código.

**Uma variação avançada dessa abordagem é substituir secretamente (!) o valor da variável com algo semelhante no meio do loop ou de uma função.**

Por exemplo:

```js
function funcaoNinja(elem) {
  // 20 linhas de código trabalhando com elem

  elem = clone(elem);

  // mais 20 linhas, agora trabalhando com o clone de elem!
}
```

Um colega programador que quiser trabalhar com `elem` será surpreendido na segunda metade da função... Somente durante o debug, depois de um exame do código, ele irá descobrir que estava trabalhando com um clone!

Isso é visto frequentemente em códigos. Mortalmente efetivo até mesmo com os ninjas mais experientes.

## Sublinhas por diversão

Coloque sublinhas `_` e `__` antes dos nomes das variáveis. Como `_nome` ou `__valor`. Será melhor ainda se apenas você souber o significado disso. Ou, melhor, adicione apenas por diversão, sem um signifcado em particular. Ou significados diferentes em lugares diferentes.

Você mata dois coelhos numa paulada só. Primeiro, o código se torna mais longo e menos legível, e segundo, um colega desenvolvedor terá que gastar um bom tempo tentando entender o que significam as sublinhas.

Um ninja inteligente põe sublinhas em uma parte do código e evita elas em outras partes. Isso deixa o código ainda mais frágil e aumentam as chances de futuros erros.

## Mostre seu amor

Faça com que todos vejam a grandiosidade das suas entidades! Nomes como `superElemento`, `megaFrame` e `itemLegal` com certeza irão deixar isso bem claro para o leitor.

Aliás, por um lado, algo é escrito como: `super..`, `mega..`, `legal..` Mas por outro -- isso não traz detalhe nenhum. Um leitor talvez decida procurar por um signifcado e irá meditar por uma hora ou duas.



## Sobreponha variáveis externas

```quote author="Guan Yin Zi"
Quando na luz, não podes ver nada na escuridão.
Quando na escuridão, não podes ver nada na luz.
```

Use os mesmos nomes para variáveis dentro e fora de uma função. Bem simples. Sem esforço.

```js
let *!*usuario*/!* = autenticaUsuario();

function render() {
  let *!*usuario*/!* = outroValor();
  ...
  ...muitas linhas...
  ...
  ... // <-- um programador vai querer trabalhar com usuario aqui e...
  ...
}
```

Um programador que olhar dentro de `render` provavelmente vai falhar em notar que já existe um `usuario` local substituindo a variável exterior à função.

Então ele vai tentar trabalhar com `usuario` assumindo que é a variável exterior, o resultado de `autenticaUsuario()`... A armadilha tá feita! Olá, debugger...


## Efeitos colaterais em todo lugar!

Existem funções que parecem que não alteram nada. Como `estaPronto()`, `checaPermissao()`, `encontraTags()`... Elas são feitas para realizar cálculos, encontrar e retornar o dado, sem mudar nada fora delas. Em outras palavras, sem "efeito colateral".

**Um truque ótimo é adicionar uma ação "útil" a elas, além da sua tarefa principal.**

Uma expressão de surpresa atordoada na cara dos seus colegas quando eles virem uma função com nome `esta...`, `checa...` ou `encontra...` mudando alguma coisa -- vai definitivamente ampliar seus limites da razão.

**Uma outra forma de surpreender é retornar um valor não padrão.**

Mostre o que é pensar fora da caixa! Faça com que a chamada de `checaPermissao` retorne não um `true/false`, mas sim um complexo objeto com o resultado da checagem.

Aqueles desenvolvedores que tentarem escrever `if (checaPermissao(..))`, vai se perguntar por que não funciona. Diga a eles: "Leia a documentação!". E mostre este artigo.


## Funções superpoderosas!

```quote author="Lao Zi (Tao Te Ching)"
O Grande Caminho é vasto
Pode ser encontrado na esquerda e na direita
```

Não limite a função pelo o que está escrito em seu nome. Seja amplo.

Por exemplo, uma função `validaEmail(email)` poderia (além de checar a validade do email) mostrar uma mensagem de erro e perguntar para reescrever o email.

Açoes adicionais não devem ser óbvias pelo nome da função. Um verdadeiro programador ninja também as tornará não óbvias assim como o resto do código.

**Juntar várias ações em uma protegerá seu código de ser reutilizado.**

Imagine, algum outro desenvolvedor quer apenas checar o email, mas não mostrar uma mensagem. Sua função `validaEmail(email)` que executa as duas ações não servirá pra ele. Então ele não irá interromper sua meditação perguntando sobre ela.

## Sumário

Todas as "peças de conselhos" acima são de códigos reais... Algumas escritas por desenvolvedores experientes. Talvez até mais experientes do que você ;)

- Siga algumas delas, e seu código se tornará cheio de surpresas.
- Siga muitas delas, e seu código se tornará realmente seu, ninguém irá querer alterá-lo.
- Siga todas, e seu código se tornará uma lição valiosa para novos desenvolvedores procurando pela iluminação.
