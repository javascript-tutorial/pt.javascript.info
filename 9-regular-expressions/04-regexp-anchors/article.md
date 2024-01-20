# Âncoras: início ^ e fim $ de string

Os caracterees acento circunflexo `pattern:^` e cifrão `pattern:$` possuem um significado especial em expressões regulares. Eles são chamados de "âncoras".

O acento circunflexo `pattern:^` corresponde ao início da string, e o cifrão `pattern:$` -- ao final.

Neste exemplo, vamos testar se o texto começa com `Mary`:

```js run
let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // true
```

O padrão `pattern:^Mary` quer dizer: "início da string, e então Mary"

Da mesma maneira, podemos testar se a string termina com `snow` usando `pattern:snow$`:

```js run
let str1 = "its fleece was white as snow";
alert( /snow$/.test(str1) ); // true
```

Nesses casos em particular, poderíamos usar os métodos do objeto string `startsWith/endsWith` em seu lugar. Expressões regulares devem ser usadas para testes mais complexos.

## Testando por casamento completo

Frequentemente, ambas as âncoras `pattern:^...$` são usadas juntas para verificar se uma string inteira corresponde ao padrão. Para confirmar, por exemplo, se a entrada do usuário está no formato correto.

Vamos verificar se uma string é um horário no formato `12:34`. Isto é: dois dígitos, seguido de dois pontos (':'), e então mais dois dígitos.

Em termos de expressões regulares, isso fica `pattern:\d\d:\d\d`: 

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false
```

Nesse exemplo, o casamento com o padrão `pattern:\d\d:\d\d` deve iniciar exatamente após o início da string `pattern:^`, e ser seguido imediatamente pelo fim da string `pattern:$`.

A string inteira deve obedecer exatamente a esse formato. Se houver qualquer desvio ou caractere adicional, o resultado será `false`.

Âncoras tem um comportamento diferente caso a flag `pattern:m` esteja presente. Veremos isso no próximo artigo.

```smart header="Âncoras tem \"largura zero\""
As âncoras `pattern:^` e `pattern:$` são verificações. Elas não possuem largura.

Em outras palavras, elas não casam com um caractere, mas sim com uma posição, obrigando o interpretador regex a verificar a condição de início ou fim da string.
```
