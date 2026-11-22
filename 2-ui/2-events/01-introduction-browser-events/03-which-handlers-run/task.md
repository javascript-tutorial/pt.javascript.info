importance: 5

---

# Quais manipuladores são executados?

Há um botão na variável. Não há manipuladores nele.

Quais manipuladores são executados no clique depois do código a seguir? Quais alertas aparecem?

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
