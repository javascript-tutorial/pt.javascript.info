importance: 5

---

# Crie uma calculadora extensível

Construa uma função construtora `Calculator` que crie objetos de calculadora "extensível".

A atividade consiste de duas partes.

1. Primeiro, implemente o método `calculate(str)` que pegue uma string como `"1 + 2"` e a deixe no formato "NÚMERO operador NÚMERO" (delimitada por espaços) e retorne o resultado. Deve entender os operadores mais `+` e menos `-`.

    Exemplo:

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
2. Então, adicione o método `addMethod(name, func)` que ensina a calculadora uma nova operação. O método pega o operador `name` e a função que recebe dois argumentos `func(a,b)` para implementar a nova operação.

    Por exemplo, vamos adicionar multiplicação `*`, divisão `/` e potenciação `**`:

    ```js
    let multCalc = new Calculator;
    let divCalc = new Calculator;
    let powerCalc = new Calculator;
    
    multCalc.addMethod("*", (a, b) => a * b);
    divCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

- Sem colchetes ou expressões complexas neste exercício.
- Os números e o operador são separados por, exatamente, um espaço.
- Pode haver mensagem de erro se você desejar adicionar.
