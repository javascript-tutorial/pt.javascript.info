# Modo multilinha das âncoras ^ e $, opção "m"

O modo multilinha é ativado pela opção `pattern:m`.

Ela afeta apenas o comportamento do `pattern:^` e `pattern:$`.

No modo multilinha, eles não correspondem somente ao começo e o fim de uma string, mas também ao começo e o fim de linhas.

## Busca no início da linha ^

O exemplo abaixo tem várias linhas. O padrão `pattern:/^\d/gm` corresponde a um caractere no começo de cada linha:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
console.log( str.match(/^\d/gm) ); // 1, 2, 3
*/!*
```

Sem a opção `pattern:m` somente o primeiro dígito será encontrado:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
console.log( str.match(/^\d/g) ); // 1
*/!*
```

Isso acontece porque por padrão, o acento circunflexo `pattern:^` corresponde apenas com o começo da string -- e no modo multilinha no começo de cada linha.

```smart
Formalmente, "começo de linha" quer dizer "imediatamente após uma quebra de linha": o teste `pattern:^` no modo multilinha corresponde a todas as posições precedidas por um caractere de nova linha `\n`, bem como o início da string como um todo.
```

## Busca no fim da linha $

O cifrão `pattern:$` se comporta de maneira similar.

A expressão regular `pattern:\d$` corresponde ao último dígito de cada linha

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d$/gm) ); // 1,2,3
```

Sem a opção `pattern:m`, o cifrão `pattern:$` corresponde apenas ao fim da string inteira, então apenas o último dígito seria encontrado.

```smart
Formalmente, "fim de linha" quer dizer "imediatamente antes de uma quebra de linha": o teste `pattern:$` no modo multilinha corresponde a todas as posições sucedidas por um caractere de nova linha `\n`, bem como o fim da string como um todo.
```

## Busca por \n ao invés de ^ e $

Para encontrar uma quebra de linha podemos usar além das âncoras `pattern:^` e `pattern:$` o caractere `\n`.

Qual a diferença? Vejamos um exemplo.

Aqui estamos buscando por `pattern:\d\n` ao invés de `pattern:\d$`:

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d\n/g) ); // 1\n,2\n
```

Como podemos ver, temos duas correspondências ao invés de 3

Isso ocorre porque não há uma quebra de linha após o `subject:3` (Mas temos o fim da string, então ele corresponde com o `pattern:$`)

Outra diferença: Agora cada correspondência inclui um caractere de nova linha `match:\n`. Diferentemente das âncoras `pattern:^` e `pattern:$`, que testam apenas a condição (início ou fim de uma linha), `\n` é um caractere, então ele se torna parte do resultado.

Dessa forma, usamos o `\n` no padrão quando precisamos de caracteres de nova linha no resultado, e usamos âncoras quando precisamos buscar algo no começo ou final de uma linha.
