# Operador de coalescência nula '??'

[recent browser="new"]

O operador de coalescência nula é escrito usando dois sinais de interrogação `??`.

Como ele trata `null` e `undefined` da mesma forma, nós iremos usar um termo especial aqui, neste artigo. Diremos que uma expressão está definida quando não é `null` nem `undefined`.

O resultado de `a ?? b` é:

- se `a` é definido, então `a`,
- se `a` não é definido, então `b`.

Em outras palavras, `??` retorna o primeiro argumento se ele não for `null/undefined`. Caso contrário, o segundo.

O operador de coalescência nula não é algo completamente novo. É somente uma sintaxe bacana para obter o primeiro valor "definido" entre os dois.

Podemos reescrever `result = a ?? b` usando os operadores que já conhecemos, assim:

```js
result = a !== null && a !== undefined ? a : b;
```

Agora, deveria estar completamente claro o que `??` faz. Vamos ver onde ele é útil.

O caso de uso comum para `??` é obter um valor padrão para uma variável potencialmente indefinida.

Por exemplo, aqui exibimos `Anônimo` se `user` não for definido:

```js run
let user;

alert(user ?? "Anônimo"); // Anônimo ("user" não definido)
```

Aqui está o exemplo com um nome atribuído a `user`:

```js run
let user = "João";

alert(user ?? "Anônimo"); // João ("user" está definido)
```

Podemos também usar uma sequência de `??` para selecionar o primeiro valor em uma lista que não seja `null/undefined`.

Digamos que temos dados de um usuário nas variáveis `nome`, `sobrenome` ou `apelido`. Todos eles podem ser indefinidos, se o usuário optar por não entrar com um valor.

Gostaríamos de exibir o nome do usuário usando uma dessas variáveis, ou exibir "Anônimo" se todas elas forem indefinidas.

Para isso usaremos o operador `??`:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// exibe o primeiro valor definido:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anônimo"); // Supercoder
*/!*
```

## Comparação com ||

O operador OU `||` pode ser utilizado da mesma forma que `??`, como descrito no [capítulo anterior](info:logical-operators#or-finds-the-first-truthy-value).

Por exemplo, no código acima podemos substituir `??` por `||` e o resultado se mantém:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// exibe o primeiro valor avaliado como verdadeiro:
*!*
alert(firstName || lastName || nickName || "Anônimo"); // Supercoder
*/!*
```

Historicamente, o operador OU `||` foi o primeiro a existir. Ele existe desde a criação do JavaScript, e vem sendo utilizado para este propósito desde então.

Por outro lado, o operador de coalescência nula `??` foi adicionado ao JavaScript recentemente, e a razão para isso foi o descontentamento com `||`.

A principal diferença entre eles é:

- `||` retorna o primeiro valor avaliado como `true`.
- `??` retorna o primeiro valor _definido_.

Em outras palavras, `||` não diferencia entre `false`, `0`, uma string vazia `""` e `null/undefined`. Todos são igualmente valores avaliados como falsos. Se algum desses for o primeiro argumento de `||`, então teremos o segundo argumento como resultado.

Na prática, porém, gostaríamos de usar valores padrão somente se a variável é `null/undefined`. Ou seja, quando o valor seja realmente desconhecido/não definido.

Por exemplo, considere isso:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- `height || 100` verifica se `height` é um valor avaliado como falso, e como é `0`, de fato é.
  - então o resultado de `||` é o segundo argumento, `100`.
- `height ?? 100` verifica se `height` é `null/undefined`, e não é,
  - então o resultado é o valor atual de `height`, que é `0`.

Na prática, a altura igual a zero é um valor válido que não deve ser substituído pelo valor padrão, então usar `??` é o correto.

## Precedência

A precedência do operador `??` é a mesma que a de `||`. Ambos são iguais a '4' na [tabela MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

Isto significa que, tal como `||`, o operador de coalescência nula `??` é avaliado antes de `=` e `?`, mas após a maioria dos outros operadores, como `+` e `*`.

Então, se quiser selecionar um valor com `??` em uma expressão com outros operadores, considere o uso de parênteses:

```js run
let height = null;
let width = null;

// importante: use parênteses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Caso contrário, se omitirmos os parênteses, como `*` tem maior precedência que `??`, ele será executado primeiro, levando a resultados incorretos.

```js
// sem parênteses
let area = height ?? 100 * width ?? 50;

// ...funciona desta forma (provavelmente não como gostaríamos):
let area = height ?? 100 * width ?? 50;
```

### Usando ?? com && ou ||

Por razões de segurança, o JavaScript proíbe o uso de `??` junto dos operadores `&&` e `||`, a menos que a precedência seja explicitamente especificada usando parênteses.

O código abaixo dispara um erro de sintaxe:

```js run
let x = 1 && 2 ?? 3; // Erro de sintaxe
```

A limitação é certamente discutível, mas foi incluída na especificação da linguagem com o propósito de evitar erros de programação, quando as pessoas começaram a usar `??` em vez de `||`.

Use parênteses explícitos para corrigi-la:

```js run
*!*
let x = (1 && 2) ?? 3; // Funciona
*/!*

alert(x); // 2
```

## Resumo

- O operador de coalescência nula `??` disponibiliza uma sintaxe curta para obter um valor "definido" em uma lista.

  É usado para atribuir valores a variáveis:

  ```js
  // grava height=100, se height é null ou undefined
  height = height ?? 100;
  ```

- O operador `??` possui uma precedência muito baixa, um pouco maior que `?` e `=`, portanto considere adicionar parênteses quando utilizá-lo em uma expressão.
- É proibido usá-lo com `||` ou `&&` sem parênteses explícitos.
