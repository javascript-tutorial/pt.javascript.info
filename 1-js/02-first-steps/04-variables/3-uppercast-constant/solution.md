Nós geralmente usamos letras maiúsculas para constantes que são "hard-coded". Ou, em outras palavras, quando o valor é conhecido antes da execução e diretamente escrito no código.

Neste código, o `birthday` é exatamente assim. Então nós poderíamos usar a maiúscula para ele.

Em contraste, `age` é avaliada em tempo de execução. Hoje temos uma idade, um ano depois teremos outra. É constante no sentido de não mudar através da execução do código. Mas é um pouco "menos constante" do que `birthday`, é calculada, por isso devemos manter as minúsculas para ela.