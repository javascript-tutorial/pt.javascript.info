
# Objetos URL

A classe nativa [URL](https://url.spec.whatwg.org/#api) fornece uma interface conveniente para criar e analisar URLs.

Não existem métodos de rede que exijam exatamente um objeto `URL`, strings são boas o suficiente. Então, tecnicamente, não precisamos usar `URL`. Mas às vezes isso pode ser muito útil.

## Criando uma URL

A sintaxe para criar um novo objeto `URL`:

```js
new URL(url, [base])
```

- **`url`** -- a URL completa ou só o caminho (se base estiver definido, veja abaixo),
- **`base`** -- uma URL base opcional: se definida e o argumento `url` tiver só o caminho, então a URL é gerada em relação a `base`.

Por exemplo:

```js
let url = new URL('https://javascript.info/profile/admin');
```

Estas duas URLs são iguais:

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Podemos facilmente criar uma nova URL baseada no caminho relativo a uma URL existente:

```js run
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

O objeto `URL` imediatamente nos permite acessar seus componentes, então é uma boa forma de analisar a url, por exemplo:

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

Aqui está a cola de referência para os componentes da URL:

![](url-object.svg)

- `href` é a url completa, igual a `url.toString()`
- `protocol` termina com o caractere de dois-pontos `:`
- `search` - uma string de parâmetros, começa com o ponto de interrogação `?`
- `hash` começa com o caractere de hash `#`
- também pode haver propriedades `user` e `password` se houver autenticação HTTP presente: `http://login:password@site.com` (não representado acima, raramente usado).


```smart header="Podemos passar objetos `URL` para métodos de rede (e a maioria dos outros) em vez de uma string"
Podemos usar um objeto `URL` em `fetch` ou `XMLHttpRequest`, quase em todo lugar onde uma string de URL é esperada.

Em geral, o objeto `URL` pode ser passado para qualquer método em vez de uma string, já que a maioria dos métodos vai realizar a conversão de string, que transforma um objeto `URL` numa string com a URL completa.
```

## SearchParams "?..."

Digamos que queremos criar uma url com determinados parâmetros de busca, por exemplo, `https://google.com/search?query=JavaScript`.

Podemos fornecê-los na string da URL:

```js
new URL('https://google.com/search?query=JavaScript')
```

...Mas os parâmetros precisam ser codificados se contiverem espaços, letras não latinas, etc (mais sobre isso abaixo).

Então existe uma propriedade de URL para isso: `url.searchParams`, um objeto do tipo [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

Ele fornece métodos convenientes para parâmetros de busca:

- **`append(name, value)`** -- adiciona o parâmetro pelo `name`,
- **`delete(name)`** -- remove o parâmetro pelo `name`,
- **`get(name)`** -- obtém o parâmetro pelo `name`,
- **`getAll(name)`** -- obtém todos os parâmetros com o mesmo `name` (isso é possível, por exemplo, `?user=John&user=Pete`),
- **`has(name)`** -- checa a existência do parâmetro pelo `name`,
- **`set(name, value)`** -- define/substitui o parâmetro,
- **`sort()`** -- ordena os parâmetros por nome, raramente necessário,
- ...e também é iterável, parecido com `Map`.

Um exemplo com parâmetros que contêm espaços e sinais de pontuação:

```js run
let url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // parâmetro adicionado com um espaço e um !

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // parâmetro adicionado com dois-pontos :

// os parâmetros são codificados automaticamente
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// itera sobre os parâmetros de busca (decodificados)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, depois tbs=qdr:y
}
```


## Codificação

Existe um padrão, [RFC3986](https://tools.ietf.org/html/rfc3986), que define quais caracteres são permitidos em URLs e quais não são.

Aqueles que não são permitidos devem ser codificados, por exemplo, letras não latinas e espaços - substituídos pelos seus códigos UTF-8, prefixados por `%`, como `%20` (um espaço pode ser codificado por `+`, por motivos históricos, mas isso é uma exceção).

A boa notícia é que objetos `URL` cuidam de tudo isso automaticamente. Basta fornecer todos os parâmetros sem codificação e então converter o objeto `URL` para string:

```js run
// usando alguns caracteres cirílicos neste exemplo

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```

Como você pode ver, tanto `Тест` no caminho da url quanto `ъ` no parâmetro são codificados.

A URL ficou mais longa, porque cada letra cirílica é representada com dois bytes em UTF-8, então existem duas entidades `%..`.

### Codificando strings

Nos tempos antigos, antes dos objetos `URL` aparecerem, as pessoas usavam strings para URLs.

Hoje em dia, objetos `URL` costumam ser mais convenientes, mas strings ainda podem ser usadas também. Em muitos casos, usar uma string deixa o código mais curto.

Se usarmos uma string, porém, precisamos codificar/decodificar caracteres especiais manualmente.

Existem funções nativas para isso:

- [encodeURI](mdn:/JavaScript/Reference/Global_Objects/encodeURI) - codifica a URL como um todo.
- [decodeURI](mdn:/JavaScript/Reference/Global_Objects/decodeURI) - decodifica de volta.
- [encodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/encodeURIComponent) - codifica um componente de URL, como um parâmetro de busca, ou um hash, ou um pathname.
- [decodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/decodeURIComponent) - decodifica de volta.

Uma pergunta natural é: "Qual é a diferença entre `encodeURIComponent` e `encodeURI`? Quando devemos usar cada um?"

Isso é fácil de entender se olharmos para a URL, dividida em componentes na imagem acima:

```
https://site.com:8080/path/page?p1=v1&p2=v2#hash
```

Como podemos ver, caracteres como `:`, `?`, `=`, `&`, `#` são permitidos na URL.

...Por outro lado, se olharmos para um único componente da URL, como um parâmetro de busca, esses caracteres precisam ser codificados, para não quebrar a formatação.

- `encodeURI` codifica só os caracteres que são totalmente proibidos na URL.
- `encodeURIComponent` codifica os mesmos caracteres, e, além deles, os caracteres `#`, `$`, `&`, `+`, `,`, `/`, `:`, `;`, `=`, `?` e `@`.

Então, para uma URL inteira podemos usar `encodeURI`:

```js run
// usando caracteres cirílicos no caminho da url
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

...Enquanto para parâmetros de URL devemos usar `encodeURIComponent`:

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

Compare com `encodeURI`:

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

Como podemos ver, `encodeURI` não codifica `&`, já que esse é um caractere legítimo na URL como um todo.

Mas devemos codificar `&` dentro de um parâmetro de busca, caso contrário, obtemos `q=Rock&Roll` - que é na verdade `q=Rock` mais algum parâmetro obscuro `Roll`. Não como pretendido.

Então devemos usar só `encodeURIComponent` para cada parâmetro de busca, para inseri-lo corretamente na string da URL. O mais seguro é codificar tanto o nome quanto o valor, a menos que tenhamos absoluta certeza de que ele tem só caracteres permitidos.

````smart header="Diferença de codificação comparada a `URL`"
As classes [URL](https://url.spec.whatwg.org/#url-class) e [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) são baseadas na especificação URI mais recente: [RFC3986](https://tools.ietf.org/html/rfc3986), enquanto as funções `encode*` são baseadas na versão obsoleta [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

Existem algumas diferenças, por exemplo, endereços IPv6 são codificados de forma diferente:

```js run
// url válida com endereço IPv6
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

Como podemos ver, `encodeURI` substituiu os colchetes `[...]`, o que não está correto, a razão é: urls IPv6 não existiam na época do RFC2396 (agosto de 1998).

Esses casos são raros, as funções `encode*` funcionam bem na maior parte do tempo.
````
