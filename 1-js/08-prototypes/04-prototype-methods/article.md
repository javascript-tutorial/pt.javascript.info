
# Métodos de prototype, objetos sem __proto__

No primeiro capítulo desta seção, mencionamos que existem métodos modernos para configurar um prototype.

Definir ou ler o prototype com `obj.__proto__` é considerado ultrapassado e, de certa forma, descontinuado (movido para o chamado "Anexo B" do padrão do JavaScript, destinado apenas a navegadores).

Os métodos modernos para obter/definir um prototype são:

- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- retorna o `[[Prototype]]` de `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- define o `[[Prototype]]` de `obj` como `proto`.

O único uso de `__proto__` que não é malvisto é como uma propriedade ao criar um novo objeto: `{ __proto__: ... }`.

Embora, também exista um método especial para isso:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- cria um objeto vazio com o `proto` dado como `[[Prototype]]` e descritores de propriedade opcionais.

Por exemplo:

```js run
let animal = {
  eats: true
};

// cria um novo objeto com animal como prototype
*!*
let rabbit = Object.create(animal); // o mesmo que {__proto__: animal}
*/!*

alert(rabbit.eats); // true

*!*
alert(Object.getPrototypeOf(rabbit) === animal); // true
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // muda o prototype de rabbit para {}
*/!*
```

O método `Object.create` é um pouco mais poderoso, já que tem um segundo argumento opcional: descritores de propriedade.

Podemos fornecer propriedades adicionais ao novo objeto ali, assim:

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

Os descritores estão no mesmo formato descrito no capítulo <info:property-descriptors>.

Podemos usar `Object.create` para fazer uma clonagem de objeto mais poderosa do que copiar propriedades com `for..in`:

```js
let clone = Object.create(
  Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
```

Essa chamada faz uma cópia verdadeiramente exata de `obj`, incluindo todas as propriedades: enumeráveis e não enumeráveis, propriedades de dados e setters/getters -- tudo, e com o `[[Prototype]]` certo.


## Breve histórico

Existem tantas formas de gerenciar `[[Prototype]]`. Como isso aconteceu? Por quê?

Isso é por motivos históricos.

A herança prototípica existia na linguagem desde o seu início, mas as formas de gerenciá-la evoluíram com o tempo.

- A propriedade `prototype` de uma função construtora funciona desde tempos bem antigos. É a forma mais antiga de criar objetos com um prototype dado.
- Depois, no ano de 2012, `Object.create` apareceu no padrão. Isso deu a capacidade de criar objetos com um prototype dado, mas não oferecia a capacidade de obtê-lo/defini-lo. Alguns navegadores implementaram o acessor não padronizado `__proto__`, que permitia ao usuário obter/definir um prototype a qualquer momento, pra dar mais flexibilidade aos desenvolvedores.
- Depois, no ano de 2015, `Object.setPrototypeOf` e `Object.getPrototypeOf` foram adicionados ao padrão, pra realizar a mesma funcionalidade que `__proto__`. Como `__proto__` já estava de fato implementado em todo lugar, ele ficou meio que descontinuado e foi parar no Anexo B do padrão, ou seja: opcional para ambientes que não são navegadores.
- Depois, no ano de 2022, passou a ser oficialmente permitido usar `__proto__` em objetos literais `{...}` (saiu do Anexo B), mas não como um getter/setter `obj.__proto__` (ainda no Anexo B).

Por que `__proto__` foi substituído pelas funções `getPrototypeOf/setPrototypeOf`?

Por que `__proto__` foi parcialmente reabilitado e seu uso permitido em `{...}`, mas não como getter/setter?

Essa é uma pergunta interessante, que exige que entendamos por que `__proto__` é ruim.

E logo vamos ter a resposta.

```warn header="Não mude o `[[Prototype]]` de objetos existentes se a velocidade importar"
Tecnicamente, podemos obter/definir o `[[Prototype]]` a qualquer momento. Mas normalmente só o definimos uma vez, no momento da criação do objeto, e não o modificamos mais: `rabbit` herda de `animal`, e isso não vai mudar.

E os motores do JavaScript são altamente otimizados para isso. Mudar um prototype "na hora" com `Object.setPrototypeOf` ou `obj.__proto__=` é uma operação bem lenta, já que quebra as otimizações internas para operações de acesso a propriedades de objeto. Então evite isso, a menos que você saiba o que está fazendo, ou que a velocidade do JavaScript não importe nada pra você.
```

## Objetos "bem simples" [#very-plain]

Como sabemos, objetos podem ser usados como arrays associativos para armazenar pares chave/valor.

...Mas se tentarmos armazenar chaves *fornecidas pelo usuário* nele (por exemplo, um dicionário digitado pelo usuário), podemos ver uma falha interessante: todas as chaves funcionam bem, exceto `"__proto__"`.

Veja o exemplo:

```js run
let obj = {};

let key = prompt("Qual é a chave?", "__proto__");
obj[key] = "algum valor";

alert(obj[key]); // [object Object], não "algum valor"!
```

Aqui, se o usuário digitar `__proto__`, a atribuição na linha 4 é ignorada!

Isso certamente poderia surpreender alguém que não é desenvolvedor, mas é bem compreensível pra nós. A propriedade `__proto__` é especial: ela precisa ser um objeto ou `null`. Uma string não pode se tornar um prototype. É por isso que atribuir uma string a `__proto__` é ignorado.

Mas nós não *pretendíamos* implementar esse comportamento, certo? Queremos armazenar pares chave/valor, e a chave chamada `"__proto__"` não foi salva corretamente. Então isso é uma falha!

Aqui as consequências não são terríveis. Mas, em outros casos, podemos estar armazenando objetos em vez de strings em `obj`, e aí o prototype realmente vai ser mudado. Como resultado, a execução vai dar errado de formas totalmente inesperadas.

O que é pior -- normalmente os desenvolvedores nem pensam nessa possibilidade. Isso faz com que essas falhas sejam difíceis de notar e até as transforma em vulnerabilidades, especialmente quando o JavaScript é usado no lado do servidor.

Coisas inesperadas também podem acontecer ao atribuir a `obj.toString`, já que é um método de objeto nativo.

Como podemos evitar esse problema?

Primeiro, podemos simplesmente trocar para usar `Map` como armazenamento em vez de objetos simples, aí tudo fica bem:

```js run
let map = new Map();

let key = prompt("Qual é a chave?", "__proto__");
map.set(key, "algum valor");

alert(map.get(key)); // "algum valor" (como pretendido)
```

...Mas a sintaxe de `Object` costuma ser mais atraente, por ser mais concisa.

Felizmente, nós *podemos* usar objetos, porque os criadores da linguagem pensaram nesse problema há muito tempo.

Como sabemos, `__proto__` não é uma propriedade de um objeto, mas uma propriedade de acesso de `Object.prototype`:

![](object-prototype-2.svg)

Então, se `obj.__proto__` é lido ou definido, o getter/setter correspondente é chamado a partir do seu prototype, e ele obtém/define o `[[Prototype]]`.

Como foi dito no início desta seção do tutorial: `__proto__` é uma forma de acessar o `[[Prototype]]`, não é o `[[Prototype]]` em si.

Agora, se pretendemos usar um objeto como um array associativo e nos livrarmos desses problemas, podemos fazer isso com um pequeno truque:

```js run
*!*
let obj = Object.create(null);
// ou: obj = { __proto__: null }
*/!*

let key = prompt("Qual é a chave?", "__proto__");
obj[key] = "algum valor";

alert(obj[key]); // "algum valor"
```

`Object.create(null)` cria um objeto vazio sem prototype (`[[Prototype]]` é `null`):

![](object-prototype-null.svg)

Então, não existe getter/setter herdado para `__proto__`. Agora ele é tratado como uma propriedade de dados normal, então o exemplo acima funciona direito.

Podemos chamar esses objetos de "bem simples" ou objetos "dicionário puro", porque eles são até mais simples do que o objeto simples comum `{...}`.

Uma desvantagem é que esses objetos não têm nenhum método de objeto nativo, por exemplo, `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Erro (sem toString)
```

...Mas isso geralmente não é problema pra arrays associativos.

Observe que a maioria dos métodos relacionados a objeto são `Object.something(...)`, como `Object.keys(obj)` -- eles não estão no prototype, então eles vão continuar funcionando nesses objetos:


```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

alert(Object.keys(chineseDictionary)); // hello,bye
```

## Resumo

- Para criar um objeto com o prototype dado, use:

    - sintaxe literal: `{ __proto__: ... }`, permite especificar várias propriedades
    - ou [Object.create(proto, [descriptors])](mdn:js/Object/create), permite especificar descritores de propriedade.

    O `Object.create` oferece uma forma fácil de fazer uma cópia rasa de um objeto com todos os descritores:

    ```js
    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    ```

- Os métodos modernos para obter/definir o prototype são:

    - [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- retorna o `[[Prototype]]` de `obj` (o mesmo que o getter `__proto__`).
    - [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- define o `[[Prototype]]` de `obj` como `proto` (o mesmo que o setter `__proto__`).

- Obter/definir o prototype usando o getter/setter nativo `__proto__` não é recomendado, agora está no Anexo B da especificação.

- Também cobrimos objetos sem prototype, criados com `Object.create(null)` ou `{__proto__: null}`.

    Esses objetos são usados como dicionários, para armazenar quaisquer chaves (possivelmente geradas pelo usuário).

    Normalmente, objetos herdam métodos nativos e o getter/setter `__proto__` de `Object.prototype`, deixando as chaves correspondentes "ocupadas" e potencialmente causando efeitos colaterais. Com o prototype `null`, os objetos ficam realmente vazios.
