importance: 5

---

# Por que precisamos de Origin?

Como você provavelmente sabe, existe o cabeçalho HTTP `Referer`, que normalmente contém a url da página que iniciou uma requisição de rede.

Por exemplo, ao buscar `http://google.com` a partir de `http://javascript.info/some/url`, os cabeçalhos se parecem com isto:

```
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
*!*
Origin: http://javascript.info
Referer: http://javascript.info/some/url
*/!*
```

Como você pode ver, tanto `Referer` quanto `Origin` estão presentes.

As perguntas:

1. Por que `Origin` é necessário, se `Referer` tem até mais informação?
2. É possível que não haja `Referer` ou `Origin`, ou que eles estejam incorretos?
