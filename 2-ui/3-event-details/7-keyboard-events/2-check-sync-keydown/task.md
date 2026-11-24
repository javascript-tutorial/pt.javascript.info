importance: 5

---

# Hotkeys estendidas

Crie uma função `runOnKeys(func, code1, code2, ... code_n)` que executa `func` quando as teclas com os códigos `code1`, `code2`, ..., `code_n` são pressionadas simultaneamente.

Por exemplo, o código abaixo mostra um `alert` quando `"Q"` e `"W"` são pressionadas juntas (em qualquer idioma, com ou sem CapsLock)

```js no-beautify
runOnKeys(
  () => alert("Hello!"),
  "KeyQ",
  "KeyW"
);
```

[demo src="solution"]
