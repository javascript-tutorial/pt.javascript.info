# Recursão e pilha

Vamos retornar para funções e estudá-las mais a fundo.

Nosso primeiro tópico será *recursão*.

Se você não é novo em programação, então isto é provavelmente familiar e você poderá pular este capítulo. 

Recursão é um padrão de programação que é útil em situações em que uma tarefa pode ser naturalmente dividida em outras tarefas parecidas, porém mais simples. Ou quando a tarefa pode ser simplificada em uma ação simples seguida de uma simples variação da mesma tarefa. Ou, como veremos adiante, para lidar com certas estruturas de dados.

Quando uma função resolve uma tarefa, no processo ela pode chamar muitas outras funções. Num certo momento a função poderá chamar *ela mesma*. Isso é chamado de *recursão*.

## Dois modos de pensar

Vamos começar com algo simples -- vamos escrever uma função `pow(x, n)` que eleva `x` para o expoente `n`. Em outras palavras, multiplica `x` por ele mesmo `n` vezes.

```js
pow(2, 2) = 4
pow(2, 3) = 8
pow(2, 4) = 16
```

Existem duas formas de implementar isto.

1. Forma iterativa: usando o loop `for`:

    ```js run
    function pow(x, n) {
      let result = 1;

      // mulitplica o resultado por x n vezes dentro do loop
      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

    alert( pow(2, 3) ); // 8
    ```

2. Forma recursiva: simplifica a tarefa e chama ela mesma:

    ```js run
    function pow(x, n) {
      if (n == 1) {
        return x;
      } else {
        return x * pow(x, n - 1);
      }
    }

    alert( pow(2, 3) ); // 8
    ```

Por favor observa como a variação recursiva é fundamentalmente diferente.

Quando `pow(x, n)` é chamada, a execução divide em dois ramos:

```js
              if n==1  = x
             /
pow(x, n) =
             \       
              else     = x * pow(x, n - 1)
```

1. Se `n == 1`, então tudo é trivial. É denominado *a base* da recursão, porque imediatamente reproduz o resultado óbvio: `pow(x, 1)` igual a `x`.
2. No entanto, podemos representar `pow(x, n)` como `x * pow(x, n - 1)`. Em matemática, pode ser escrito <code>x<sup>n</sup> = x * x<sup>n-1</sup></code>. Isso é chamado de *um passo recursivo*: nós transformamos a tarefa em uma ação simples (multiplicação por `x`) e uma simples chamada para a mesma tarefa (`pow` com `n` reduzido). Próximos passos são simplificados mais e mais até `n` chegar a `1`.

Nós também podemos dizer que `pow` *recursivamente chamou a si mesmo* até `n == 1`.

![recursive diagram of pow](recursion-pow.svg)


Por exemplo, para calcular `pow(2, 4)` a variante recursiva percorre esses passos:

1. `pow(2, 4) = 2 * pow(2, 3)`
2. `pow(2, 3) = 2 * pow(2, 2)`
3. `pow(2, 2) = 2 * pow(2, 1)`
4. `pow(2, 1) = 2`

Então, a recursão reduz a chamada da função a uma mais simples, e então -- para outra mais simples, e por aí em diante, até o resultado se tornar óbvio.

````smart header="Recursão é geralmente mais curto"
Uma solução recursiva é geralmente mais curta que uma iterativa.

Aqui podemos reescrever usando o operador ternário `?` ao invés de `if` para deixar `pow(x, n)` mais conciso e ainda muito legível:

```js run
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
}
```
````

O número máximo das chamadas aninhadas (incluindo a primeira) é chamado de *profundidade da recursão*. No nosso caso, será exatamente `n`.

A profundidade máxima da recursão é limitada pelo mecanismo do JavaScript. Podemos ter certeza sobre 10000, alguns mecanismos permitem mais, porem 100000 é provavelmente além do limite para a maioria deles. Existem melhorias automáticas que ajudam a aliviar isso ("otimização de chamada de calda"), porem elas não são suportadas em todo lugar e funciona apenas em casos simples.

Isso limita o uso da recursão, porem ainda é muito amplo. Existem muitas tarefas onde a recursividade gera um código mais simples, fácil de manter.

## A pilha de execução

Agora vamos examinar como a chamada recursiva funciona. Para isto vamos ver o que está por trás das funções.

A informação sobre a função é armazenada no *contexto de execução* dela.

O [contexto de execução](https://tc39.github.io/ecma262/#sec-execution-contexts) é uma estrutura de dados interna que contém detalhes sobre a execução da função: onde o fluxo de controle está agora, as variáveis atuais, o valor do `this` (nós não usamos ele aqui) e alguns outros detalhes internos.

Uma chamada de função tem exatamente um contexto de execução associado a ela.

Quando a função faz uma chamada aninhada, o seguir acontece:

- A função atual é pausada.
- O contexto de execução associado a ela é gravado numa estrutura especial de dados chamada *pilha de contexto de execução*.
- A função aninhada é executada.
- Após terminar, o antigo contexto de execução é recuperado da pilha, e a outra função é retomada da onde parou.

Vamos ver o que acontece quando `pow(2, 3)` é chamado.

### pow(2, 3)

No começo da chamada `pow(2, 3)` o contexto de execução irá armazenar as variáveis: `x = 2, n = 3`, o fluxo de execução está na linha `1` da função.
In the beginning of the call `pow(2, 3)` the contexto de execução will store variables: `x = 2, n = 3`, the execution flow is at line `1` of the function.

Podemos esboçar como:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Contexto: { x: 2, n: 3, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Isto é quando a função inicia a execução. A condição `n == 1` é falsa, então o fluxo continua para a segunda parte do `if`:

```js run
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
*!*
    return x * pow(x, n - 1);
*/!*
  }
}

alert( pow(2, 3) );
```


As variáveis são as mesmas, porém a linha muda, então o contexto é agora:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Contexto: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Para calcular `x * pow(x, n - 1)`, precisamos fazer uma sub-chamada de `pow` com novos argumentos `pow(2, 2)`.

### pow(2, 2)

Para fazer uma chamada aninhada, JavaScript grava o atual contexto de execução na *pilha contexto de execução*.

Aqui chamamos a mesma função `pow`, mas isso absolutamente não importa. O processo é o mesmo para todas as funções:

1. O contexto atual é "gravado" no topo da pilha.
2. O novo contexto é criado para a sub-chamada.
3. Quando a sub-chamada é finalizada -- o contexto anterior é retirado da pilha, e sua execução continua.

Aqui está a pilha de contexto quando nós entramos na sub-chamada `pow(2, 2)`:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Contexto: { x: 2, n: 2, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Contexto: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

O novo atual contexto de execução está no topo (e negrito), e o contexto anterior gravado está abaixo.

Quando nós finalizamos a sub-chamada -- é fácil retomar o contexto anterior, porque ele mantém ambas variáveis e o lugar exato do código onde ele parou. Aqui na imagem usamos a palavra "line" (linha), mas é claro ele é mais preciso.

### pow(2, 1)

O processo repete: uma nova sub-chamada é feita na linha `5`, agora com os argumentos `x=2`, `n=1`.

Um novo contexto de execução é criado, o anterior é empurrado do topo da pilha:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Contexto: { x: 2, n: 1, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 1)</span>
  </li>
  <li>
    <span class="function-execution-context">Contexto: { x: 2, n: 2, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Contexto: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Agora existem 2 contextos antigos e 1 atualmente executando para `pow(2, 1)`.

### A saída

Durante a execução de `pow(2, 1)`, diferente de antes, a condição `n == 1` é verdadeira, então a primeira parte do `if` executa:

```js
function pow(x, n) {
  if (n == 1) {
*!*
    return x;
*/!*
  } else {
    return x * pow(x, n - 1);
  }
}
```

Não há mais chamadas aninhadas, assim a função finaliza, retornando `2`.

Como a função finaliza, seu contexto de execução não tem mais necessidade, então ele é removido da memória. O anterior é restaurado do topo da pilha:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Contexto: { x: 2, n: 2, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Contexto: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

A execução de `pow(2, 2)` é resumida. Ela contém o resultado da sub-chamada `pow(2, 1)`, assim ela também finaliza o calculo de `x * pow(x, n - 1)`, retornando `4`.

Então o contexto anterior é restaurado:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Contexto: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Quando ele termina, nós temos o resultado de `pow(2, 3) = 8`.

A profundidade da recursão neste caso era: **3**.

Como podemos ver a partir das ilustrações acima, a profundidade da recursão é igual ao número máximo de contexto numa pilha.

Note os requisitos de memória. Contextos usam memória. No nosso caso, elevando para a potência de `n` na verdade requer uma memória para `n` contextos, para todos os valores menores que `n`.

Um algoritmo baseado em loop poupa mais memória:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

A `pow` iterativa usa apenas um contexto, mudando `i` e `result` no processo. Seu requisito de memória é pequeno, fixo e não depende de `n`.

**Toda recursão pode ser reescrita como um loop. A variação do loop geralmente pode ser feita de uma forma mais efetiva.**

...Porém algumas vezes a rescrita não é trivial, especialmente quando a função usa diferentes sub-chamadas recursivas de acordo com as condições e mescla seus resultados ou quando a ramificação é mais complexa. E a otimização pode ser desnecessária e o esforço gasto não compensa.

Recursão pode dar um código menor, mais fácil de entender e de dar suporte. Otimizações não são requisitadas em todo lugar, na maioria das vezes nós precisamos um bom código, por isso é usado.

## Travessias recursivas

Outra grande aplicação da recursão é na travessia recursiva.

Imagine, nós temos uma empresa. A estrutura dos empregados pode ser apresentada como um objeto:

```js
let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};
```

Em outras palavras, uma empresa tem departamentos.

- Um departamento pode ter um array (lista) de funcionários. Por exemplo, o departamento `sales` possui 2 funcionários: John e Alice.
- Ou o departamento pode ser dividido em subdepartamento, como `development` possui duas ramificações: `sites` e `internals`. Cada um tem seus próprios empregados.
- Também é possível que quando o subdepartamento cresça, ele se divida em subsubdepartamentos (ou times).

    Por exemplo, o departamento `sites` no futuro pode ser dividido em times `siteA` e `siteB`. E eles, potencialmente, podem ser também divididos. Isso não é o caso, é apenas pra ter em mente.

Agora vamos dizer que queremos a função que retorne a soma de todos os salários. Como faremos isto?

Na maneira iterativa não é fácil, porque a estrutura não é simples. A primeira ideia pode ser fazer um loop `for` dentro de `company` com um subloop aninhado no primeiro nível de departamentos. Porém então necessitaremos de mais subloops aninhados para iterar nos próximos níveis de departamentos como `sites`. ...E então outro subloop dentro desses para o 3º nível dos departamentos que talvez possa aparecer no futuro? Deveríamos parar no nível 3 ou fazer 4 níveis de loop? Se colocarmos 3-4 subloops aninhados no código para percorrer apenas um objeto, isso começa a ficar feio.

Vamos tentar recursão.

Como nós podemos ver, quando nossa função chega no departamento para somar, há dois possíveis casos:

1. É um "simples" departamento com um *array de pessoas* -- então nós podemos somar os salários usando um loop simplesmente.
2. Ou é *um objeto com `N` subdepartamentos* -- então nós podemos fazer `N` chamadas recursivas para pegar a soma que cada subdepartamento e combinar os resultados.

O (1) é a base da recursão, o caso trivial.

O (2) é o passo recursivo. A tarefa complexa de dividir em subtarefas para departamentos menores. Eles podem ser dividos novamente, mas cedo ou tarde a divisão vai chegar ao (1).

O algoritmo é provavelmente mais fácil de ler a partir desse código:


```js run
let company = { // mesmo objeto, porém compactado
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// A função que faz o trabalho
*!*
function sumSalaries(department) {
  if (Array.isArray(department)) { // caso (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // soma o array
  } else { // caso (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursivamente chama pelos subdepartamentos, soma os resultados
    }
    return sum;
  }
}
*/!*

alert(sumSalaries(company)); // 6700
```

O código é curto e fácil de entender (eu espero!). Esse é o poder da recursão. Isso também funciona para qualquer nível de aninhamento de subdepartamento.

Aqui está o diagrama das chamadas:

![recursive salaries](recursive-salaries.svg)

Nós facilmente podemos ver o principio: para um objeto `{...}` sub-chamadas são feitas, enquanto arrays `[...]` são as "folhas" da árvore de recursão, elas dão o resultado imediatamente.

Observe que o código usa recursos inteligentes que abordamos antes:

- Método `arr.reduce` é explicado no capítulo <info:array-methods> para somar a array.
- Loop `for(val of Object.values(obj))` para iterar nos valores do objeto: `Object.values` retorna uma array deles.


## Estruturas recursivas

Um estrutura de dados recursiva (recursivamente-definida) é um estrutura que replica ela mesmo em partes:

Acabamos de vê-la no exemplo da estrutura da empresa acima.

Um *departamento* da empresa é:
- É um array de pessoas.
- Ou um objeto com *departamentos*.

Para web-developers há exemplos mais conhecidos: documentos HTML e XML.

No documento HTML, uma *tag HTML* pode conter uma lista de:
- Pedaços de texto.
- Comentários HTML.
- Outras *tags HTML* (que pode conter pedaços de textos/comentários ou outras tags etc).

Novamente uma definição de recursão.

Para melhor entendimento, abordaremos mais uma estrutura recursiva chamada "Lista ligada" que pode ser uma melhor alternativa para arrays em alguns casos.

### Listas ligadas

Imagine, queremos armazenar uma lista ordenada de objetos.

A escolha natural seria uma array:

```js
let arr = [obj1, obj2, obj3];
```

...Mas há um problema com arrays. As operações de "apagar elemento" e "inserir elemento" são custosas. Por exemplo, `arr.unshift(obj)` a operação precisa renumerar todos os elementos para abrir espaço para um novo `obj`, e se a array for grande, leva tempo. O mesmo acontece com `arr.shift()`.

As únicas modificações estruturais que não requerem renumeração em massa são aquelas que operam com o final da array: `arr.push/pop`. Portanto, uma array pode ser bastante lenta para grandes filas.

Como alternativa, se realmente precisamos de inserção/exclusão rápida, podemos escolher outra estrutura de dados chamada [linked list](https://pt.wikipedia.org/wiki/Lista_ligada).

Um *elemento da lista ligada* é definido recursivamente como um objeto com:
- `value`.
- `next` propriedade referenciando para o próximo *elemento da lista ligada* ou `null` se for o fim.

Por exemplo:

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

Representação gráfica da lista:

![linked list](linked-list.svg)

Um código alternativo para a criação:

```js no-beautify
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
```

Aqui nós podemos ver claramente que existem multiplos objetos, cada um possui o `value` e `next` apontando para o vizinho. A variável `list` é o primeiro objeto na lista, assim seguindo os ponteiros `next` dela nós podemos alcançar qualquer elemento.

A lista pode ser facilmente dividida em várias partes e depois ser juntada novamente:

```js
let secondList = list.next.next;
list.next.next = null;
```

![linked list split](linked-list-split.svg)

Para juntar:

```js
list.next.next = secondList;
```

E é claro, nós podemos inserir ou remover itens de qualquer lugar.

Por exemplo, para inserir um novo valor, nós precisamos atualizar o cabeçalho da lista:

```js
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };

*!*
// inserindo um novo valor na lista
list = { value: "new item", next: list };
*/!*
```

![linked list](linked-list-0.svg)

Para remover um valor do meio, mude o `next` do elemento anterior:

```js
list.next = list.next.next;
```

![linked list](linked-list-remove-1.svg)

Nós fizemos o `list.next` pular do `1` para o `2`. O valor `1` agora está excluído da lista. Se ele não estiver armazenado em nenhum outro lugar, ele será automaticamente removido da memória.

Ao contrário das arrays, não há renumeração em massa, nós podemos reorganizar elementos facilmente.

Naturalmente, as listas nem sempre são melhores que as arrays. Caso contrário, todos usariam apenas listas.

A principal desvantagem é que não podemos acessar facilmente um elemento pelo seu número. Na array é fácil: `arr[n]` é a referência direta. Mas na lista, precisamos começar do primeiro item e ir `next` `N` vezes para chegar no N-ésimo elemento.

...Mas nem sempre precisamos dessas operações. Por exemplo, quando precisamos de uma fila ou até de um [deque](https://pt.wikipedia.org/wiki/Deque_(estruturas_de_dados) -- a estrutura ordenada que deve permitir adicionar/remover elementos muito rapidamente de ambas as extremidades, mas o acesso ao meio não é necessário.

As listas podem ser aprimoradas:
- Podemos adicionar a propriedade `prev` além de `next` para referenciar o elemento anterior, para voltar facilmente.
- Também podemos adicionar uma variável chamada `tail` referenciando o último elemento da lista (e atualizá-la ao adicionar/remover elementos no final).
- ...A estrutura de dados pode variar de acordo com nossas necessidades.

## Sumário

Termos:
- *Recursão* é um termo de programação que significa chamar uma função de si mesma. Funções recursivas podem ser usadas para resolver tarefas de maneira elegante.

    Quando uma função se chama, isso é chamado de *passo de recursão *. A *base* da recursão são argumentos da função que tornam a tarefa tão simples que a função não faz mais chamadas.

- Um [tipo recursivo](https://pt.wikipedia.org/wiki/Tipo_recursivo) é uma estrutura de dados que pode ser definida usando ela mesma.

   Por exemplo, a lista ligada pode ser definida como uma estrutura de dados que consiste em um objeto que faz referência a uma lista (ou null).

    ```js
    list = { value, next -> list }
    ```

    Árvores como a árvore de elementos HTML ou a árvore de departamentos vista nesse capítulo também são naturalmente recursivas: elas se ramificam e cada ramificação pode ter outras ramificações.

    Funções recursivas podem ser usadas para orientá-las, como vimos no exemplo `sumSalary`.

Qualquer função recursiva pode ser reescrita em uma iterativa. E isso às vezes é necessário para otimizar as coisas. Mas, para muitas tarefas, uma solução recursiva é rápida o suficiente e mais fácil de escrever e dar suporte.
