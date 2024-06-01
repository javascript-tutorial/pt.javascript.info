importance: 5

---

# Crie uma notificação

Escreva uma função `showNotification(options)` que cria uma notificação: `<div class="notification">` com o conteúdo especificado. A notificação deve desaparecer automaticamente depois de 1.5 segundos.

As opções são:

```js
// mostra um elemento com o texto "Olá" próximo ao canto superior direito da janela
showNotification({
  top: 10, // 10px a partir do topo da janela (por padrão 0px)
  right: 10, // 10px a partir da borda a direita da janela (por padrão 0px)
  html: "Olá!", // o HTML da notificação
  className: "bem-vindo" // uma classe adicional para a div (opcional)
});
```

[demo src="solution"]

Utilize posicionamento com CSS para mostrar o elemento nas coordenadas superiores/direitas especificadas. O documento fonte possui os estilos necessários.