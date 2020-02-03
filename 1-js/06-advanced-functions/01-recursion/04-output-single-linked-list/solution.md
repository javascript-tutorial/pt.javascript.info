# Solução baseada em loop

A variante da solução baseada em loop:

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

Por favor, note que usamos uma variável temporária `tmp` para percorrer a lista. Tecnicamente, poderíamos usar um parâmetro de função `list`:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

...Mas isso seria imprudente. No futuro, podemos precisar estender uma função, fazer outra coisa com a lista. Se mudarmos a lista, perderemos essa capacidade.

Falando sobre bons nomes de variáveis, `list` aqui é a própria lista. O primeiro elemento dela. E deve permanecer assim. Isso é claro e confiável.

Por outro lado, o papel de `tmp` é exclusivamente uma lista de navegação, como` i` no loop `for`.

# Solução recursiva

A variante recursiva de `printList(list)` segue uma lógica simples: para gerar uma lista, devemos gerar o elemento atual `list` e, em seguida, fazer o mesmo para `list.next`:

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

  alert(list.value); // mostre o item atual

  if (list.next) {
    printList(list.next); // faça o mesmo para o resto da lista
  }

}

printList(list);
```

Agora, o que é melhor?

Tecnicamente, o loop é mais eficaz. Essas duas variantes fazem o mesmo, mas o loop não gasta recursos para chamadas de funções aninhadas.

Por outro lado, a variante recursiva é mais curta e às vezes mais fácil de entender.
