Sim, parece estranho de fato.

Porém, `instanceof` não se importa com a função, mas sim com o seu `prototype`, e assim procura correspondência na cadeia de protótipos.

E aqui em `a.__proto__ == B.prototype`, `instanceof` retorna `true`.

Então, pela lógica de `instanceof`, o `prototype` na verdade define o tipo, não é a função construtora.
