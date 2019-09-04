
```js run demo
let num;

do {
  num = prompt("Digite um número maior que 100:", 0);
} while (num <= 100 && num);
```

O loop `do..while` repete enquanto  ambos os testes sejam verdadeiros:

1. O teste `num <= 100` -- isto é, o valor digitado ainda não é maior que `100`.
2. O teste `&& num` é falso quando `num` é `null` ou um string vazio. Então, o loop `while` também é interrompido.

P.S. Se `num` é `null`, então `num <= 100` é verdadeiro. Por isso, sem o segundo teste, o loop não iria encerrar se o usuário clicasse em "CANCELAR". Ambos os testes são necessários.
