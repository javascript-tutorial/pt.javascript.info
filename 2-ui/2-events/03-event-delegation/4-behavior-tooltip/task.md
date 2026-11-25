importance: 5

---

# Comportamento de tooltip

Crie o código JS para o comportamento de tooltip.

Quando o mouse passa sobre um elemento com `data-tooltip`, a tooltip deve aparecer sobre ele, e quando ele deixa de passar, ela deve ser ocultada.

Um exemplo de HTML anotado:
```html
<button data-tooltip="a tooltip é mais longa que o elemento">Botão curto</button>
<button data-tooltip="tooltip<br>em HTML">Mais um botão</button>
```

Deve funcionar assim:

[iframe src="solution" height=200 border=1]

Nesta tarefa assumimos que todos os elementos com `data-tooltip` têm só texto dentro. Sem tags aninhadas (ainda).

Detalhes:

- A distância entre o elemento e a tooltip deve ser `5px`.
- A tooltip deve ser centralizada em relação ao elemento, se possível.
- A tooltip não deve cruzar as bordas da janela. Normalmente ela deve ficar acima do elemento, mas se o elemento estiver no topo da página e não houver espaço para a tooltip, então abaixo dele.
- O conteúdo da tooltip é dado no atributo `data-tooltip`. Pode ser HTML arbitrário.

Você vai precisar de dois eventos aqui:
- `mouseover` é acionado quando o ponteiro entra sobre um elemento.
- `mouseout` é acionado quando o ponteiro deixa um elemento.

Use delegação de eventos: configure dois manipuladores em `document` para rastrear todos os "overs" e "outs" de elementos com `data-tooltip` e gerencie as tooltips a partir daí.

Depois que o comportamento for implementado, até pessoas não familiarizadas com JavaScript poderão adicionar elementos anotados.

P.S. Apenas uma tooltip pode aparecer por vez.
