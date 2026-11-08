A diferença fica óbvia quando olhamos o código dentro de uma função.

O comportamento é diferente quando há um "salto para fora" do `try...catch`.

Por exemplo, quando há um `return` dentro do `try...catch`. A cláusula `finally` funciona em caso de *qualquer* saída do `try...catch`, mesmo através do comando `return`: logo depois que o `try...catch` termina, mas antes do código que fez a chamada receber o controle.

```js run
function f() {
  try {
    alert('início');
*!*
    return "result";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('limpeza!');
  }
}

f(); // limpeza!
```

...Ou quando há um `throw`, como aqui:

```js run
function f() {
  try {
    alert('início');
    throw new Error("an error");
  } catch (err) {
    // ...
    if("não sabe tratar o erro") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('limpeza!')
  }
}

f(); // limpeza!
```

É o `finally` que garante a limpeza aqui. Se apenas colocássemos o código no fim de `f`, ele não rodaria nessas situações.
