# Usando recursão

A lógica recursiva aqui é um pouco mais complicada.

Primeiro precisamos exibir o resto da lista e *depois* exibir a atual:

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

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# Usando um laço

A variante com laço também é um pouco mais complicada do que a exibição direta.

Não há como obter o último valor na nossa `list`. Também não conseguimos "voltar".

Então o que podemos fazer é primeiro percorrer os itens na ordem direta e lembrá-los num array, e depois exibir o que lembramos em ordem reversa:

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

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

Observe que a solução recursiva, na verdade, faz exatamente a mesma coisa: ela percorre a lista, lembra os itens na cadeia de chamadas aninhadas (na pilha de contexto de execução), e depois os exibe. 
