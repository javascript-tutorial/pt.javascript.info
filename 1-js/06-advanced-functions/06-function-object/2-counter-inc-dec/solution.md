
A solução usa `count` na variável local, mas métodos para a adição são escritos precisamente dentro de `counter`. Eles partilham o mesmo ambiente léxico exterior e podem também podem aceder à `count` corrente.
