# Nullish coalescing operator '??'

[recent browser="new"]

Here, in this article, we'll say that an expression is "defined" when it's neither `null` nor `undefined`.

The nullish coalescing operator is written as two question marks `??`.

The result of `a ?? b` is:
- if `a` is defined, then `a`,
- if `a` isn't defined, then `b`.


In other words, `??` returns the first argument if it's defined. Otherwise, the second one.

The nullish coalescing operator isn't anything completely new. It's just a nice syntax to get the first "defined" value of the two.

We can rewrite `result = a ?? b` using the operators that we already know, like this:

```js
result = (a !== null && a !== undefined) ? a : b;
```

The common use case for `??` is to provide a default value for a potentially undefined variable.

For example, here we show `Anonymous` if `user` isn't defined:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous
```

Of course, if `user` had any value except `null/undefined`, then we would see it instead:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John
```

<<<<<<< HEAD
<<<<<<< HEAD
Let's say, we have a `firstName`, `lastName` or `nickName`, all of them optional.

Let's choose the defined one and show it (or "Anonymous" if nothing is set):
=======
Imagine, we have a user, and there are variables `firstName`, `lastName` or `nickName` for their first name, last name and the nick name. All of them may be undefined, if the user decided not to enter any value.
=======
We can also use a sequence of `??` to select the first defined value from a list.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be undefined, if the user decided not to enter a value.

<<<<<<< HEAD
Let's use the `??` operator to select the first defined one:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
=======
We'd like to display the user name using one of these variables, or show "Anonymous" if all of them are undefined.

Let's use the `??` operator for that:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

<<<<<<< HEAD
<<<<<<< HEAD
// show the first not-null/undefined variable
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
=======
// show the first not-null/undefined value
=======
// shows the first defined value:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
```

## Comparison with ||

<<<<<<< HEAD
<<<<<<< HEAD
That's very similar to OR `||` operator. Actually, we can replace `??` with `||` in the code above and get the same result.
=======
The OR `||` operator can be used in the same way as `??`. Actually, we can replace `??` with `||` in the code above and get the same result, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

The important difference is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.
=======
The OR `||` operator can be used in the same way as `??`, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

For example, in the code above we could replace `??` with `||` and still get the same result:

<<<<<<< HEAD
<<<<<<< HEAD
For example:
=======
For example, consider this:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
=======
```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

<<<<<<< HEAD
<<<<<<< HEAD
This sets `height` to `100` if it's not defined. But if `height` is `0`, then it remains "as is".
=======
This sets `height` to `100` if it's not defined.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
=======
The OR `||` operator exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

On the other hand, the nullish coalescing operator `??` was added only recently, and the reason for that was that people weren't quite happy with `||`.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

The subtle, yet important difference is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

In other words, `||` doesn't distinguish between `false`, `0`, an empty string `""` and `null/undefined`. They are all the same -- falsy values. If any of these is the first argument of `||`, then we'll get the second argument as the result.

In practice though, we may want to use default value only when the variable is `null/undefined`. That is, when the value is really unknown/not set.

For example, consider this:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
<<<<<<< HEAD
Here, `height || 100` treats zero height as unset, same as `null`, `undefined` or any other falsy value, depeding on use cases that may be incorrect.

The `height ?? 100` returns `100` only if `height` is exactly `null` or `undefined`.

## Precedence

The precedence of the `??` operator is rather low: `7` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

That's lower than most operators and a bit higher than `=` and `?`.

So if we need to use `??` in a complex expression, then consider adding parentheses:
=======
Here, `height || 100` treats zero height as unset, same as `null`, `undefined` or any other falsy value. So the result is `100`.
=======
Here, we have a zero height.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

- The `height || 100` checks `height` for being a falsy value, and it really is.
    - so the result is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

If we assume that zero height is a valid value, that shouldn't be replaced with the default, then `??` does just the right thing.

## Precedence

The precedence of the `??` operator is rather low: `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table). So `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.

<<<<<<< HEAD
If we need to choose a value with `??` in a complex expression, then consider adding parentheses:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
=======
So if we'd like to choose a value with `??` in an expression with other operators, consider adding parentheses:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
let height = null;
let width = null;

// important: use parentheses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

<<<<<<< HEAD
<<<<<<< HEAD
Otherwise, if we omit parentheses, then `*` has the higher precedence and would run first. That would be the same as:

```js
// not correct
let area = height ?? (100 * width) ?? 50;
```

There's also a related language-level limitation. Due to safety reasons, it's forbidden to use `??` together with `&&` and `||` operators.
=======
Otherwise, if we omit parentheses, `*` has the higher precedence than `??` and would run first.

That would work be the same as:
=======
Otherwise, if we omit parentheses, then as `*` has the higher precedence than `??`, it would execute first, leading to incorrect results.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works the same as this (probably not what we want):
let area = height ?? (100 * width) ?? 50;
```

### Using ?? with && or ||

<<<<<<< HEAD
**Due to safety reasons, it's forbidden to use `??` together with `&&` and `||` operators.**
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
=======
Due to safety reasons, JavaScript forbids using `??` together with `&&` and `||` operators, unless the precedence is explicitly specified with parentheses.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

The code below triggers a syntax error:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

<<<<<<< HEAD
<<<<<<< HEAD
The limitation is surely debatable, but for some reason it was added to the language specification.

Use explicit parentheses to fix it:

```js run
let x = (1 && 2) ?? 3; // Works
=======
The limitation is surely debatable, but it was added to the language specification with the purpose to avoid programming mistakes, as people start to switch to `??` from `||`.
=======
The limitation is surely debatable, but it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch to `??` from `||`.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Use explicit parentheses to work around it:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
*/!*

>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
alert(x); // 2
```

## Summary

- The nullish coalescing operator `??` provides a short way to choose a "defined" value from the list.

    It's used to assign default values to variables:

    ```js
    // set height=100, if height is null or undefined
    height = height ?? 100;
    ```

- The operator `??` has a very low precedence, a bit higher than `?` and `=`, so consider adding parentheses when using it in an expression.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
