# Usando recursão

A lógica recursiva é um pouco complicada aqui.

Precisamos primeiro produzir o restante da lista e *depois* o atual:

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

# Usando um loop

A variante de loop também é um pouco mais complicada do que a saída direta.

Não há como obter o último valor em nossa `lista'. Também não podemos "voltar".

Portanto, o que podemos fazer é primeiro examinar os itens na ordem direta e lembrá-los em uma matriz e, em seguida, produzir o que lembramos na ordem inversa:

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

Observe que a solução recursiva realmente faz exatamente o mesmo: segue a lista, lembra os itens na cadeia de chamadas aninhadas (na pilha de contexto de execução) e as produz.
