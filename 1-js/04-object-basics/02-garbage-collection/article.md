# *Garbage collection*

A gestão de memória em JavaScript é feita automaticamente, e é invisível para nós. Nós criamos primitivos, objetos, funções... Tudo o que ocupa memória.

O que acontece quando algo não mais é necessário? Como o interpretador de JavaScript (*JavaScript engine*) o descobre e o limpa?

## Acessibilidade

O principal conceito para gestão de memória em JavaScript é o de *acessibilidade* (*reachability*).

Simplesmente dito, valores "acessíveis" (reachable) são aqueles que de alguma forma podem ser acedidos ou utilizados. Eles têm a garantia de poderem estar armazenados em memória.

1. Existe um conjunto básico de valores inerentemente acessíveis, que não podem ser apagados por razões óbvias.

    Por exemplo:

    - Variáveis locais e parâmetros da função atual.
    - Variáveis e parâmetros para outras funções, na atual cadeia de chamadas aninhadas (*nested calls*).
    - Variáveis globais.
    - (existem outros, incluindo internos)

    Estes valores são chamados de *raízes* (*roots*).

2. Qualquer outro valor é considerado acessível, se puder ser acedido a partir de um valor *root* por meio de uma referência ou cadeia de referências.

    Por exemplo, se existir um objeto numa variável local, e esse objeto tiver uma propriedade a referenciar um outro objeto, este objeto é considerado acessível. E aqueles que ele referenciar também o são. Exemplos detalhados a seguir.

Existe um processo de fundo (*background process*) no interpretador de (*JavaScript  engine)* chamado de [garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) (coletor de lixo). Ele monitora todos os objetos e remove aqueles que se tornaram inacessíveis.

## Um simples exemplo

Aqui está o mais simples exemplo:

```js
// 'user' tem uma referência para um objeto
let user = {
  name: "John"
};
```

![](memory-user-john.svg)

Aqui, a seta mostra uma referência para um objeto. A variável global `"user"` referencia o objeto `{name: "John"}` (o chamaremos de John para abreviar). A propriedade `"name"` de John armazena um primitivo, por isso é pintada dentro do objeto.

Se o valor de `user` for substituído, a referência é perdida:

```js
user = null;
```

![](memory-user-john-lost.svg)

Agora, John torna-se inalcançável. Não há forma de o aceder, nenhuma referência para ele. O coletor de lixo (*garbage collector*) porá os dados na lixeira e libertará a memória.

## Duas referências

Agora, vamos imaginar que copiamos a referência de `user` para `admin`:

```js
// 'user' tem uma referência para o objeto
let user = {
  name: "John"
};

*!*
let admin = user;
*/!*
```

![](memory-user-john-admin.svg)

Agora, se fizermos o mesmo:

```js
user = null;
```

...Aí, o objeto ainda pode ser acedido pela variável global `admin`, por isso continua em memória. Se também atribuirmos outro valor a `admin`, então ele pode ser removido.

## Objetos interligados

Agora, um exemplo mais complexo. A familia:

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

A função `marry` "casa" dois objetos dando referências um ao outro, e retorna um novo objeto que contém ambos.

A estrutura de memória resultante:

![](family.svg)

Por ora, todos os objetos são alcançáveis.

Agora, vamos remover duas referências:

```js
delete family.father;
delete family.mother.husband;
```

![](family-delete-refs.svg)

Não é suficiente eliminar apenas uma dessas duas referências, porque todos os objetos ainda estariam acessíveis.

Mas se eliminarmos ambas, então poderemos ver que John já não tem nenhuma referência de entrada (*incoming*):

![](family-no-father.svg)

Referências de saída (*outgoing*) não interessam. Apenas as de entrada (*incoming*) podem tornar um objeto acessível. Portanto, John está agora inacessível e será removido da memória, com todos os seus dados por também se tornarem inacessíveis.

Após uma coleta de lixo (*garbage collection*):

![](family-no-father-2.svg)

## Ilha inacessível

É possível que toda a ilha de objetos interligados se torne inacessível e seja removida da memória.

Tendo o mesmo objeto fonte de acima. Se:

```js
family = null;
```

A imagem da memória se torna:

![](family-no-family.svg)

Este exemplo demonstra o quão importante é o conceito de acessibilidade.

É óbvio que John e Ann ainda estão conetados, ambos têm referências de entrada (*incoming*). Mas, isso não é o suficiente.

O anterior objeto `"family"` foi desconetado de *root*, não mais existe alguma referência para ele, assim toda a ilha se torna inalcançável e será removida.

## Algoritmos internos

O  algoritmo básico de coleta de lixo (*garbage collection*) é chamado de "*mark-and-sweep*" (marcar-e-varrer).

Os passos seguintes para "coleta de lixo" são executados periódicamente:

- O coletor de lixo (*garbage collector*) colhe raízes (*roots*) e as "marca" (recorda-se delas).
- Depois, visita e "marca" (*marks*) todas as referências que elas efetuem.
- A seguir, ele visita objetos marcados e marca as *suas* referências. Todos os objetos visitados são recordados, para não visitar o mesmo objeto no futuro.
- ...E assim por diante, até não houver referências não visitadas (que possam ser alcançáveis a partir das *roots*).
- Todos os objetos, exceto os marcados, são removidos.

Por exemplo, se a nossa estrutura de objetos se parecer a esta:

![](garbage-collection-1.svg)

Claramente, observamos uma "ilha inacessível" no lado direito. Agora, vamos ver como o *garbage collector* "*mark-and-sweep*" lida com ela.

O primeiro passo, as raízes (*roots*):

![](garbage-collection-2.svg)

As suas referências são marcadas:

![](garbage-collection-3.svg)

...E as referências destas, o quanto possível:

![](garbage-collection-4.svg)

Agora, os objetos que não puderam ser visitados no processo são considerados inalcançáveis e serão removidos:

![](garbage-collection-5.svg)

Esse, é o conceito de como funciona a coleta de lixo (*garbage collection*).

Interpretadores de JavaScript (*JavaScript engines*) aplicam muitas optimizações para a fazer correr mais rapidamente, e não afetar a execução do programa.

Algumas das optimizações:

- **Generational collection** (coleta geracional) -- objetos são separados em dois grupos: "novos" e "velhos". Muitos objetos aparecem, fazem o seu trabalho e terminam depressa, eles podem ser limpos agressivamente. Aqueles que sobrevivem por mais tempo, tornam-se "velhos" e são examinados com menos frequência.
- **Incremental collection** (coleta incremental) -- se existirem muitos objetos, e tentarmos percorrer e marcar todo o conjunto de uma só vez, pode levar algum tempo e introduzir notáveis atrasos na execução do programa. Assim, o interpretador (*engine*) tentar particionar a coleta de lixo (*garbage collection*) em pedaços. Então, os pedaços são executados um por um, separadamente. Isso, requere alguma anotação (*bookkeeping*) extra entre eles para rastrear alterações, mas temos muitos pequeninos atrasos em vez de um único grande.
- **Idle-time collection** (coleta no tempo ocioso) -- o coletor de lixo (*garbage collector*) tenta apenas correr quando o CPU estiver parado, para reduzir possíveis efeitos sobre a execução do programa.

Existem outras optimizações e sabores de algoritmos para coleta de lixo (*garbage collection*). Embora gostasse de os descrever aqui, tenho de parar porque interpretadores (*engines*) diferentes implementam diferentes adaptações (*tweaks*) e técnicas. E, mais importante ainda, as coisas mudam à medida que interpretadores evoluem, assim envolver-se "adiantadamente", sem uma necessidade real provavelmente não vale o esforço. A não ser, claro, por puro interesse, e para isso haverão alguns links para si abaixo.

## Sumário

As principais coisas a saber:

- A coleta de lixo é executada automaticamente. Não a podemos forçar ou evitar.
- Objetos são retidos em memória enquanto forem acessíveis.
- Ser referenciado não é o mesmo que poder ser acedido (a partir de uma raíz): um grupo de objetos interligados pode se tornar inacessível no seu todo.

Interpretadores modernos implementam algoritmos avançados para a coleta de lixo.

O livro geral "The Garbage Collection Handbook: The Art of Automatic Memory Management" (R. Jones et al), cobre alguns deles.

Se tiver familiaridade com programação a baixo-nível, mais detalhada informação sobre o coletor de lixo V8 encontra-se no artigo [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

O [V8 blog](http://v8project.blogspot.com/) também publica artigos sobre alterações na gestão de memória de tempos em tempos. Naturalmente, para aprender sobre a coleta de lixo, seria melhor preparar-se para aprender sobre o funcionamento interno do V8 em geral, e ler o blog de [Vyacheslav Egorov](http://mrale.ph) que trabalhou como um dos engenheiros do V8. Digo: "V8", porque é o que contém melhores artigos na internet. Para outros interpretadores, muitas abordagens são similares, porém a coleta de lixo difere em muitos aspetos.

Conhecimento aprofundado sobre interpretadores é bom quando precisar de optimizações a baixo-nível. Seria sábio planear isso como próximo passo, após familiaridade com a linguagem.  
