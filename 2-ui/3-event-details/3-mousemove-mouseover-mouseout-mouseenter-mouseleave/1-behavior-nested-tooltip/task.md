importance: 5

---

# Comportamento de tooltip melhorado

Escreva JavaScript que mostre uma tooltip sobre um elemento com o atributo `data-tooltip`. O valor desse atributo deve se tornar o texto da tooltip.

É parecido com a tarefa <info:task/behavior-tooltip>, mas aqui os elementos anotados podem ser aninhados. A tooltip mais profundamente aninhada é mostrada.

Só uma tooltip pode aparecer ao mesmo tempo.

Por exemplo:

```html
<div data-tooltip="Aqui – é o interior da casa" id="house">
  <div data-tooltip="Aqui – é o telhado" id="roof"></div>
  ...
  <a href="https://pt.wikipedia.org/wiki/Os_Três_Porquinhos" data-tooltip="Leia mais…">Passe o mouse sobre mim</a>
</div>
```

O resultado no iframe:

[iframe src="solution" height=300 border=1]
