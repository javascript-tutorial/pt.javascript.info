
# Objeto global

O objeto global fornece variáveis e funções que estão disponíveis em qualquer lugar. Em sua maioria, aqueles que são incorporados ao idioma ou ao ambiente.

No navegador ele é chamado de `window`, no Node.js é `global`, em outros ambientes pode ter outro nome.

Recentemente, `globalThis` foi adicionado a linguagem como um nome padrão para o objeto global, que deve ser suportado em todos os ambientes. Em alguns navegadores, como o "non-Chromium Edge", `globalThis` ainda não é suportado, mas pode ser facilmente utilizado através de um polyfill.

Usamos `window` aqui, assumindo que nosso ambiente seja um navegador. Se o seu script puder ser executado em outros ambientes, é melhor utilizar o `globalThis`.

Todas as propriedades do objeto global podem ser acessadas diretamente:

```js run
alert("Olá");
// é o mesmo que
window.alert("Olá");
```

No navegador, funções e variáveis globais declaradas com `var` (não `let/const`!) tornam-se propriedades do objeto global:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (se torna uma propriedade do objeto global)
```

Por favor, não confie nisso! Esse comportamento existe por motivos de compatibilidade. Scripts modernos usam [JavaScript modules](info:modules) onde tal coisa não acontece.

Se usássemos `let`, isso não aconteceria:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (não se torna uma propriedade do objeto global)
```

Se um valor é tão importante que você gostaria de deixá-lo disponível globalmente, escreva-o diretamente como uma propriedade.

```js run
*!*
// tornando globais as informações de current user, para permitir que todos os script as acessem
window.currentUser = {
  name: "John"
};
*/!*

// em outro lugar no código
alert(currentUser.name);  // John

// ou, se tivermos um variável local com o nome "currentUser"
// a obtenha explicitamente do window (seguro!)
alert(window.currentUser.name); // John
```

Dito isto, o uso de variáveis globais é geralmente desencorajado. Deve haver o menor número possível de variáveis globais. O design do código onde uma função recebe variáveis de entrada e produz certos resultados é mais claro, menos propenso a erros e mais fácil de testar do que se usar varáveis externas ou globais.

## Usando para polyfills

Usamos o objeto global para testar o suporte aos recursos modernos da linguagem.

Por exemplo, testar se o objeto `Promise` nativo existe (ele não existe em navegadores antigos):
```js run
if (!window.Promise) {
  alert("Seu navegador é muito antigo!");
}
```

Se não houver (vamos dizer que estamos em um navegador antigo), podemos criar "polyfills": adicionar funções que não são suportadas pelo ambiente, mas existem no padrão moderno.

```js run
if (!window.Promise) {
  window.Promise = ... // implementação customizada do recurso moderno da linguagem
}
```

## Resumo

- O objeto global contém variáveis que devem estar disponíveis em qualquer lugar.

    Isso inclui objetos nativos Javascript, como `Array` e valores específicos do ambiente, como `window.innerHeight` -- a altura da janela no navegador.
- O objeto global tem o nome universal `globalThis`.

    ...Porém é mais frequentemente referido pelos seu nomes específicos de ambientes "old-school", como `window` (navegador) e `global` (Node.js). Como `globalThis` é uma proposta recente, não é suportado pelo "non-Chromium Edge" (mas pode ser usado com um polyfill).
- Devemos salvar valores no objeto global apenas se eles forem realmente globais em nosso projeto. E manter sua quantidade no mínimo.
- No navegador, ao menos que estejamos usando [modules](info:modules), funções e variáveis globais declaradas com `var` tornam-se uma propriedade do objeto global.
- Para tornar nosso código à prova de mudanças no futuro e mais fácil de entender, devemos acessar as propriedades do objeto global diretamente, como `window.x`.