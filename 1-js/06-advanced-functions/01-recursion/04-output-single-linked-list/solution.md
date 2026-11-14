# Solução baseada em laço

A variante da solução baseada em laço:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

Observe que usamos uma variável temporária `tmp` para percorrer a lista. Tecnicamente, poderíamos usar o próprio parâmetro da função, `list`, em vez disso:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

...Mas isso não seria sensato. No futuro, podemos precisar estender uma função, fazer outra coisa com a lista. Se mudarmos `list`, perdemos essa capacidade.

Falando em bons nomes de variáveis, `list` aqui é a própria lista. O primeiro elemento dela. E deveria continuar assim. Isso é claro e confiável.

Por outro lado, o papel de `tmp` é exclusivamente percorrer a lista, como o `i` num laço `for`.

# Solução recursiva

A variante recursiva de `printList(list)` segue uma lógica simples: para exibir uma lista, devemos exibir o elemento atual `list`, depois fazer o mesmo para `list.next`:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

  alert(list.value); // exibe o item atual

  if (list.next) {
    printList(list.next); // faz o mesmo para o resto da lista
  }

}

printList(list);
```

Agora, o que é melhor?

Tecnicamente, o laço é mais eficiente. As duas variantes fazem a mesma coisa, mas o laço não gasta recursos com chamadas de função aninhadas.

Por outro lado, a variante recursiva é mais curta e, às vezes, mais fácil de entender.
