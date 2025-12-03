Uma janela de modal pode ser implementada usando um elemento semitransparente  `<div id="cover-div">` que cobre toda a janela, como por exemplo:

```css
#cover-div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.3;
}
```

Por conta da `<div>` cobrir todo o espaço, irá capturar todos os cliques feito dentro nela, e não na página abaixo dela.

Também podemos impedir a rolagem da página definindo `body.style.overflowY='hidden'`.

O formulário não deve estar dentro da `<div>`, mas sim ao lado dela, porque não queremos que ele tenha `opacity`.
