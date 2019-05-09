importância: 4

---

# Const maiúsculo?

Examine o seguinte código:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Aqui temos uma constante `birthday` e a `age` que é calculada apartir de `birthday` com a ajuda de algum código (não é fornecido por falta de tempo, e porque os detalhes não importam aqui).

Seria correcto utilizar maiúsculas para `birthday`? Para `age`? Ou mesmo para ambos?

```js
const BIRTHDAY = '18.04.1982'; // fazer maiúsculas?

const AGE = someCode(BIRTHDAY); // fazer maiúsculas?
```

