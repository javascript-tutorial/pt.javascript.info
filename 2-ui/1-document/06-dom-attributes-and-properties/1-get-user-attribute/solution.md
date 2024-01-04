
```html run height=100
<!DOCTYPE html>
<html>
<body>

  <div data-widget-name="menu">Escolha o gênero</div>

  <script>
    // Obtendo o elemento
    let elem = document.querySelector('[data-widget-name]');

    // lendo o valor
    alert(elem.dataset.widgetName);
    // ou
    alert(elem.getAttribute('data-widget-name'));
  </script>
</body>
</html>
```
