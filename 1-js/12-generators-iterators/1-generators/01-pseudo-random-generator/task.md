
# Gerador pseudoaleatório

Existem muitas áreas onde precisamos de dados aleatórios.

Uma delas é em testes. Podemos precisar de dados aleatórios: texto, números, etc. para testar as coisas adequadamente.

Em JavaScript, poderíamos usar `Math.random()`. Mas se algo der errado, gostaríamos de poder repetir o teste, usando exatamente os mesmos dados.

Para isso, são usados os chamados "geradores pseudoaleatórios com semente". Eles recebem uma "semente", o primeiro valor, e em seguida gera os próximos usando a fórmula para que a mesma semente produza a mesma sequência, tornando todo o fluxo fácil de se reproduzir. Precisamos apenas lembrar da semente para repeti-lo. 

Um exemplo de tal fórmula, que gera valores distribuídos de maneira um tanto uniforme:

```
next = previous * 16807 % 2147483647
```

Se usarmos `1` como semente, os valores serão:
1. `16807`
2. `282475249`
3. `1622650073`
4. ...e assim por diante...

A tarefa é criar uma função geradora `pseudoRandom(semente)` que recebe uma `semente` e cria o gerador com esta fórmula.

Exemplo de uso:

```js
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```
