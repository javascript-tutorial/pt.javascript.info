importance: 5

---

# Searching algorithm

The task has two parts.

<<<<<<< HEAD
We have an object:
=======
Given the following objects:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1. Use `__proto__` to assign prototypes in a way that any property lookup will follow the path: `pockets` -> `bed` -> `table` -> `head`. For instance, `pockets.pen` should be `3` (found in `table`), and `bed.glasses` should be `1` (found in `head`).
2. Answer the question: is it faster to get `glasses` as `pockets.glasses` or `head.glasses`? Benchmark if needed.
