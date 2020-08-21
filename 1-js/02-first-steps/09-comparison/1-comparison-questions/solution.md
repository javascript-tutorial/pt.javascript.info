

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true 
undefined == null → true 
undefined === null → false 
null == "\n0\n" → false
null === +"\n0\n" → false 
```

Algumas das razões:

1. Obviamente, *true*.
2. Comparação de dicionário, portanto, *false*.
3. Novamente, comparação de dicionário, o primeiro caractere de `"2"` é maior que o primeiro caractere de `"1"`.
4. Valores `null` e `undefined` são iguais entre si somente.
5. A igualdade estrita é rigorosa. Diferentes tipos de ambos os lados levam a *false*.
6. Veja (4).
7. Igualdade estrita de diferentes tipos.
