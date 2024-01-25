importance: 5

---

# Criando um objeto com o mesmo construtor

Imagine que nós temos um objeto `obj` arbitrário, criado por uma função construtura -- nós não sabemos qual é, mas nós gostaríamos de criar um objeto novo usando ela.

Nós podemos fazer isso dessa forma?

```js
let obj2 = new obj.constructor();
```

Dê um exemplo de uma função construtora para o `obj` que faça esse código funcionar corretamente, e outro exemplo que faça ele não funcionar.
