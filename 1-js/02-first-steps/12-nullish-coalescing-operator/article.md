# Operador de coalescência nula '??'

[recent browser="new"]

O operador de coalescência nula é escrito usando dois sinais de interrogação `??`.

Como ele trata  `null` e `undefined` da mesma forma, nós iremos usar um termo especial aqui, neste artigo. Diremos que uma expressão está definida quando não é `null` nem `undefined`.

O resultado de `a ?? b` é:
- se `a` é definido, então `a`,
- se `a` não é definido, então `b`.

Em outras palavras, `??` retorna o primeiro argumento se ele não for `null/undefined`. Caso contrário, o segundo.

O operador de coalescência nula não é algo completamente novo. É somente uma sintaxe bacana para obter o primeiro valor "definido" entre os dois.

Podemos reescrever `result = a ?? b` usando os operadores que já conhecemos, assim:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Agora, deveria estar completamente claro o que `??` faz. Vamos ver onde ele é útil.

O caso de uso comum para `??` é obter um valor padrão para uma variável potencialmente indefinida.

Por exemplo, aqui exibimos `Anônimo` se `usuario` não for definido:

```js run
let usuario;

alert(usuario ?? "Anônimo"); // Anônimo (usuario não definido)
```

Aqui está o exemplo com um nome atribuido a `user`:

```js run
let usuario = "João";

alert(usuario ?? "Anônimo"); // João (usuario está definido)
```

Podemos também usar uma sequência de `??` para selecionar o primeiro valor em uma lista que não seja `null/undefined`.

Digamos que temos dados de um usuário nas variáveis `nome`, `sobrenome` ou `apelido`. Todos eles podem ser indefinidos, se o usuário optar por não entrar com um valor.

Gostaríamos de exibir o nome do usuário usando uma dessas variáveis, ou exibir "Anônimo" se todas elas forem indefinidas.

Para isso usaremos o operador `??`:

```js run
let nome = null;
let sobrenome = null;
let apelido = "Supercoder";

// exibe o primeiro valor definido:
*!*
alert(nome ?? sobrenome ?? apelido ?? "Anônimo"); // Supercoder
*/!*
```

## Comparação com ||

O operador OU `||` pode ser utilizado da mesma forma que `??`, como descrito no [capítulo anterior](info:logical-operators#or-finds-the-first-truthy-value).

Por exemplo, no código acima podemos substitiur `??` por `||` e o resultado se mantém:

```js run
let nome = null;
let sobrenome = null;
let apelido = "Supercoder";

// exibe o primeiro valor avaliado como verdadeiro:
*!*
alert(nome || sobrenome || apelido || "Anônimo"); // Supercoder
*/!*
```

Históricamente, o operador OU `||` foi o primeiro a existir. Ele existe desde a criação do JavaScript, e vem sendo utilizado para este propósito desde então.

Por outro lado, o operador de coalescência nula `??` foi adicionado ao JavaScript recentemente, e a razão para isso foi o descontentamento com `||`.

A principal diferença entre eles é:
- `||` retorna o primeiro valor avaliado como `true`.
- `??` retorna o primeiro valor _definido_.

Em outras palavras, `||` não diferencia entre `false`, `0`, uma string vazia `""` e `null/undefined`. Todos são igualmente valores avaliados como falsos. Se algum desses for o primeiro argumento de `||`, então teremos o segundo argumento como resultado.

Na prática, porém, gostaríamos de usar valores padrão somente se a variável é `null/undefined`. Ou seja, quando o valor realmente seja desconhecido/não definido.

Por exemplo, considere isso:

```js run
let altura = 0;

alert(altura || 100); // 100
alert(altura ?? 100); // 0
```

- `altura || 100` verifica  se `altura` é um valor avaliado como falso, e como é `0`, de fato é.
    - então o resultado de  `||` é o segundo argumento, `100`.
- `altura ?? 100` verifica  se `altura` é `null/undefined`, e não é,
    - então o resultado é o valor atual de `altura`, que é `0`.

Na prática, a altura igual a zero é um valor válido que não deve ser substituído pelo valor padrão, então usar `??` é o correto.

## Precedência

A precedência do operador `??` é quase a mesma que a de `||`, apenas um pouco mais baixa: é igual a `5` na [tabela MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), enquanto `||` é `6`. 

Isto significa que, tal como `||`, o operador de coalescência nula `??` é avaliado antes de `=` e `?`, mas após a maioria dos outros operadores, como `+` e `*`.

Então, se quiser selecionar um valor com `??` em uma expressão com outros operadores, considere o uso de parênteses:

```js run
let altura = null;
let largura = null;

// importante: use parênteses
let area = (altura ?? 100) * (largura ?? 50);

alert(area); // 5000
```

Caso contrário, se omitirmos os parênteses, como `*` tem maior precedência que `??`, ele será executado primeiro, levando a resultados incorretos.

```js
// sem parênteses
let area = altura ?? 100 * largura ?? 50;

// ...funciona desta forma (provavelmente não como gostaríamos):
let area = altura ?? (100 * largura) ?? 50;
```

### Usando ?? com && ou ||

Por razões de segurança, o JavaScript proibe o uso de `??` juntamente com os operadores `&&` e `||`, a menos que a precedência seja explicitamente especificada usando parênteses.

O código abaixo dispara um erro de sintaxe:

```js run
let x = 1 && 2 ?? 3; // Erro de sintaxe
```

A limitação é certamente discutível, mas foi incluída na especificação da linguagem com o propósito de evitar erros de programação, quando as pessoas começaram a usar `??` em vez de `||`.

Use parênteses explícitos para corrigí-la:

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
    // grava altura=100, se altura é null ou undefined
    altura = altura ?? 100;
    ```

- O operador `??` possui uma precedência muito baixa, um pouco maior que `?` e `=`, portanto considere adicionar parênteses quando utilizá-lo em uma expressão.
- É proibido usá-lo com `||` ou `&&` sem parênteses explícitos.
