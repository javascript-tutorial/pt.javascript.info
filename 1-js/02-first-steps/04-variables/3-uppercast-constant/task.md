importance: 4

---

# Const maiúsculo?

Examine o seguinte código:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
Aqui temos uma constante `birthday` e a `age` que é calculada apartir de `birthday` com a ajuda de algum código (não é fornecido por falta de tempo, e porque os detalhes não importam aqui).
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Seria correcto utilizar maiúsculas para `birthday`? Para `age`? Ou mesmo para ambos?

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // fazer maiúsculas?

const AGE = someCode(BIRTHDAY); // fazer maiúsculas?
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```
