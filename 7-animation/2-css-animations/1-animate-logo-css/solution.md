
CSS para animar ambos `width` e `height`:
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

Por favor, note que `transitionend` é disparado duas vezes -- uma vez para cada propriedade. Então, se não perfomarmos uma verificação adicional, a mensagem será exibida 2 vezes.
