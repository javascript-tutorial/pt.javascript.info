# Elemento timer ao vivo

Já temos o elemento `<time-formatted>` para mostrar um tempo bem formatado.

Crie o elemento `<live-timer>` para mostrar o tempo atual:

1. Ele deve usar `<time-formatted>` internamente, não duplicar sua funcionalidade.
2. Atualiza a cada segundo.
3. Para cada atualização, um evento customizado chamado `tick` deve ser gerado, com a data atual em `event.detail` (veja o capítulo <info:dispatch-events>).

Uso:

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener("tick", (event) => console.log(event.detail));
</script>
```

Demo:

[iframe src="solution" height=40]
