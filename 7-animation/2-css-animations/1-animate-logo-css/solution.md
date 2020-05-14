
CSS para aniimar ambos `width` e `height`:
```css
/* classe original */

#flyjet {
  transition: all 3s;
}

/* JS insere .growing */
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

Pro favor, note que `transitionend` é disparado duas vezes -- uma vez para cada propriedade. Então, se não perfomarmos uma verificação adicional, a mensagem será exibida 2 vezes.
