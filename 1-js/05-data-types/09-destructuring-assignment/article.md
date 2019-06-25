# Atribuição de desestruturação

As duas estruturas de dados mais usadas no JavaScript são `Object` e `Array`.

Objetos nos permitem criar uma única entidade que armazena itens de dados por chave, e arrays nos permitem reunir itens de dados em uma coleção ordenada.

Mas quando os passamos para uma função, ela pode não precisar de um objeto/array como um todo, mas de peças individuais.

*Atribuição de desestruturação* é uma sintaxe especial que nos permite "descompactar" arrays ou objetos em um monte de variáveis, pois às vezes é mais conveniente. A desestruturação também funciona muito bem com funções complexas que possuem muitos parâmetros, valores padrão e assim por diante.

## Desestruturação de array

Um exemplo de como o array é desestruturado em variáveis:

```js
// temos um array com o nome e sobrenome
let arr = ["Ilya", "Kantor"]

*!*
// atribuição de desestruturação
// define firstName = arr[0]
// e surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // Ilya
alert(surname);  // Kantor
```

Agora podemos trabalhar com variáveis ​​em vez de membros do array.

É ótimo quando combinado com `split` ou outros métodos de retorno de array:

```js
let [firstName, surname] = "Ilya Kantor".split(' ');
```

````smart header="\"Desestruturação\" não significa \"destrutivo\"."
É chamado de "atribuição de desestruturação", porque "desestrutura" copiando itens em variáveis. Mas o array em si não é modificado.

É apenas uma maneira mais curta de escrever:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Ignorar elementos usando vírgulas"
Elementos indesejados do array também podem ser descartados por uma vírgula extra:

```js run
*!*
// segundo elemento não é necessário
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

No código acima, o segundo elemento do array é ignorado, o terceiro é atribuído a `title` e o restante dos itens do array também é ignorado (pois não há variáveis ​​para eles).
````

````smart header="Funciona com qualquer iterável no lado direito "

...Na verdade, podemos usá-lo com qualquer iterável, não apenas arrays:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

````


````smart header="Atribuir a qualquer coisa no lado esquerdo"

Podemos usar quaisquer "atribuíveis" no lado esquerdo.

Por exemplo, uma propriedade de objeto:
```js run
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');

alert(user.name); // Ilya
```

````

````smart header="Fazendo um loop com .entries()"

No capítulo anterior vimos o método [Object.entries(obj)](mdn:js/Object/entries).

Podemos usá-lo com a desestruturação para fazer um loop sobre chaves e valores de um objeto:

```js run
let user = {
  name: "John",
  age: 30
};

// loop sobre chaves e valores
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, então age:30
}
```

...E o mesmo para um map:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, então age:30
}
```
````
### O rest '...'

Se quisermos não apenas obter os primeiros valores, mas também coletar tudo o que segue - podemos adicionar mais um parâmetro que obtém "o resto" usando três pontos `" ... "`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

alert(name1); // Julius
alert(name2); // Caesar

*!*
// Observe que o tipo de `rest` é Array.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

O valor de `rest` é o array dos demais elementos do array. Nós podemos usar qualquer outro nome de variável no lugar de `rest`, apenas tenha certeza de que ele tenha três pontos antes dele e vá por último na atribuição de desestruturação.

### Valores padrão

Se houver menos valores no array do que variáveis ​​na atribuição, não haverá erro. Os valores ausentes são considerados undefined:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Se quisermos que um valor "padrão" substitua o que falta, podemos fornecê-lo usando `=`:

```js run
*!*
// default values
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (do array)
alert(surname); // Anonymous (padrão usado)
```

Valores padrão podem ser expressões mais complexas ou até mesmo chamadas de função. Eles são avaliados apenas se o valor não for fornecido.

Por exemplo, aqui usamos a função `prompt` para dois padrões. Mas será executado apenas pelo ausente:

```js run
// executa apenas o prompt do sobrenome
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (do array)
alert(surname); // será o que o prompt recebeu
```



## Desestruturação de objetos

A atribuição de desestruturação também funciona com objetos.

A sintaxe básica é:

```js
let {var1, var2} = {var1:…, var2…}
```

Temos um objeto existente no lado direito, que queremos dividir em variáveis. O lado esquerdo contém um "padrão" para as propriedades correspondentes. No caso simples, é uma lista de nomes de variáveis ​​em `{...}`.

Por exemplo:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Propriedades `options.title`, `options.width` e `options.height` são atribuídas as variáveis correspondentes. A ordem não importa. Isso funciona também:

```js
// mudada a ordem em let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

O padrão no lado esquerdo pode ser mais complexo e especificar o mapeamento entre propriedades e variáveis.

Se quisermos atribuir uma propriedade a uma variável com outro nome, por exemplo, `options.width` para ir para a variável chamada `w`, então podemos configurá-la usando dois pontos:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Os dois pontos mostram "o que: vai para onde". No exemplo acima, a propriedade `width` vai para `w`, a propriedade `height` vai para `h` e `title` é atribuído ao mesmo nome.

Para propriedades potencialmente ausentes, podemos definir valores padrão usando `"="`, desta forma:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Assim como com arrays ou parâmetros de função, os valores padrão podem ser quaisquer expressões ou mesmo chamadas de função. Eles serão avaliados se o valor não for fornecido.

O código abaixo pede largura, mas não o título.

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (será o resultado de prompt)
```

Também podemos combinar ambos os dois pontos e a igualdade:

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

### O padrão rest "..."

E se o objeto tiver mais propriedades do que temos variáveis? Podemos pegar algumas e depois atribuir o "rest" em algum lugar?

Podemos usar o padrão rest, assim como fizemos com arrays. Não é suportado por alguns navegadores mais antigos (IE, use o Babel para polyfill), mas funciona nos mais modernos.

Se parece com isso:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = propriedade chamada title
// rest = objeto com o resto das propriedades
let {title, ...rest} = options;
*/!*

// agora title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```



````smart header="Pegadinha se não há `let`"
Nos exemplos acima, as variáveis ​​foram declaradas na atribuição: `let {…} = {…}`. Claro, poderíamos usar variáveis ​​existentes também, sem `let`. Mas há uma pegadinha.

Isso não vai funcionar:
```js run
let title, width, height;

// erro nesta linha
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

O problema é que JavaScript trata `{...}` no fluxo de código principal (não dentro de outra expressão) como um bloco de código. Esses blocos de código podem ser usados ​​para agrupar instruções, assim:

```js run
{
  // um bloco de código
  let message = "Hello";
  // ...
  alert( message );
}
```

Para mostrar JavaScript que não é um bloco de código, podemos torná-lo parte de uma expressão envolvendo entre parênteses `(...)`:

```js run
let title, width, height;

// agora está ok
*!*(*/!*{title, width, height}*!*)*/!* = {title: "Menu", width: 200, height: 100};

alert( title ); // Menu
```

````

## Desestruturação aninhada

Se um objeto ou um array contiver outros objetos e arrays, podemos usar padrões mais complexos do lado esquerdo para extrair partes mais profundas.

No código abaixo, `options` tem outro objeto na propriedade `size` e um array na propriedade `items`. O padrão no lado esquerdo da tarefa tem a mesma estrutura:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true    // algo extra que não vamos desestruturar
};

// atribuição de desestruturação dividido em várias linhas para maior clareza
let {
  size: { // coloque o tamanho aqui
    width,
    height
  },
  items: [item1, item2], // atribua os itens aqui
  title = "Menu" // não presente no objeto (valor padrão é usado)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

Todo o objeto `options`, exceto `extra` que não foi mencionado, é atribuído às variáveis ​​correspondentes.

Note que `size` e `items` não são desestruturados.

![](destructuring-complex.png)

Finalmente, temos `width`, `height`, `item1`, `item2` e `title` do valor padrão.

Se tivermos um objeto complexo com muitas propriedades, podemos extrair apenas o que precisamos:

```js
// toma size como um todo em uma variável, ignore o resto
let { size } = options;
```

## Parâmetros da função inteligentes

Há momentos em que uma função tem muitos parâmetros, a maioria dos quais são opcionais. Isso é especialmente verdadeiro para interfaces de usuário. Imagine uma função que cria um menu. Pode ter uma largura, uma altura, um título, lista de itens e assim por diante.

Aqui está uma maneira ruim de escrever essa função:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

Na vida real, o problema é como lembrar a ordem dos argumentos. Normalmente os IDEs tentam nos ajudar, especialmente se o código é bem documentado, mas ainda assim... Outro problema é como chamar uma função quando a maioria dos parâmetros está ok por padrão.

Tipo isso?

```js
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

Isso é feio E se torna ilegível quando lidamos com mais parâmetros.

Desestruturação vem para o resgate!

Podemos passar parâmetros como um objeto e a função destrói-os imediatamente em variáveis:

```js run
// passamos o objeto para a função
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ... e imediatamente expande para variáveis
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – pegos de options,
  // width, height – usados os padrões
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

Também podemos usar uma desestruturação mais complexa com objetos aninhados e mapeamentos de dois pontos:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width vai para w
  height: h = 200, // height vai para h
  items: [item1, item2] // o primero elemento de items vai para item1, o segundo para item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

A sintaxe é a mesma que para uma atribuição de desestruturação:
```js
function({
  incomingProperty: parameterName = defaultValue
  ...
})
```

Por favor note que tal desestruturação assume que `showMenu()` tem um argumento. Se queremos todos os valores por padrão, então devemos especificar um objeto vazio:

```js
showMenu({});


showMenu(); // isso daria um erro
```

Podemos consertar isso tornando `{}` o valor padrão para a coisa toda de desestruturação:


```js run
// parâmetros simplificados um pouco para maior clareza
function showMenu(*!*{ title = "Menu", width = 100, height = 200 } = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

No código acima, todo o objeto arguments é `{}` por padrão, então sempre há algo para desestruturar.

## Resumo

- Atribuição de desestruturação permite mapear instantaneamente um objeto ou array em muitas variáveis.
- A sintaxe do objeto:
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    Isto significa que a propriedade `prop` deve ir para a variável `varName` e, se tal propriedade não existe, então o valor `default` deve ser usado.

    As propriedades do objeto que não possuem mapeamento são copiadas para o objeto `rest`.

- A sintaxe de array:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    O primeiro item vai para `item1`; o segundo vai para o `item2`, todo o resto faz o array `rest`.

- Para casos mais complexos, o lado esquerdo deve ter a mesma estrutura do lado direito.
