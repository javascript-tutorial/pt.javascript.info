
Podemos ver a qual classe ele pertence exibindo-o, assim:

```js run
alert(document); // [object HTMLDocument]
```

Ou:

```js run
alert(document.constructor.name); // HTMLDocument
```

Então, `document` é uma instância da classe `HTMLDocument`.

Qual é o seu lugar na hierarquia?

Sim, poderíamos navegar pela especificação, mas seria mais rápido descobrir manualmente.

Vamos percorrer a cadeia de protótipos via `__proto__`.

Como sabemos, os métodos de uma classe estão no `prototype` do construtor. Por exemplo, `HTMLDocument.prototype` tem métodos para documentos.

Além disso, há uma referência à função construtora dentro do `prototype`:

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

Para obter o nome da classe como uma string, podemos usar `constructor.name`. Vamos fazer isso para toda a cadeia de protótipos do `document`, até a classe `Node`:

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

Essa é a hierarquia.

Também poderíamos examinar o objeto usando `console.dir(document)` e ver esses nomes abrindo `__proto__`. O console obtém esses nomes internamente a partir de `constructor`.
