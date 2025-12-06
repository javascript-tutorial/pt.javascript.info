
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

1. A adição de uma string `"" + 1` converte `1` para uma string: `"" + 1 = "1"`, e quando nós temos `"1" + 0`, a mesma regra é aplicada.
2. A subtração `-` (como a maioria das operações matemáticas) apenas funciona com números, e converte uma string vazia `""` para `0`.
3. A adição a uma string anexa o número `5` à string.
4. A subtração sempre converte para números, de modo que esta transforma `"  -9  "` no número `-9` (ignorando os espaços em volta deste).
5. `null` se torna `0` após a conversão numérica.
6. `undefined` se torna `NaN` após a conversão numérica.
7. Caracteres de espaço, são aparados do início e final de uma string quando esta é convertida em um número. Aqui a string inteira consiste em caracteres de espaço, tais como `\t`, `\n` e um espaço "regular" entre eles. Então, similarmente à string vazia, isto se torna `0`.
