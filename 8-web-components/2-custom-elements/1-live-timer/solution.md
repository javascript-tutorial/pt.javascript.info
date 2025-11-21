Observe:

1. Limpamos o temporizador `setInterval` quando o elemento é removido do documento. Isso é importante, caso contrário ele continua atualizando mesmo que não seja mais necessário. E o navegador não consegue limpar a memória deste elemento e referenciados por ele.
2. Podemos acessar a data atual como propriedade `elem.date`. Todos os métodos e propriedades da classe são naturalmente métodos e propriedades do elemento.
