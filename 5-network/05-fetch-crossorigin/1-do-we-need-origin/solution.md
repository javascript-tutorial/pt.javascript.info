Precisamos de `Origin`, porque às vezes `Referer` está ausente. Por exemplo, quando fazemos `fetch` de uma página HTTP a partir de HTTPS (acessar algo menos seguro a partir de algo mais seguro), então não há `Referer`.

A [Content Security Policy](http://en.wikipedia.org/wiki/Content_Security_Policy) pode proibir o envio de um `Referer`.

Como vamos ver, `fetch` tem opções que impedem o envio do `Referer` e até permitem alterá-lo (dentro do mesmo site).

Pela especificação, `Referer` é um cabeçalho HTTP opcional.

Exatamente porque `Referer` não é confiável, `Origin` foi inventado. O navegador garante um `Origin` correto para requisições cross-origin.
