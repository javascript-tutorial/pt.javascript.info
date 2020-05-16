
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
" \t \n" - 2 = -2 // (7)
```

1. A adição com a string `"" + 1` converte `1` para string: `"" + 1 = "1"`, então temos `"1" + 0`, a mesma regra é aplicada.
2. A subtração `-` (como a maioria das operações matemáticas) funciona apenas com números, ela converte a string vazia `""` para `0`.
3. A adição com a string anexa o número 5 ao final da string.
4. A subtração sempre converte para números, então transforma `"  -9  "` no número `-9` (ignorando os espaços em torno dele).
5. `null` se torna `0` após a conversão numérica.
6. `undefined` se torna `NaN` após a conversão numérica.
7. Caracteres de espaço são retirados do começo e do fim da string quando ela é convertido a um número. Aqui toda a string é constituída de caracteres de espaço, como `\t`, `\n` e o espaço "regular" entre eles. Então, da mesma maneira como uma string vazia, torna-se `0`.
