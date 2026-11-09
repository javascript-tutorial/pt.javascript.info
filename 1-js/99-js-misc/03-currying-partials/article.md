libs:
  - lodash

---

# Currying

[Currying](https://pt.wikipedia.org/wiki/Currying) é uma técnica avançada de trabalhar com funções. É usada não só no JavaScript, mas em outras linguagens também.

Currying é uma transformação de funções que converte uma função chamável como `f(a, b, c)` em chamável como `f(a)(b)(c)`.

Currying não chama uma função. Ele apenas a transforma.

Vamos ver um exemplo primeiro, pra entender melhor do que estamos falando, e depois as aplicações práticas.

Vamos criar uma função auxiliar `curry(f)` que faz o currying de uma `f` de dois argumentos. Em outras palavras, `curry(f)`, para uma `f(a, b)` de dois argumentos, a converte numa função que roda como `f(a)(b)`:

```js run
*!*
function curry(f) { // curry(f) faz a transformação de currying
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

// uso
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

Como você pode ver, a implementação é direta: são só dois invólucros.

- O resultado de `curry(func)` é um invólucro `function(a)`.
- Quando ele é chamado como `curriedSum(1)`, o argumento é salvo no Ambiente Léxico, e um novo invólucro é retornado, `function(b)`.
- Então esse invólucro é chamado com `2` como argumento, e ele passa a chamada pra `sum` original.

Implementações mais avançadas de currying, como o [_.curry](https://lodash.com/docs#curry) da biblioteca lodash, retornam um invólucro que permite que uma função seja chamada tanto normalmente quanto parcialmente:

```js run
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // usando _.curry da biblioteca lodash

alert( curriedSum(1, 2) ); // 3, ainda chamável normalmente
alert( curriedSum(1)(2) ); // 3, chamado parcialmente
```

## Currying? Pra quê?

Pra entender os benefícios, precisamos de um bom exemplo da vida real.

Por exemplo, temos a função de log `log(date, importance, message)` que formata e exibe a informação. Em projetos reais, essas funções têm muitos recursos úteis, como enviar logs pela rede, mas aqui vamos só usar `alert`:

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Vamos fazer o currying dela!

```js
log = _.curry(log);
```

Depois disso, `log` funciona normalmente:

```js
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```

...Mas também funciona na forma com currying:

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

Agora podemos facilmente fazer uma função de conveniência para os logs atuais:

```js
// logNow será a parcial de log com o primeiro argumento fixo
let logNow = log(new Date());

// usando
logNow("INFO", "message"); // [HH:mm] INFO message
```

Agora `logNow` é o `log` com o primeiro argumento fixo, em outras palavras, uma "função parcialmente aplicada", ou "parcial" para simplificar.

Podemos ir além e fazer uma função de conveniência para os logs de debug atuais:

```js
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message
```

Então:
1. Não perdemos nada depois do currying: `log` ainda é chamável normalmente.
2. Podemos facilmente gerar funções parciais, como para os logs de hoje.

## Implementação avançada de curry

Caso você queira entrar nos detalhes, aqui está a implementação "avançada" de curry para funções com múltiplos argumentos, que poderíamos ter usado acima.

É bem curta:

```js
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
```

Exemplos de uso:

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, ainda chamável normalmente
alert( curriedSum(1)(2,3) ); // 6, currying do 1º argumento
alert( curriedSum(1)(2)(3) ); // 6, currying completo
```

O novo `curry` pode parecer complicado, mas na verdade é fácil de entender.

O resultado da chamada `curry(func)` é o invólucro `curried`, que fica assim:

```js
// func é a função a ser transformada
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

Quando rodamos ela, existem duas ramificações de execução do `if`:

1. Se a quantidade de `args` passados for igual ou maior do que a função original tem na sua definição (`func.length`), então só passa a chamada pra ela usando `func.apply`. 
2. Caso contrário, obtém uma parcial: ainda não chamamos `func`. Em vez disso, outro invólucro é retornado, que vai reaplicar `curried`, fornecendo os argumentos anteriores junto com os novos. 

Então, se a chamarmos de novo, vamos obter ou uma nova parcial (se não houver argumentos suficientes) ou, finalmente, o resultado.

```smart header="Só funções de tamanho fixo"
O currying exige que a função tenha um número fixo de argumentos.

Uma função que usa parâmetros rest, como `f(...args)`, não pode ter o currying feito dessa forma.
```

```smart header="Um pouco mais do que currying"
Por definição, o currying deveria converter `sum(a, b, c)` em `sum(a)(b)(c)`.

Mas a maioria das implementações de currying no JavaScript são avançadas, como descrito: elas também mantêm a função chamável na variante com múltiplos argumentos.
```

## Resumo

*Currying* é uma transformação que torna `f(a,b,c)` chamável como `f(a)(b)(c)`. Implementações em JavaScript normalmente mantêm a função chamável normalmente e também retornam a parcial se a quantidade de argumentos não for suficiente.

O currying nos permite obter parciais facilmente. Como vimos no exemplo de log, depois do currying, a função universal de três argumentos `log(date, importance, message)` nos dá parciais quando chamada com um argumento (como `log(date)`) ou dois argumentos (como `log(date, importance)`).  
