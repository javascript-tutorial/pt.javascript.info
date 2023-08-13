
# Autoria

Isso descreve coisas importantes sobre a autoria de novos artigos do tutorial.

## Links internos

Todos os links do tutorial devem começar da raiz, não incluindo o domínio.

✅ Tudo bem:

```md
Abordaremos isso no capítulo [sobre funções](/function-basics)
```

❌ Não está bem:

```md
Abordaremos isso no capítulo [sobre funções](https://javascript.info/function-basics)
```

Além disso, para registrar referência a um capítulo, há um esquema especial "info:", como este:

```md
Abordaremos isso no capítulo <info:function-basics>.
```

Torna-se:

```html
Abordaremos isso no capítulo <a href="/function-basics">Funções básicas</a>.
```

O título é inserido automaticamente a partir do artigo referenciado. Isso tem a vantagem de manter o título correto se o artigo for renomeado.

## TODO

Pergunte a @iliakan para mais detalhes.
