importance: 5

---

# createTextNode vs innerHTML vs textContent

Temos um elemento do DOM vazio `elem` e uma string `text`.

Qual destes 3 comandos vai fazer exatamente a mesma coisa?

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
