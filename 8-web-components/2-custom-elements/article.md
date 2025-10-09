# Elementos customizados

Podemos criar elementos HTML customizados, descritos por nossa classe, com seus próprios métodos e propriedades, eventos e assim por diante.

Uma vez que um elemento customizado é definido, podemos usá-lo em paridade com elementos HTML nativos.

Isso é ótimo, pois o dicionário HTML é rico, mas não infinito. Não existem `<easy-tabs>`, `<sliding-carousel>`, `<beautiful-upload>`... Pense em qualquer outra tag que possamos precisar.

Podemos defini-los com uma classe especial, e então usá-los como se sempre fizessem parte do HTML.

Existem dois tipos de elementos customizados:

1. **Elementos customizados autônomos** -- elementos "completamente novos", estendendo a classe abstrata `HTMLElement`.
2. **Elementos nativos customizados** -- estendendo elementos nativos, como um botão customizado, baseado em `HTMLButtonElement` etc.

Primeiro vamos cobrir elementos autônomos, e depois passar para os elementos nativos customizados.

Para criar um elemento customizado, precisamos informar ao navegador vários detalhes sobre ele: como mostrá-lo, o que fazer quando o elemento é adicionado ou removido da página, etc.

Isso é feito criando uma classe com métodos especiais. É fácil, pois há apenas alguns métodos, e todos eles são opcionais.

Aqui está um esboço com a lista completa:

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // elemento criado
  }

  connectedCallback() {
    // o navegador chama este método quando o elemento é adicionado ao documento
    // (pode ser chamado muitas vezes se um elemento for repetidamente adicionado/removido)
  }

  disconnectedCallback() {
    // o navegador chama este método quando o elemento é removido do documento
    // (pode ser chamado muitas vezes se um elemento for repetidamente adicionado/removido)
  }

  static get observedAttributes() {
    return [
      /* array de nomes de atributos para monitorar mudanças */
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // chamado quando um dos atributos listados acima é modificado
  }

  adoptedCallback() {
    // chamado quando o elemento é movido para um novo documento
    // (acontece em document.adoptNode, muito raramente usado)
  }

  // pode haver outros métodos e propriedades do elemento
}
```

Depois disso, precisamos registrar o elemento:

```js
// deixe o navegador saber que <my-element> é servido por nossa nova classe
customElements.define("my-element", MyElement);
```

Agora para qualquer elemento HTML com tag `<my-element>`, uma instância de `MyElement` é criada, e os métodos mencionados são chamados. Também podemos usar `document.createElement('my-element')` em JavaScript.

```smart header="Nome do elemento customizado deve conter um hífen `-`"
O nome do elemento customizado deve ter um hífen `-`, por exemplo `my-element`e`super-button`são nomes válidos, mas`myelement` não é.

Isso é para garantir que não haja conflitos de nomes entre elementos HTML nativos e customizados.

````

## Exemplo: "time-formatted"

Por exemplo, já existe o elemento `<time>` em HTML, para data/hora. Mas ele não faz nenhuma formatação por si só.

Vamos criar o elemento `<time-formatted>` que exibe o tempo em um formato agradável e consciente do idioma:


```html run height=50 autorun="no-epub"
<script>
*!*
class TimeFormatted extends HTMLElement { // (1)
*/!*

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

*!*
customElements.define("time-formatted", TimeFormatted); // (2)
*/!*
</script>

<!-- (3) -->
*!*
<time-formatted datetime="2019-12-01"
*/!*
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
````

1. A classe tem apenas um método `connectedCallback()` -- o navegador o chama quando o elemento `<time-formatted>` é adicionado à página (ou quando o parser HTML o detecta), e ele usa o formatador de data [Intl.DateTimeFormat](mdn:/JavaScript/Reference/Global_Objects/DateTimeFormat) nativo, bem suportado entre os navegadores, para mostrar um tempo bem formatado.
2. Precisamos registrar nosso novo elemento com `customElements.define(tag, class)`.
3. E então podemos usá-lo em qualquer lugar.

```smart header="Atualização de elementos customizados"
Se o navegador encontrar qualquer elemento `<time-formatted>` antes de `customElements.define`, isso não é um erro. Mas o elemento ainda é desconhecido, assim como qualquer tag não-padrão.

Tais elementos "indefinidos" podem ser estilizados com o seletor CSS `:not(:defined)`.

Quando `customElement.define` é chamado, eles são "atualizados": uma nova instância de `TimeFormatted`
é criada para cada um, e `connectedCallback` é chamado. Eles se tornam `:defined`.

Para obter informações sobre elementos customizados, existem métodos:
- `customElements.get(name)` -- retorna a classe para um elemento customizado com o `name` dado,
- `customElements.whenDefined(name)` -- retorna uma promise que resolve (sem valor) quando um elemento customizado com o `name` dado se torna definido.
```

```smart header="Renderização em `connectedCallback`, não em `constructor`"
No exemplo acima, o conteúdo do elemento é renderizado (criado) em `connectedCallback`.

Por que não no `constructor`?

A razão é simples: quando `constructor` é chamado, ainda é muito cedo. O elemento é criado, mas o navegador ainda não processou/atribuiu atributos nesta etapa: chamadas para `getAttribute` retornariam `null`. Então não podemos realmente renderizar lá.

Além disso, se você pensar sobre isso, é melhor em termos de performance -- adiar o trabalho até que seja realmente necessário.

O `connectedCallback` é disparado quando o elemento é adicionado ao documento. Não apenas anexado a outro elemento como filho, mas realmente se torna parte da página. Então podemos construir DOM desconectado, criar elementos e prepará-los para uso posterior. Eles só serão realmente renderizados quando chegarem à página.

````

## Observando atributos

Na implementação atual de `<time-formatted>`, após o elemento ser renderizado, mudanças posteriores nos atributos não têm nenhum efeito. Isso é estranho para um elemento HTML. Normalmente, quando mudamos um atributo, como `a.href`, esperamos que a mudança seja imediatamente visível. Então vamos corrigir isso.

Podemos observar atributos fornecendo sua lista no getter estático `observedAttributes()`. Para tais atributos, `attributeChangedCallback` é chamado quando eles são modificados. Não é disparado para outros atributos não listados (isso é por razões de performance).

Aqui está um novo `<time-formatted>`, que se atualiza automaticamente quando os atributos mudam:

```html run autorun="no-epub" height=50
<script>
class TimeFormatted extends HTMLElement {

*!*
  render() { // (1)
*/!*
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

*!*
  connectedCallback() { // (2)
*/!*
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

*!*
  static get observedAttributes() { // (3)
*/!*
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

*!*
  attributeChangedCallback(name, oldValue, newValue) { // (4)
*/!*
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
*!*
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
*/!*
</script>
````

1. A lógica de renderização é movida para o método auxiliar `render()`.
2. Chamamos ele uma vez quando o elemento é inserido na página.
3. Para uma mudança de atributo, listado em `observedAttributes()`, `attributeChangedCallback` é disparado.
4. ...e re-renderiza o elemento.
5. No final, podemos facilmente fazer um timer ao vivo.

## Ordem de renderização

Quando o parser HTML constrói o DOM, os elementos são processados um após o outro, pais antes dos filhos. Por exemplo, se tivermos `<outer><inner></inner></outer>`, então o elemento `<outer>` é criado e conectado ao DOM primeiro, e depois `<inner>`.

Isso leva a consequências importantes para elementos customizados.

Por exemplo, se um elemento customizado tentar acessar `innerHTML` em `connectedCallback`, ele não obtém nada:

```html run height=40
<script>
  customElements.define('user-info', class extends HTMLElement {

    connectedCallback() {
  *!*
      alert(this.innerHTML); // empty (*)
  */!*
    }

  });
</script>

*!*
<user-info>John</user-info>
*/!*
```

Se você executar, o `alert` está vazio.

Isso é exatamente porque não há filhos nessa etapa, o DOM está incompleto. O parser HTML conectou o elemento customizado `<user-info>`, e vai prosseguir para seus filhos, mas ainda não o fez.

Se quisermos passar informações para o elemento customizado, podemos usar atributos. Eles estão disponíveis imediatamente.

Ou, se realmente precisarmos dos filhos, podemos adiar o acesso a eles com `setTimeout` de zero delay.

Isso funciona:

```html run height=40
<script>
  customElements.define('user-info', class extends HTMLElement {

    connectedCallback() {
  *!*
      setTimeout(() => alert(this.innerHTML)); // John (*)
  */!*
    }

  });
</script>

*!*
<user-info>John</user-info>
*/!*
```

Agora o `alert` na linha `(*)` mostra "John", pois executamos de forma assíncrona, após o parsing HTML estar completo. Podemos processar filhos se necessário e finalizar a inicialização.

Por outro lado, esta solução também não é perfeita. Se elementos customizados aninhados também usarem `setTimeout` para se inicializar, então eles fazem fila: o `setTimeout` externo é disparado primeiro, e depois o interno.

Então o elemento externo termina a inicialização antes do interno.

Vamos demonstrar isso no exemplo:

```html run height=0
<script>
  customElements.define(
    "user-info",
    class extends HTMLElement {
      connectedCallback() {
        alert(`${this.id} connected.`);
        setTimeout(() => alert(`${this.id} initialized.`));
      }
    }
  );
</script>

*!*
<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>
*/!*
```

Ordem de saída:

1. outer connected.
2. inner connected.
3. outer initialized.
4. inner initialized.

Podemos claramente ver que o elemento externo termina a inicialização `(3)` antes do interno `(4)`.

Não há callback nativo que seja disparado após elementos aninhados estarem prontos. Se necessário, podemos implementar tal coisa por conta própria. Por exemplo, elementos internos podem disparar eventos como `initialized`, e os externos podem escutar e reagir a eles.

## Elementos nativos customizados

Novos elementos que criamos, como `<time-formatted>`, não têm semântica associada. Eles são desconhecidos para mecanismos de busca, e dispositivos de acessibilidade não conseguem lidar com eles.

Mas tais coisas podem ser importantes. Por exemplo, um mecanismo de busca estaria interessado em saber que realmente mostramos um tempo. E se estamos fazendo um tipo especial de botão, por que não reutilizar a funcionalidade existente do `<button>`?

Podemos estender e customizar elementos HTML nativos herdando de suas classes.

Por exemplo, botões são instâncias de `HTMLButtonElement`, vamos construir sobre isso.

1. Estenda `HTMLButtonElement` com nossa classe:

   ```js
   class HelloButton extends HTMLButtonElement {
     /* métodos do elemento customizado */
   }
   ```

2. Forneça o terceiro argumento para `customElements.define`, que especifica a tag:

   ```js
   customElements.define('hello-button', HelloButton, *!*{extends: 'button'}*/!*);
   ```

   Pode haver diferentes tags que compartilham a mesma classe DOM, é por isso que especificar `extends` é necessário.

3. No final, para usar nosso elemento customizado, insira uma tag `<button>` regular, mas adicione `is="hello-button"` a ela:
   ```html
   <button is="hello-button">...</button>
   ```

Aqui está um exemplo completo:

```html run autorun="no-epub"
<script>
  // O botão que diz "hello" ao clicar
  class HelloButton extends HTMLButtonElement {
  *!*
    constructor() {
  */!*
      super();
      this.addEventListener('click', () => alert("Hello!"));
    }
  }

  *!*
  customElements.define('hello-button', HelloButton, {extends: 'button'});
  */!*
</script>

*!*
<button is="hello-button">Click me</button>
*/!* *!*
<button is="hello-button" disabled>Disabled</button>
*/!*
```

Nosso novo botão estende o nativo. Então ele mantém os mesmos estilos e recursos padrão como o atributo `disabled`.

## Referências

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- Compatibilidade: <https://caniuse.com/#feat=custom-elementsv1>.

## Resumo

Elementos customizados podem ser de dois tipos:

1. "Autônomos" -- novas tags, estendendo `HTMLElement`.

   Esquema de definição:

   ```js
   class MyElement extends HTMLElement {
     constructor() {
       super(); /* ... */
     }
     connectedCallback() {
       /* ... */
     }
     disconnectedCallback() {
       /* ... */
     }
     static get observedAttributes() {
       return [
         /* ... */
       ];
     }
     attributeChangedCallback(name, oldValue, newValue) {
       /* ... */
     }
     adoptedCallback() {
       /* ... */
     }
   }
   customElements.define("my-element", MyElement);
   /* <my-element> */
   ```

2. "Elementos nativos customizados" -- extensões de elementos existentes.

   Requer um argumento adicional no `.define`, e `is="..."` no HTML:

   ```js
   class MyButton extends HTMLButtonElement {
     /*...*/
   }
   customElements.define("my-button", MyElement, { extends: "button" });
   /* <button is="my-button"> */
   ```

Elementos customizados são bem suportados entre navegadores. Existe um polyfill <https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs>.
