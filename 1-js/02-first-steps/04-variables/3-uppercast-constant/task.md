importance: 4

---

# Const maiúsculo?

Examine o seguinte código:

```js
const birthday = "18.04.1982";

const age = someCode(birthday);
```

Aqui temos uma constante `birthday` para a data, e também a constante `age`.

A `age` é calculada a partir de `birthday` usando `someCode()`, o que significa uma chamada de função que ainda não explicamos (falaremos em breve!), mas os detalhes não importam aqui; o importante é que a `age` é calculada de alguma forma com base na `birthday`.

Seria correcto utilizar maiúsculas para `birthday`? Para `age`? Ou mesmo para ambos?

```js
const BIRTHDAY = "18.04.1982"; // fazer birthday maiúscula?

const AGE = someCode(BIRTHDAY); // fazer age maiúscula?
```
