
# Objetos

Como sabemos, pelo capítulo <info:types>, existem oito tipos de dados em JavaScript. Sete deles são chamados de "primitivos", porque os seus valores apenas contêm uma única coisa (seja ela uma cadeia-de-carateres [*string*], um número, ou outra).

Em contraste, objetos são usados para armazenar, por meio de uma chave, coleções de vários dados e entidades mais complexas. Em JavaScript, os objetos penetram em quase todos os aspetos da linguagem. Portanto, devemos primeiro os compreender antes de nos envolver com detalhe em algo mais.

Um objeto pode ser criado por chavetas `{…}`, com uma lista opcional de *propriedades*. Uma propriedade é um par "key: value" (chave: valor), onde `key` é uma *string* (também chamada de "nome da propriedade"), e `value` pode ser qualquer coisa.

Podemos imaginar um objeto como um fichário com ficheiros assinados. Cada peça de informação, é armazenada no seu ficheiro por meio de uma chave. É fácil quer encontrar um ficheiro através do seu nome, como adicionar/remover um ficheiro.

![](object.svg)

Um objeto vazio ("fichário vazio"), pode ser criado por uma destas duas sintaxes:

```js
let user = new Object(); // sintaxe de "construtor de objetos"
let user = {};  // sintaxe de "objeto literal"
```

![](object-user-empty.svg)

Geralmente, são utilizadas as chavetas `{...}`. Essa declaração é chamada de *objeto literal*.

## Literais e propriedades

Podemos imediatamente colocar algumas propriedades dentro das `{...}` como pares "chave: valor":

```js
let user = {     // um objeto
  name: "John",  // na chave "name" armazene o valor "John"
  age: 30        // na chave "age" armazene o valor 30
};
```

Uma propriedade tem uma chave (também conhecida por "nome" ou "identificador") antes dos dois-pontos `":"` e um valor à sua direita.

No objeto `user`, existem duas propriedades:

1. A primeira, tem o nome `"name"` e o valor `"John"`.
2. A segunda, tem o nome `"age"` e o valor `30`.

O objeto `user` resultante, pode ser imaginado como um fichário com dois ficheiros assinados com as etiquetas "*name*" e "*age*".

![user object](object-user.svg)

Podemos adicionar, remover ou ler ficheiros dele em qualquer momento.

Valores de propriedades podem ser acedidos usando a notação por ponto (*dot notation*):

```js
// obtenha os valores das propriedades do objeto:
alert( user.name ); // John
alert( user.age ); // 30
```

O valor pode ser de qualquer tipo. Vamos adicionar um booleano:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

Para remover uma propriedade, podemos usar o operador `delete`:

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

Podemos também usar nomes de propriedades com múltiplas palavras, mas aí eles têm de estar entre aspas:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // o nome de propriedade com múltiplas palavras tem de estar entre aspas
};
```

![](object-user-props.svg)

A última propriedade da lista pode terminar com uma vírgula:

```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```

Esta é chamada de vírgula à direita (*trailing comma*) ou "vírgula pendurada" (*hanging comma*). Ela facilita o adicionar/remover/mover propriedades, porque todas as linhas se tornam semelhantes.

````smart header="Objeto com const pode ser alterado"
Por favor, note: um objeto declarado como `const` *pode* ser modificado.

Por exemplo:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

Poderá parecer que a linha `(*)` irá causar um erro, mas não. A `const` fixa o valor de `user`, mas não o seu conteúdo.

A `const` dará um erro apenas se tentarmos mudar `user=...` como um todo.

Há outra forma para tornar constantes as propriedades de um objeto, que iremos ver mais adiante no capítulo <info:property-descriptors>.
````

## Parênteses retos

Para propriedades com múltiplas palavras, o acesso por ponto não funciona:

```js run
// isto daria um erro de sintaxe
user.likes birds = true
```

JavaScript não compreende isso. Pensa que acedemos a `user.likes`, e depois fornece um erro de sintaxe quando encontra a inesperada `birds`.

O ponto requere que a chave seja um identificador de variável válido. Isso implica: que não contenha espaços, não comece por um dígito e não inclua carateres especiais (`$` e `_` são permitidos).

Existe uma alternativa, a "notação por parênteses retos", que funciona com qualquer *string*:

```js run
let user = {};

// cria
user["likes birds"] = true;

// lê
alert(user["likes birds"]); // true ('verdadeiro')

// remove
delete user["likes birds"];
```

Agora, tudo está bem. Por favor, verifique se a *string* dentro dos parênteses retos está adequadamente encerrada entre aspas (qualquer tipo de aspas serve).

Os parênteses retos também fornecem uma forma de se obter o nome de uma propriedade, tomado de uma expressão -- em vez de uma *string* literal  -- como a partir de uma variável, por exemplo:

```js
let key = "likes birds";

// o mesmo que 'user["likes birds"] = true;'
user[key] = true;
```

Aqui, a variável `key` pode ser calculada em tempo de execução (*run-time*) ou depender de uma entrada pelo utilizador (*user input*). E depois a usamos para aceder à propriedade. Isso, dá-nos um grande grau de flexibilidade.

Por exemplo:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("O que quer saber acerca do utilizador?", "name");

// aceda à variável
alert( user[key] ); // John (se a entrada tiver sido "name")
```

A notação por ponto não pode ser usada de forma semelhante:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### Propriedades computadas

Podemos utilizar os parênteses retos num object literal, ao criarmos o objeto. Chamam-se de *propriedades computadas*.

Por exemplo:

```js run
let fruit = prompt("Que fruta comprar?", "apple");

let bag = {
*!*
  [fruit]: 5, // o nome da propriedade é obtido por meio da variável 'fruit'
*/!*
};

alert( bag.apple ); // 5 se fruit="apple"
```

O significado de uma propriedade computada é simples: `[fruit]` diz que o nome da propriedade é o valor em `fruit`.

Assim, se um visitante inserir `"apple"`, `bag` se tornará em `{apple: 5}`.

Essencialmente, isso é o mesmo que:

```js run
let fruit = prompt("Que fruta comprar?", "apple");
let bag = {};

// obtenha o nome da propriedade por meio da variável fruit
bag[fruit] = 5;
```

...Mas, com  melhor apresentação.

Podemos usar expressões mais complexas dentro dos parênteses retos:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

Parênteses retos, são mais poderosos que a notação por ponto. Eles permitem quaisquer nomes de propriedades e variáveis. Mas, eles também dão mais trabalho para escrever.

Assim, a maior parte as vezes, quando nomes de propriedades são conhecidos e simples, o ponto é utilizado. E, se precisarmos de algo mais complexo, mudamos para os parênteses retos.

## Abreviação do valor da propriedade

Em código real, muitas vezes usamos nomes de propriedades e nomes de variáveis iguais.

Por exemplo:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age
    // ...outras propriedades
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

No exemplo acima, propriedades têm os mesmos nomes que as variáveis. O caso prático (*use-case*) de construir uma propriedade com base numa variável é tão comum, que existe uma especial *abreviação do valor da propriedade* (*property value shorthand*) para a tornar mais curta.

Em vez de `name:name`, podemos simplesmente escrever `name`, como abaixo:

```js
function makeUser(name, age) {
*!*
  return {
    name, // o mesmo que name: name
    age   // o mesmo que age: age
    // ...
  };
*/!*
}
```

Podemos empregar ambas, as propriedades normais e as abreviações (*shorthands*), no mesmo objeto:

```js
let user = {
  name,  // o mesmo que name:name
  age: 30
};
```

## Limitações dos nomes de propriedades

Como já sabemos, uma variável não pode ter um nome igual a uma palavra reservada da linguagem, como "for", "let", "return" etc.

Mas, para propriedades de objetos não há tal restrição.

```js run
// estas propriedades são válidas
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

Em resumo, não existem limitações para os nomes de propriedades. Eles podem ser quaisquer *strings* ou símbolos (um tipo especial de  identificadores, a ser visto mais adiante).

Outros tipos são automáticamente convertidos para *strings*.

Por exemplo, um número `0` se torna na *string* `"0"`, quando usado como chave de propriedade:

```js run
let obj = {
  0: "teste" // o mesmo que "0": "teste"
};

// ambos os 'alerts' acedem à mesma propriedade (o número 0 é convertido para a string "0")
alert( obj["0"] ); // teste
alert( obj[0] ); // teste (a mesma propriedade)
```

Existe um pequeno senão com uma propriedade especial chamada `__proto__`. Não pode ter um valor não-objeto.

```js run
let obj = {};
obj.__proto__ = 5; // atribua um número
alert(obj.__proto__); // [object Object] - o valor é um objeto, não funcionou como esperado
```

Como vemos pelo código, a atribuição do primitivo `5` é ignorada.

Vamos analisar a natureza especial de `__proto__` em [subsequent chapters](info:prototype-inheritance) (capítulos subsequentes), e sugerir [ways to fix](info:prototype-methods) (formas de correção) de tal comportamento.

## Teste de existência da propriedade, o operador "in"

Uma particularidade notável de objetos em JavaScript, em comparação a outras linguagens, é que é possível aceder a qualquer propriedade. Não haverá erro se a propriedade não existir!

Aceder a uma propriedade não-existente apenas retorna `undefined`. Assim, podemos fácilmente testar se uma propriedade existe:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true, significa que é uma "propriedade não existente" (no such property)
```

Também existe o operador especial `"in"`, para isso.

A sintaxe é:

```js
"key" in object
```

Por exemplo:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, 'user.age' existe
alert( "blabla" in user ); // false, 'user.blabla' não existe
```

Por favor, note que no lado esquerdo de `in` deve existir um *nome de propriedade*. Geralmente, é uma *string* entre aspas.

Se omitirmos as aspas, isso terá o significado de uma variável que contém o nome a ser testado. Por exemplo:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, a propriedade 'key' existe
```

Porque o operador `in` existe? Não é suficiente comparar a `undefined`?

A maior parte das vezes comparar a `undefined` funciona bem. Mas há um caso especial em que falha, mas `in` funciona corretamente.

É quando uma propriedade de objeto existe, mas está nela armazenada `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // é 'undefined', então - não existe essa  propriedade?

alert( "test" in obj ); // true (verdadeiro), a propriedade na realidade existe!
```

No código acima, a propriedade `obj.test` tecnicamente existe. Assim, o operador `in` funciona corretamente.

Situações como esta muito raramente ocorrem, porque `undefined` não deveria ser explicitamente atribuído. Em geral, empregamos `null` para valores "desconhecidos" ou "vazios". Assim, o operador `in` é um convidado exótico na codificação.

## O laço "for..in"

Para navegar por todas as chaves (*keys*) de um objeto, existe uma forma especial de laço (*loop*): `for..in`. Esta, é uma construção completamente diferente da do `for(;;)`, que estudámos antes.

A sintaxe:

```js
for (key in object) {
  // executa o corpo do laço, por cada chave nas propriedades do objeto
}
```

Por exemplo, vamos imprimir todas propriedades de  `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // chave
  alert( key );  // 'name', 'age', isAdmin'
  // valor por chave
  alert( user[key] ); // John, 30, true
}
```

Note, que todas as construções "for" nos permitem declarar a variável do laço dentro do *loop*, como `let key` aqui.

De igual modo, poderíamos usar aqui um nome de variável diferente de `key`. Por exemplo, `"for (let prop in obj)"` também é largamente utilizado.

### Ordenado como um objeto

Os objetos são ordenados? Por outras palavras, se percorrermos um objeto com um laço, será que obtemos todas as propriedades pela mesma ordem em que foram adicionadas? Poderemos confiar nisso?

A curta resposta é: "ordenados de um modo especial" - propriedades inteiras são ordenadas de forma crescente, outras aparecem na ordem em que foram criadas. Detalhes a seguir.

Como exemplo, vamos considerar um objeto com indicativos telefónicos de países:

```js run
let codes = {
  "49": "Alemanha",
  "41": "Suíça",
  "44": "Grã Bretanha",
  // ..,
  "1": "EUA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

O objeto pode ser usado como sugestão, para uma lista de opções para o utilizador. Se, estivermos a construir um *site* maioritariamente para uma audiência Alemã, então provavelmente queremos `49` como o primeiro.

Mas, ao correr o código, vemos uma imagem totalmente diferente:

- EUA (1) vem em primeiro lugar,
- depois a Suíça (41), e assim por adiante.

Os indicativos telefónicos, são ordenados por ordem ascendente, porque são inteiros. Por isso, vemos `1, 41, 44, 49`.

````smart header="Propriedades inteiras? O que é isso?"
O termo "propriedade inteira" aqui, significa que uma *string* pode ser convertida para inteiro ('integer'), e reconvertida de volta sem qualquer alteração.

Assim, "49" é um nome de propriedade inteiro porque, ao ser transformado num número inteiro e reconvertido de volta, continua o mesmo. Mas, "+49" e "1.2" não são:

```js run
// Math.trunc é uma função incorporada (*built-in function*) que remove a parte decimal

alert( String(Math.trunc(Number("49"))) ); // "49", inalterado ⇒ propriedade inteira

alert( String(Math.trunc(Number("+49"))) ); // "49", não o mesmo que "+49" ⇒ não é uma propriedade inteira

alert( String(Math.trunc(Number("1.2"))) ); // "1", não o mesmo que "1.2" ⇒ não é uma propriedade inteira
```
````

...Por outro lado, se as chaves forem não-inteiras, elas são listadas segundo a ordem em que foram criadas, por exemplo:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // adicione mais uma propriedade

*!*
// propriedades não-inteiras são listadas segundo a ordem em que foram criadas
*/!*
for (let prop in user) {
  alert( prop ); // 'name', 'surname', 'age'
}
```

Portanto, para corrigir o problema dos indicativos telefónicos, podemos "enganar" tornando-os não-inteiros. Adicionar um sinal de mais `"+"` antes de cada código é o suficiente.

Desta forma:

```js run
let codes = {
  "+49": "Alemanha",
  "+41": "Suiça",
  "+44": "Grã Bretanha",
  // ..,
  "+1": "EUA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Agora, funciona como pretendido.

## Resumo

Objetos são *arrays* associativos (*associative arrays*), com várias funcionalidades especiais.

Eles armazenam propriedades (pares chave-valor), onde:

- As chaves das propriedades devem ser *strings* ou símbolos (geralmente *strings*).
- Os valores podem ser de qualquer tipo.

Para aceder a uma propriedade, podemos utilizar:

- A notação por ponto: `obj.property`.
- A notação por parênteses retos `obj["property"]`. Os parênteses retos permitem receber a chave a partir de uma variável, como por exemplo `obj[varWithKey]`.

Operadores adicionais:

- Para remover uma propriedade: `delete obj.prop`.
- Para verificar se uma propriedade com uma dada chave existe: `"key" in obj`.
- Para iterar sobre um objeto: o ciclo `for (let key in obj)`.

O que estudámos neste capítulo é o chamado "objeto simples" ("*plain object*"), ou simplesmente `Objeto`.

Existem muitos outros tipos de objetos em JavaScript:

- `Array` para armazenar coleções ordenadas de dados,
- `Date` para armazenar informação sobre data e tempo,
- `Error` para armazenar informação sobre um erro.
- ...E outros mais.

Eles têm as suas funcionalidades especiais, que iremos estudar mais adiante. Por vezes, as pessoas dizem algo como "o tipo
Array" ou "o tipo Data" (*Date*), mas formalmente eles não são própriamente tipos, eles pertencem a um único tipo de dados "objeto". E eles o estendem de várias formas.

Objetos em JavaScript são muito poderosos. Aqui, apenas analisamos a superfície de um tópico que é realmente amplo. Nós vamos, mais especificamente, trabalhar e aprender sobre objetos em futuras partes do tutorial.
