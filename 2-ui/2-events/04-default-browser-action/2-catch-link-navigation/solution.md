Esse é um ótimo uso do padrão de delegação de eventos.

Na vida real, em vez de perguntar, podemos enviar uma requisição de "log" ao servidor que salva a informação sobre por onde o visitante saiu. Ou podemos carregar o conteúdo e mostrá-lo diretamente na página (se permitido).

Tudo que precisamos é capturar `contents.onclick` e usar `confirm` para perguntar ao usuário. Uma boa ideia seria usar `link.getAttribute('href')` em vez de `link.href` para a URL. Veja a solução para os detalhes.
