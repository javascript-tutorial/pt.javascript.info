# Ambiente do navegador, especificações

A linguagem JavaScript foi inicialmente criada para navegadores web. Desde então, ela evoluiu para uma linguagem com muitos usos e plataformas.

Uma plataforma pode ser um navegador, ou um servidor web, ou outro *host*, ou até mesmo uma cafeteira "inteligente", se ela conseguir rodar JavaScript. Cada uma delas fornece uma funcionalidade específica da plataforma. A especificação do JavaScript chama isso de *ambiente de host*.

Um ambiente de host fornece seus próprios objetos e funções além do núcleo da linguagem. Navegadores web fornecem um meio de controlar páginas web. O Node.js fornece recursos do lado do servidor, e assim por diante.

Aqui está uma visão geral do que temos quando o JavaScript roda num navegador web:

![](windowObjects.svg)

Existe um objeto "raiz" chamado `window`. Ele tem dois papéis:

1. Primeiro, é um objeto global para o código JavaScript, como descrito no capítulo <info:global-object>.
2. Segundo, ele representa a "janela do navegador" e fornece métodos para controlá-la.

Por exemplo, podemos usá-lo como um objeto global:

```js run global
function sayHi() {
  alert("Hello");
}

// funções globais são métodos do objeto global:
window.sayHi();
```

E podemos usá-lo como uma janela do navegador, para mostrar a altura da janela:

```js run
alert(window.innerHeight); // altura interna da janela
```

Existem mais métodos e propriedades específicos da window, que vamos cobrir mais tarde.

## DOM (Document Object Model)

O Document Object Model, ou DOM para abreviar, representa todo o conteúdo da página como objetos que podem ser modificados.

O objeto `document` é o principal "ponto de entrada" para a página. Podemos mudar ou criar qualquer coisa na página usando-o.

Por exemplo:
```js run
// muda a cor de fundo para vermelho
document.body.style.background = "red";

// muda de volta depois de 1 segundo
setTimeout(() => document.body.style.background = "", 1000);
```

Aqui, usamos `document.body.style`, mas existe muito, muito mais. Propriedades e métodos são descritos na especificação: [DOM Living Standard](https://dom.spec.whatwg.org).

```smart header="DOM não é só para navegadores"
A especificação do DOM explica a estrutura de um documento e fornece objetos para manipulá-lo. Existem ferramentas não relacionadas a navegadores que também usam o DOM.

Por exemplo, scripts do lado do servidor que baixam páginas HTML e as processam também podem usar o DOM. No entanto, eles podem suportar apenas uma parte da especificação.
```

```smart header="CSSOM para estilização"
Também existe uma especificação separada, [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/), para regras CSS e folhas de estilo, que explica como elas são representadas como objetos, e como lê-las e escrevê-las.

O CSSOM é usado junto com o DOM quando modificamos regras de estilo para o documento. Na prática, porém, o CSSOM raramente é necessário, porque raramente precisamos modificar regras CSS a partir do JavaScript (geralmente só adicionamos/removemos classes CSS, sem modificar suas regras CSS), mas isso também é possível.
```

## BOM (Browser Object Model)

O Browser Object Model (BOM) representa objetos adicionais fornecidos pelo navegador (ambiente de host) para trabalhar com tudo exceto o documento.

Por exemplo:

- O objeto [navigator](mdn:api/Window/navigator) fornece informações gerais sobre o navegador e o sistema operacional. Existem muitas propriedades, mas as duas mais conhecidas são: `navigator.userAgent` -- sobre o navegador atual, e `navigator.platform` -- sobre a plataforma (pode ajudar a diferenciar entre Windows/Linux/Mac etc).
- O objeto [location](mdn:api/Window/location) nos permite ler a URL atual e pode redirecionar o navegador para uma nova.

Aqui está como podemos usar o objeto `location`:

```js run
alert(location.href); // mostra a URL atual
if (confirm("Ir para a Wikipédia?")) {
  location.href = "https://wikipedia.org"; // redireciona o navegador para outra URL
}
```

As funções `alert/confirm/prompt` também são parte do BOM: elas não estão diretamente relacionadas ao documento, mas representam métodos puramente do navegador para se comunicar com o usuário.

```smart header="Especificações"
O BOM é parte da [especificação HTML](https://html.spec.whatwg.org) geral.

Sim, você ouviu direito. A especificação HTML em <https://html.spec.whatwg.org> não é só sobre a "linguagem HTML" (tags, atributos), mas também cobre um monte de objetos, métodos e extensões de DOM específicas do navegador. Isso é "HTML em termos amplos". Além disso, algumas partes têm especificações adicionais listadas em <https://spec.whatwg.org>.
```

## Resumo

Falando sobre padrões, temos:

Especificação DOM
: Descreve a estrutura do documento, manipulações e eventos, veja <https://dom.spec.whatwg.org>.

Especificação CSSOM
: Descreve folhas de estilo e regras de estilo, manipulações com elas, e sua vinculação a documentos, veja <https://www.w3.org/TR/cssom-1/>.

Especificação HTML
: Descreve a linguagem HTML (por exemplo, tags) e também o BOM (browser object model) -- várias funções do navegador: `setTimeout`, `alert`, `location` e assim por diante, veja <https://html.spec.whatwg.org>. Ela pega a especificação DOM e a estende com muitas propriedades e métodos adicionais.

Além disso, algumas classes são descritas separadamente em <https://spec.whatwg.org/>.

Guarde esses links, já que existe tanta coisa para aprender que é impossível cobrir tudo e lembrar de tudo.

Quando você quiser ler sobre uma propriedade ou um método, o manual da Mozilla em <https://developer.mozilla.org/en-US/> também é um bom recurso, mas a especificação correspondente pode ser melhor: é mais complexa e mais longa de ler, mas vai deixar seu conhecimento fundamental sólido e completo.

Para encontrar algo, geralmente é conveniente usar uma busca na internet por "WHATWG [termo]" ou "MDN [termo]", por exemplo, <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Agora, vamos partir para aprender o DOM, porque o documento tem o papel central na UI.
