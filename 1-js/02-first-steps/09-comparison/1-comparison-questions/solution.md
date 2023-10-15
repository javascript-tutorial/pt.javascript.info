

```js no-beautify
5 > 4 → true
"maça" > "abacaxi" → true
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

Alguns dos motivos:

1. Obviamente, verdadeiro.
2. Comparação de dicionário, portanto, verdadeiro. `"m"` é maior que `"a"`.
3. Novamente, comparação de dicionário, primeiro caractere `"2"` é maior que o primeiro caractere `"1"`.
4. Os valores `null` e `undefined` são iguais apenas entre si.
5. Igualdade estrita é estrita. Diferentes tipos de ambos os lados levam a falso.
6. Semelhante no `(4)`, `null` só é igual a `undefined`.
7. Igualdade estrita de diferentes tipos.
