importance: 5

---

# Adicione o método "f.defer(ms)" às funções

Adicione ao protótipo de todas as funções o método `defer(ms)`, que executa a função depois de `ms` milisegundos.

Depois de fazer isso, esse código deve funcionar:

```js
function f() {
  alert("Olá!");
}

f.defer(1000); // mostra "Olá!" depois de 1 segundo
```
