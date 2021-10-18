# Referências de objetos e cópias

Uma das diferenças fundamentais de objetos em relação aos primitivos é que objetos são armazenados e copiados por "referência", enquanto valores primitivos: strings, números, booleanos, etc - são sempre copiados por "valor".

Isso é fácil de entender quando olhamos um pouco nos bastidores do que acontece quando copiamos um valor.

Vamos começar com um primitivo, como uma string.

Aqui colocamos uma copia de `message` para `phrase`:

```js
let message = "Hello!";
let phrase = message;
```
 
Como resultado nós temos duas variáveis independentes, cada uma armazenando uma string `"Hello!".`

![](variable-copy-value.svg)

Um resultado bastante óbvio, certo?

Objetos não são assim.

**Uma variável que foi atribuida um objeto armazena não apenas o próprio objeto, mas seu "endereço em memória" - em outras palavras "uma referência" a ele**

Vejamos um exemplo de tal variável:

```js
let user = {
  name: "John"
};
```

E aqui está como ele é realmente armazenado na memória:

![](variable-contains-reference.svg)

O objeto é armazenado em algum lugar na memória (figura a direita), enquanto a variável `user` (figura a esquerda) possui uma "referência" para ele.

Nós podemos pensar em uma variável objeto, como no exemplo `user`, como uma folha de papel com o endereço do objeto nela.

Quando realizamos ações com o objeto, por exemplo pegar a propriedade `user.name`, a engine do JavaScript olha para o que tem naquele endereço e realiza a operação no próprio objeto.

Agora aqui está o motivo da importância.

**Quando uma variável objeto é copiada, a referência é copiada, mas o próprio objeto não é duplicado.**

Por exemplo:

```js no-beautify
let user = { name: "John" };

let admin = user; // cópia por referência
```

Agora temos duas variáveis, cada uma armazenando a referência para o mesmo objeto:

![](variable-copy-reference.svg)

Como você pode ver, ainda há um objeto, porém com duas variáveis referênciando ele.

Podemos usar qualquer uma das variáveis para acessar o objeto e modificar seu conteúdo:


```js run
let user = { name: 'John' };

let admin = user;
*!*
admin.name = 'Pete'; // alterado pela referência de "admin"
*/!*

alert(user.name); // 'Pete', mudanças são vistas pela referência de "user"
```

É como se tivéssemos um gabinete com duas chaves e usamos uma delas (`admin`) para acessa-lo e fazer mudanças. Então, se mais tarde usarmos a outra chave (`user`), ainda iremos estar abrindo o mesmo gabinete e podemos acessar os conteúdos alterados.

## Comparações por referência

Dois objetos são iguais apenas se eles são o mesmo objeto.

Por exemplo, aqui `a` e `b` referênciam o mesmo objeto, então eles são iguais: 

```js run
let a = {};
let b = a; // cópia por referência

alert( a == b ); // verdade, ambas variáveis referênciam o mesmo objeto 
alert( a === b ); // verdade
```

E aqui dois objetos independentes não são iguais, embora sejam parecidos (ambos são vazios):

```js run
let a = {};
let b = {}; // dois objetos independentes

alert( a == b ); // falso
```

Para comparações como `obj1 > obj2` ou para comparações com um primitivo `obj == 5`, objetos são convertidos para primitivos. Iremos estudar como conversões de objetos funcionam muito em breve, mas para falar a verdade, tais comparações são raramente necessárias - normalmente elas aparecem como resultado de um erro de programação.

## Clonando e fundindo, Object.assign

Então, copiar uma varíavel objeto cria mais uma referência para o mesmo objeto.

Mas e se precisarmos duplicar um objeto? Criar uma cópia independente, um clone?

Isso também é factível, mas um pouco mais difícil, porque não há nenhum método embutido para isso no JavaScript. Mas a necessidade é rara - copiar por referência é o suficiente na maiorias das vezes.

Mas se realmente quisermos isso, então precisamos criar um novo objeto e replicar a estrutura do objeto existente iterando por suas propriedades e copiando elas de um jeito primitivo.

Tipo assim:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // o novo objeto vazio

// vamos copiar todas as propriedades de user para ele
for (let key in user) {
  clone[key] = user[key];
}
*/!* 

// agora clone é um objeto totalmente independente com o mesmo conteúdo
clone.name = "Pete"; // alterada a informação nele

alert( user.name ); // ainda John no objeto original
```

Também podemos usar o método [Object.assign](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) para isso.

A sintaxe é:

```js run
Object.assign(dest, [fonte1, fonte2, fonte3...])
```

- O primeiro argumento `dest` é o objeto destino.
- Argumentos adicionais `fonte1, ..., fonteN` (pode ser quantos precisar) são os objetos fonte.
- Ele copia as propriedades de todos os objetos fontes `fonte1, ..., fonteN` para o destino `dest`. Em outras palavras, propriedaes de todos os argumentos começando pelo segundo são copiadas para o primeiro objeto.
- A chamada retorna `dest`.

Por exemplo, podemos usá-lo para fundir diversos objetos em um:
```js run
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copia todas as propriedades de permissions1 e permissions2 para user 
Object.assign(user, permissions1, permissions2);
*/!*

// agora user = { name: "John", canView: true, canEdit: true }
```

Se o nome da propriedade copiada já existir, ela é sobrescrita:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // agora user = { name: "Pete" }
```

Podemos também utilizar `Object.assign` para substituir `for..in` loop para clonagem simples:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

Ele copia todas as propriedade de `user` para o objeto vazio e o retorna.

Também há outros métodos para clonagem de objeto, por exemplo usando a [sintaxe espalhada](info:rest-parameters-spread) `clone = {...user}`, coberto mais tarde no tutorial.

## Clonagem aninhada

Ate agora assumimos que todas as propriedades de `user` são primitivas. Mas propriedades podem ser referências para outros objetos. O que fazer com essas propriedades?

Tipo assim:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Agora não é suficiente copiar `clone.sizes = user.sizes`, como `user.sizes` é um objeto, irá ser copiado por referência. Portanto,`clone` e `user` irão compartilhar os mesmos tamanhos.

Tipo assim:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // verdade, mesmo objeto

// user e clone compartilham tamanhos
user.sizes.width++;       // altera a propriedade por um
alert(clone.sizes.width); // 51, olhe o outro resultado
```

Para concertar isso, precisamos usar um ciclo de clonagem para examinar cada valor de `user[key]` e, se for um objeto, então replicar também sua estrutura. Isso é chamado de "clonagem profunda".

Podemos implementar usando recursão. Ou, para não reinventar a roda, pegar uma implementação existente, por exemplo [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) da biblioteca do JavaScript [lodash](https://lodash.com).

````smart header="Const objects can be modified"
Um efeito colateral importante de armazenar objetos como referência é que objetos declarados como `const` podem ser modificados.

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

Pode parecer que a linha (*) causaria um erro, mas não causa. O valor de `user` é constante, precisa sempre referenciar o mesmo objeto, mas propriedades desse objeto são livres para serem alteradas.

Em outras palavras, o `const user` dá um erro apenas se tentarmos definir `user=...` como um todo

Dito isso, se realmente precisarmos criar propriedades constantes no objeto, também é possível, mas usando métodos totalmente diferentes. Iremos menconar isso no capítulo <info:property-descriptors>.
````

## Sumário

Objetos são atribuidos e copiados por referência. Em outras palavras, uma variável armazena não o "valor do objeto", mas sim sua "referência" (endereço na memória) para o valor. Então copiar tal variável ou passar ela como um argumento de uma função copia a referência, não o proprio objeto.

Todas as operações por meio de referências copiadas(como adicionar/remover propriedades) são realizadas no mesmo objeto único.

Para criar uma "cópia real" (um clone) podemos usar `Object.assign` para o então chamado "cópia superficial" (objetos aninhados são copiados por referência) ou uma função de "clonagem profunda", como a [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
