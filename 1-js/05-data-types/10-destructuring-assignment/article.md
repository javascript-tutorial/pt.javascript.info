# Atribuição de desestruturação

As duas estruturas de dados mais usadas em JavaScript são `Object` e `Array`.

- Objetos nos permitem criar uma única entidade que guarda itens de dados por chave.
- Arrays nos permitem agrupar itens de dados em uma lista ordenada.

Porém, quando passamos esses dados para uma função, nem sempre precisamos de tudo. A função pode precisar apenas de alguns elementos ou propriedades específicas.

*Atribuição de desestruturação* é uma sintaxe especial que nos permite "desempacotar" arrays ou objetos em um monte de variáveis, já que às vezes isso é mais conveniente.

A desestruturação também funciona muito bem com funções complexas, que têm muitos parâmetros, valores padrão, e por aí vai. Vamos ver isso em breve.

## Desestruturação de arrays

Aqui está um exemplo de como um array é desestruturado em variáveis:

```js
// temos um array com nome e sobrenome
let arr = ["John", "Smith"]

*!*
// atribuição de desestruturação
// define firstName = arr[0]
// e surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

Agora podemos trabalhar com variáveis em vez dos itens do array.

Fica ótimo quando combinado com `split` ou outros métodos que retornam arrays:

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

Como você pode ver, a sintaxe é simples. Porém, existem alguns detalhes curiosos. Vamos ver mais exemplos para entender melhor.

````smart header="\"Desestruturar\" não significa \"destruir\"."
Chama-se "atribuição de desestruturação" porque ela "desestrutura" o dado ao copiar seus itens para variáveis. No entanto, o array em si não é modificado.

É apenas uma forma mais curta de escrever:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Ignorando elementos usando vírgulas"
Elementos indesejados do array também podem ser descartados usando uma vírgula extra:

```js run
*!*
// o segundo elemento não é necessário
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

No código acima, o segundo elemento do array é pulado, o terceiro é atribuído a `title`, e o restante dos itens do array também é ignorado (já que não há variáveis para eles).
````

````smart header="Funciona com qualquer iterável do lado direito"

...Na verdade, podemos usar essa sintaxe com qualquer iterável, não só com arrays:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
Isso funciona porque, internamente, uma atribuição de desestruturação itera sobre o valor do lado direito. É um tipo de açúcar sintático para chamar `for..of` sobre o valor à direita do `=` e atribuir os valores.
````


````smart header="Atribua a qualquer coisa do lado esquerdo"
Podemos usar qualquer "atribuível" do lado esquerdo.

Por exemplo, uma propriedade de objeto:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

````smart header="Percorrendo com .entries()"
No capítulo anterior, vimos o método [Object.entries(obj)](mdn:js/Object/entries).

Podemos usá-lo com desestruturação para percorrer as chaves e valores de um objeto:

```js run
let user = {
  name: "John",
  age: 30
};

// percorre as chaves e valores
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, depois age:30
}
```

O código equivalente para um `Map` é mais simples, já que ele já é iterável:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// Map itera como pares [key, value], muito conveniente para desestruturação
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, depois age:30
}
```
````

````smart header="Truque para trocar variáveis de valor"
Existe um truque bem conhecido para trocar o valor de duas variáveis usando uma atribuição de desestruturação:

```js run
let guest = "Jane";
let admin = "Pete";

// Vamos trocar os valores: guest passa a ser Pete, admin passa a ser Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (trocado com sucesso!)
```

Aqui criamos um array temporário com as duas variáveis e imediatamente o desestruturamos na ordem trocada.

Dá pra trocar mais de duas variáveis dessa forma.
````

### O resto '...'

Normalmente, se o array é maior do que a lista do lado esquerdo, os itens "extras" são simplesmente omitidos.

Por exemplo, aqui só os dois primeiros itens são pegos, e o resto é ignorado:

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// Os demais itens não são atribuídos a lugar nenhum
```

Se quisermos também juntar tudo o que sobrou -- podemos adicionar mais um parâmetro que recolhe "o resto" usando três pontos `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
// rest é um array com os itens a partir do terceiro
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

O valor de `rest` é o array com os elementos restantes.

Podemos usar qualquer outro nome de variável no lugar de `rest`, só precisamos garantir que ele tenha três pontos antes e que venha por último na atribuição de desestruturação.

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// agora titles = ["Consul", "of the Roman Republic"]
```

### Valores padrão

Se o array for menor do que a lista de variáveis do lado esquerdo, não haverá erros. Os valores ausentes são considerados `undefined`:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Se quisermos um valor "padrão" para substituir o valor ausente, podemos fornecê-lo usando `=`:

```js run
*!*
// valores padrão
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (veio do array)
alert(surname); // Anonymous (usou o valor padrão)
```

Valores padrão podem ser expressões mais complexas, ou até mesmo chamadas de função. Eles só são avaliados se o valor não for fornecido.

Por exemplo, aqui usamos a função `prompt` para os dois valores padrão:

```js run
// roda o prompt apenas para surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (veio do array)
alert(surname); // o que o prompt retornar
```

Perceba: o `prompt` só vai rodar para o valor ausente (`surname`).

## Desestruturação de objetos

A atribuição de desestruturação também funciona com objetos.

A sintaxe básica é:

```js
let {var1, var2} = {var1:…, var2:…}
```

Devemos ter um objeto já existente do lado direito, que queremos dividir em variáveis. O lado esquerdo contém um "padrão" parecido com um objeto para as propriedades correspondentes. No caso mais simples, isso é só uma lista de nomes de variáveis dentro de `{...}`.

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

As propriedades `options.title`, `options.width` e `options.height` são atribuídas às variáveis correspondentes.

A ordem não importa. Isso também funciona:

```js
// mudamos a ordem em let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

O padrão do lado esquerdo pode ser mais complexo e especificar o mapeamento entre propriedades e variáveis.

Se quisermos atribuir uma propriedade a uma variável com outro nome, por exemplo, fazer `options.width` ir para a variável chamada `w`, podemos definir o nome da variável usando dois-pontos:

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

Os dois-pontos mostram "o quê : vai para onde". No exemplo acima, a propriedade `width` vai para `w`, a propriedade `height` vai para `h`, e `title` é atribuída a uma variável de mesmo nome.

Para propriedades que podem não existir, podemos definir valores padrão usando `"="`, assim:

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

Assim como acontece com arrays ou parâmetros de função, valores padrão podem ser qualquer expressão, ou até chamadas de função. Eles serão avaliados caso o valor não seja fornecido.

No código abaixo, o `prompt` pergunta por `width`, mas não por `title`:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (o que quer que o prompt retorne)
```

Também podemos combinar os dois-pontos com o sinal de igual:

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

Se tivermos um objeto complexo com muitas propriedades, podemos extrair só o que precisamos:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// extrai apenas title como uma variável
let { title } = options;

alert(title); // Menu
```

### O padrão de resto "..."

E se o objeto tiver mais propriedades do que temos variáveis? Dá pra pegar algumas e jogar "o resto" em outro lugar?

Podemos usar o padrão de resto, assim como fizemos com arrays. Ele não é suportado em alguns navegadores mais antigos (no IE, use o Babel para dar suporte), mas funciona nos navegadores modernos.

Fica assim:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = propriedade chamada title
// rest = objeto com o restante das propriedades
let {title, ...rest} = options;
*/!*

// agora title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="Pegadinha quando não há `let`"
Nos exemplos acima, as variáveis foram declaradas direto na atribuição: `let {…} = {…}`. Claro, também poderíamos usar variáveis já existentes, sem o `let`. Mas há uma pegadinha.

Isso não funciona:
```js run
let title, width, height;

// erro nessa linha
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

O problema é que o JavaScript trata `{...}` no fluxo principal do código (quando não está dentro de outra expressão) como um bloco de código. Esses blocos podem ser usados para agrupar comandos, assim:

```js run
{
  // um bloco de código
  let message = "Hello";
  // ...
  alert( message );
}
```

Então, nesse caso, o JavaScript assume que temos um bloco de código, por isso dá erro. Na verdade, queremos uma desestruturação.

Para mostrar ao JavaScript que não é um bloco de código, podemos envolver a expressão em parênteses `(...)`:

```js run
let title, width, height;

// agora funciona
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Desestruturação aninhada

Se um objeto ou array contém outros objetos e arrays aninhados dentro dele, podemos usar padrões do lado esquerdo mais complexos para extrair partes mais profundas.

No código abaixo, `options` tem outro objeto na propriedade `size` e um array na propriedade `items`. O padrão do lado esquerdo da atribuição tem a mesma estrutura, para extrair os valores de dentro deles:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// atribuição de desestruturação dividida em várias linhas, para ficar mais claro
let {
  size: { // coloca size aqui
    width,
    height
  },
  items: [item1, item2], // atribui items aqui
  title = "Menu" // não está presente no objeto (o valor padrão é usado)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

Todas as propriedades do objeto `options`, exceto `extra`, que não aparece na parte esquerda, são atribuídas às variáveis correspondentes:

![](destructuring-complex.svg)

No fim, temos `width`, `height`, `item1`, `item2` e `title` (esse último vindo do valor padrão).

Note que não há variáveis para `size` e `items`, já que pegamos o conteúdo deles diretamente.

## Parâmetros de função inteligentes

Às vezes uma função tem muitos parâmetros, e a maioria deles é opcional. Isso é especialmente comum em interfaces de usuário. Imagine uma função que cria um menu. Ela pode ter uma largura, uma altura, um título, uma lista de itens, e assim por diante.

Aqui está uma forma ruim de escrever essa função:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

Na prática, o problema é como lembrar a ordem dos argumentos. Normalmente as IDEs tentam nos ajudar, principalmente se o código estiver bem documentado, mas ainda assim... Outro problema é como chamar uma função quando a maioria dos parâmetros já está boa com o valor padrão.

Tipo assim?

```js
// undefined onde os valores padrão servem bem
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

Isso é feio. E fica ilegível quando lidamos com mais parâmetros.

A desestruturação vem para o resgate!

Podemos passar os parâmetros como um objeto, e a função imediatamente os desestrutura em variáveis:

```js run
// passamos um objeto para a função
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...e ela imediatamente o expande em variáveis
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – vêm de options,
  // width, height – usam o valor padrão
  alert( `${title} ${width} ${height}` ); // My menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

Também podemos usar uma desestruturação mais complexa, com objetos aninhados e mapeamento por dois-pontos:

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
  items: [item1, item2] // primeiro elemento de items vai para item1, segundo para item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

A sintaxe completa é a mesma de uma atribuição de desestruturação:
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

Assim, para um objeto de parâmetros, vai existir uma variável `varName` para a propriedade `incomingProperty`, com `defaultValue` como padrão.

Note que essa desestruturação assume que `showMenu()` recebe algum argumento. Se quisermos que todos os valores usem o padrão, devemos passar um objeto vazio:

```js
showMenu({}); // ok, todos os valores são o padrão

showMenu(); // isso daria erro
```

Podemos resolver isso fazendo `{}` ser o valor padrão de todo o objeto de parâmetros:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

No código acima, todo o objeto de argumentos é `{}` por padrão, então sempre vai ter algo para desestruturar.

## Resumo

- A atribuição de desestruturação permite mapear instantaneamente um objeto ou array em várias variáveis.
- A sintaxe completa para objetos:
    ```js
    let {prop : varName = defaultValue, ...rest} = object
    ```

    Isso significa que a propriedade `prop` deve ir para a variável `varName` e, se essa propriedade não existir, o valor `defaultValue` deve ser usado.

    Propriedades do objeto que não têm mapeamento são copiadas para o objeto `rest`.

- A sintaxe completa para arrays:

    ```js
    let [item1 = defaultValue, item2, ...rest] = array
    ```

    O primeiro item vai para `item1`, o segundo vai para `item2`, e todo o resto forma o array `rest`.

- É possível extrair dados de arrays/objetos aninhados; para isso, o lado esquerdo precisa ter a mesma estrutura do lado direito.
