
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
7 / 0 = Infinity
" -9  " + 5 = " -9  5" // (3)
" -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
```

1. A adição com uma string `"" + 1` converte `1` para uma string: `"" + 1 = "1"`, e então temos `"1" + 0`, a mesma regra é aplicada.
2. A subtração `-` (como a maioria das operações matemáticas) só funciona com números, ela converte uma string vazia `""` para `0`.
3. A adição com uma string adiciona o número `5` à string.
4. A subtração sempre converte para números, então faz `"  -9  "` um número `-9` (ignorando espaços em torno dela).
5. `null` torna-se `0` após a conversão numérica.
6. `undefined` torna-se `NaN` após a conversão numérica.