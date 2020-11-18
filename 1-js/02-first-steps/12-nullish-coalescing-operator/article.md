# Operador de coalescência nula '??'

[recent browser="new"]

O operador de coalescência nula `??` disponibiliza uma sintaxe curta para obter a primeira variável "definida" em uma lista.

O resultado de `a ?? b` é:
- `a` se ele não é `null` ou `undefined`,
- `b`, nos demais casos.

Então, `x = a ?? b` é um equivalente curto a:

```js
x = (a !== null && a !== undefined) ? a : b;
```

Veja um exemplo mais longo.

Digamos que temos `nome`, `sobrenome` ou `apelido`, todos opcionais.

Vamos selecionar e exibir o que estiver definido (ou "Anônimo" caso nenhum esteja).

```js run
let nome = null;
let sobrenome = null;
let apelido = "Supercoder";

// exibe a primeira variável com valor diferente de null ou undefined
alert(nome ?? sobrenome ?? apelido ?? "Anônimo"); // Supercoder
```

## Comparação com ||

É muito parecido com o operador OU `||`. Na verdade, podemos substituir `??` por `||` no código acima e obter o mesmo resultado.

A principal diferença é:
- `||` retorna o primeiro valor avaliado como `true` (_truthy_).
- `??` retorna o primeiro valor _definido_.

Isso é muito significativo quando queremos tratar `null/undefined` de forma diferente de `0`.

Por exemplo:

```js
altura = altura ?? 100;
```

Grava `100` em `altura` se ela não estiver definida. Mas se `altura` é `0`, então ela mantém seu valor.

Vamos comparar com `||`:

```js run
let altura = 0;

alert(altura || 100); // 100
alert(altura ?? 100); // 0
```

Aqui, `altura || 100` trata zero na altura como não definida, assim como `null`, `undefined` ou outro valor avaliado como falso; dependendo do caso de uso isso pode ser incorreto.

Já `altura ?? 100` retorna `100` somente se `altura` é exatamente `null` ou `undefined`.

## Precedência

A precedência do operador `??` é bastante baixa: `7` na [tabela MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

É menor que a maioria dos operadores e um pouco maior que `=` e `?`.

Portanto, ao usar `??` em uma expressão complexa, considere o uso de parênteses:

```js run
let altura = null;
let largura = null;

// importante: use parênteses
let area = (altura ?? 100) * (largura ?? 50);

alert(area); // 5000
```

Caso contrário, se omitirmos os parênteses, `*` tem a precedência e será executado primeiro. Isso seria o mesmo que:

```js
// incorreto
let area = altura ?? (100 * largura) ?? 50;
```

Há ainda uma limitação da linguagem relacionada. Por razões de segurança, é proibido o uso de `??` juntamente com os operadores `&&` e `||`.

O código abaixo dispara um erro de sintaxe:

```js run
let x = 1 && 2 ?? 3; // Erro de sintaxe
```

A limitação é certamente discutível, mas por alguma razão foi incluída na especificação da linguagem.

Use parênteses explícitos para corrigí-la:

```js run
let x = (1 && 2) ?? 3; // Funciona
alert(x); // 2
```

## Resumo

- O operador de coalescência nula `??` disponibiliza uma sintaxe curta para obter a primeira variável "definida" em uma lista.

  É usado para atribuir valores a variáveis:

  ```js
  // grava altura=100, se altura é null ou undefined
  altura = altura ?? 100;
  ```

- O operador `??` possui uma precedência muito baixa, um pouco maior que `?` e `=`.
- É proibido usá-lo com `||` ou `&&` sem parênteses explícitos.
