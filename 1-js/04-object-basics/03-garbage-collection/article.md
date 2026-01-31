# Coleta de lixo

O gerenciamento de memória em JavaScript é realizado automaticamente e de forma invisível para nós. Criamos primitivos, objetos, funções... Tudo isso ocupa memória.

O que acontece quando algo não é mais necessário? Como o motor JavaScript descobre isso e limpa a memória?

## Alcançabilidade

O conceito principal do gerenciamento de memória em JavaScript é *alcançabilidade*.

Simplificando, valores "alcançáveis" são aqueles que são acessíveis ou utilizáveis de alguma forma. Eles têm garantia de permanecerem armazenados na memória.

1. Existe um conjunto base de valores inerentemente alcançáveis, que não podem ser deletados por razões óbvias.

    Por exemplo:

    - A função atualmente em execução, suas variáveis locais e parâmetros.
    - Outras funções na cadeia atual de chamadas aninhadas, suas variáveis locais e parâmetros.
    - Variáveis globais.
    - (existem algumas outras, internas também)

    Esses valores são chamados de *raízes*.

2. Qualquer outro valor é considerado alcançável se for alcançável a partir de uma raiz por uma referência ou por uma cadeia de referências.

    Por exemplo, se existe um objeto em uma variável global, e esse objeto tem uma propriedade referenciando outro objeto, *esse* objeto é considerado alcançável. E aqueles que ele referencia também são alcançáveis. Exemplos detalhados a seguir.

Existe um processo em segundo plano no motor JavaScript que é chamado de [coletor de lixo](https://pt.wikipedia.org/wiki/Coletor_de_lixo_(inform%C3%A1tica)). Ele monitora todos os objetos e remove aqueles que se tornaram inalcançáveis.

## Um exemplo simples

Aqui está o exemplo mais simples:

```js
// user tem uma referência ao objeto
let user = {
  name: "John"
};
```

![](memory-user-john.svg)

Aqui a seta representa uma referência a um objeto. A variável global `"user"` referencia o objeto `{name: "John"}` (vamos chamá-lo de John por brevidade). A propriedade `"name"` de John armazena um primitivo, então está pintada dentro do objeto.

Se o valor de `user` for sobrescrito, a referência é perdida:

```js
user = null;
```

![](memory-user-john-lost.svg)

Agora John se torna inalcançável. Não há como acessá-lo, não existem referências a ele. O coletor de lixo descartará os dados e liberará a memória.

## Duas referências

Agora vamos imaginar que copiamos a referência de `user` para `admin`:

```js
// user tem uma referência ao objeto
let user = {
  name: "John"
};

*!*
let admin = user;
*/!*
```

![](memory-user-john-admin.svg)

Agora se fizermos o mesmo:
```js
user = null;
```

...Então o objeto ainda é alcançável via a variável global `admin`, então ele deve permanecer na memória. Se sobrescrevermos `admin` também, então ele pode ser removido.

## Objetos interligados

Agora um exemplo mais complexo. A família:

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

A função `marry` "casa" dois objetos dando a eles referências um ao outro e retorna um novo objeto que contém ambos.

A estrutura de memória resultante:

![](family.svg)

Até agora, todos os objetos são alcançáveis.

Agora vamos remover duas referências:

```js
delete family.father;
delete family.mother.husband;
```

![](family-delete-refs.svg)

Não é suficiente deletar apenas uma dessas duas referências, porque todos os objetos ainda seriam alcançáveis.

Mas se deletarmos ambas, então podemos ver que John não tem mais nenhuma referência de entrada:

![](family-no-father.svg)

Referências de saída não importam. Apenas as de entrada podem tornar um objeto alcançável. Então, John agora é inalcançável e será removido da memória com todos os seus dados que também se tornaram inacessíveis.

Após a coleta de lixo:

![](family-no-father-2.svg)

## Ilha inalcançável

É possível que toda uma ilha de objetos interligados se torne inalcançável e seja removida da memória.

O objeto fonte é o mesmo de antes. Então:

```js
family = null;
```

A imagem na memória se torna:

![](family-no-family.svg)

Este exemplo demonstra quão importante é o conceito de alcançabilidade.

É óbvio que John e Ann ainda estão ligados, ambos têm referências de entrada. Mas isso não é suficiente.

O antigo objeto `"family"` foi desligado da raiz, não há mais referência a ele, então toda a ilha se torna inalcançável e será removida.

## Algoritmos internos

O algoritmo básico de coleta de lixo é chamado de "marcar-e-varrer" (*mark-and-sweep*).

Os seguintes passos de "coleta de lixo" são realizados regularmente:

- O coletor de lixo pega as raízes e as "marca" (lembra delas).
- Então ele visita e "marca" todas as referências a partir delas.
- Então ele visita os objetos marcados e marca *suas* referências. Todos os objetos visitados são lembrados, para não visitar o mesmo objeto duas vezes no futuro.
- ...E assim por diante até que todas as referências alcançáveis (a partir das raízes) sejam visitadas.
- Todos os objetos exceto os marcados são removidos.

Por exemplo, vamos supor que nossa estrutura de objetos se parece com isso:

![](garbage-collection-1.svg)

Podemos ver claramente uma "ilha inalcançável" no lado direito. Agora vamos ver como o coletor de lixo "marcar-e-varrer" lida com isso.

O primeiro passo marca as raízes:

![](garbage-collection-2.svg)

Então seguimos suas referências e marcamos os objetos referenciados:

![](garbage-collection-3.svg)

...E continuamos a seguir mais referências, enquanto possível:

![](garbage-collection-4.svg)

Agora os objetos que não puderam ser visitados no processo são considerados inalcançáveis e serão removidos:

![](garbage-collection-5.svg)

Também podemos imaginar o processo como derramar um enorme balde de tinta a partir das raízes, que flui através de todas as referências e marca todos os objetos alcançáveis. Os não marcados são então removidos.

Esse é o conceito de como a coleta de lixo funciona. Os motores JavaScript aplicam muitas otimizações para fazê-la rodar mais rápido e não introduzir atrasos na execução do código.

Algumas das otimizações:

- **Coleta geracional** -- objetos são divididos em dois conjuntos: "novos" e "velhos". Em código típico, muitos objetos têm uma vida curta: eles aparecem, fazem seu trabalho e morrem rápido, então faz sentido rastrear objetos novos e limpar a memória deles se for o caso. Aqueles que sobrevivem por tempo suficiente, se tornam "velhos" e são examinados com menos frequência.
- **Coleta incremental** -- se há muitos objetos, e tentamos percorrer e marcar todo o conjunto de objetos de uma vez, isso pode levar algum tempo e introduzir atrasos visíveis na execução. Então o motor divide todo o conjunto de objetos existentes em múltiplas partes. E então limpa essas partes uma após a outra. Há muitas pequenas coletas de lixo ao invés de uma total. Isso requer alguma contabilidade extra entre elas para rastrear mudanças, mas temos muitos pequenos atrasos ao invés de um grande.
- **Coleta em tempo ocioso** -- o coletor de lixo tenta executar apenas enquanto a CPU está ociosa, para reduzir o possível efeito na execução.

Existem outras otimizações e variantes de algoritmos de coleta de lixo. Por mais que eu gostaria de descrevê-las aqui, tenho que me conter, porque diferentes motores implementam diferentes ajustes e técnicas. E, o que é ainda mais importante, as coisas mudam conforme os motores se desenvolvem, então estudar mais a fundo "antecipadamente", sem uma necessidade real, provavelmente não vale a pena. A menos, é claro, que seja uma questão de puro interesse, então haverá alguns links para você abaixo.

## Resumo

As principais coisas a saber:

- A coleta de lixo é realizada automaticamente. Não podemos forçá-la ou preveni-la.
- Objetos são mantidos na memória enquanto são alcançáveis.
- Ser referenciado não é o mesmo que ser alcançável (a partir de uma raiz): um conjunto de objetos interligados pode se tornar inalcançável como um todo, como vimos no exemplo acima.

Motores modernos implementam algoritmos avançados de coleta de lixo.

Um livro geral "The Garbage Collection Handbook: The Art of Automatic Memory Management" (R. Jones et al) cobre alguns deles.

Se você está familiarizado com programação de baixo nível, informações mais detalhadas sobre o coletor de lixo do V8 estão no artigo [A tour of V8: Garbage Collection](https://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

O [blog do V8](https://v8.dev/) também publica artigos sobre mudanças no gerenciamento de memória de tempos em tempos. Naturalmente, para aprender mais sobre coleta de lixo, é melhor se preparar aprendendo sobre os internos do V8 em geral e ler o blog de [Vyacheslav Egorov](https://mrale.ph) que trabalhou como um dos engenheiros do V8. Estou dizendo: "V8", porque é o melhor coberto por artigos na internet. Para outros motores, muitas abordagens são similares, mas a coleta de lixo difere em muitos aspectos.

Conhecimento profundo dos motores é bom quando você precisa de otimizações de baixo nível. Seria sábio planejar isso como o próximo passo depois que você estiver familiarizado com a linguagem.
