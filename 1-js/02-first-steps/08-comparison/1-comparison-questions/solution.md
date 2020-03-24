

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

<<<<<<< HEAD
1. Obviamente, *true*.
2. Comparação de dicionário, portanto, *false*.
3. Novamente, comparação de dicionário, o primeiro caractere de `"2"` é maior que o primeiro caractere de `"1"`.
4. Valores `null` e `undefined` são iguais entre si somente.
5. A igualdade estrita é rigorosa. Diferentes tipos de ambos os lados levam a *false*.
6. Veja (4).
7. Igualdade estrita de diferentes tipos.
=======
1. Obviously, true.
2. Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3. Again, dictionary comparison, first char of `"2"` is greater than the first char of `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
