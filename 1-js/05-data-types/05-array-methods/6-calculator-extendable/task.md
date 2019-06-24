importância: 5

---

# Crie uma calculadora extensível

Crie uma função construtora `Calculator`, que cria objetos "extensíveis" de calcuadora.

A tarefa consiste em duas partes.

1. Primeiro, implemente o método `calculate(str)` que recebe uma string como `"1 + 2"` no formato "NÚMERO operador NÚMERO" (delimitado por espaços) e retorna o resultado. Deve entender mais `+` e menos `-`.

    Exemplo de uso:

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
2. Em seguida, adicione o método `addMethod(name, func)` que ensina à calculadora uma nova operação. Ele pega o operador `name` e a função de dois argumentos `func(a, b)` que o implementa.

    Por exemplo, vamos adicionar a multiplicação `*`, division `/` e potênciação `**`:

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

- Sem colchetes ou expressões complexas nesta tarefa.
- Os números e o operador são delimitados com exatamente um espaço.
- Pode haver tratamento de erros se você quiser adicioná-lo.
