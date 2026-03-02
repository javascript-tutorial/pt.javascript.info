
Poderia notar o seguinte:

```js no-beautify
<<<<<<< HEAD
function pow(x,n)  // <- nenhum espaço entre argumentos
{  // <- chaveta de abertura numa linha em separado
  let result=1;   // <- nenhum espaço antes ou depois de =
  for(let i=0;i<n;i++) {result*=x;}   // <- nenhum espaço
  // o conteúdo de { ... } deveria estar numa nova linha
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- tecnicamente possível,
// mas o melhor é a tornar em 2 linhas, também não existem espaços, e falta o ;
if (n<0)  // <- nenhum espaço dentro (n < 0), e deveria existir uma linha extra sobre a condição
{   // <- chaveta de abertura numa linha em separado
  // abaixo - linhas longas podem ser repartidas por múltiplas linhas para melhorar a legíbilidade
  alert(`A potência de ${n} não é suportada, por favor insira um número inteiro maior do que zero`);
=======
function pow(x,n)  // <- no space between arguments
{  // <- curly brace on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- curly brace on a separate line
  // below - long lines can be split into multiple lines for improved readability
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
}
else // <- poderia ser escrito numa única linha, como "} else {"
{
  alert(pow(x,n))  // nenhum espaço e falta o ;
}
```

A variante corrigida:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`A potência de ${n} não é suportada, por favor insira um número inteiro maior do que zero`);
} else {
  alert( pow(x, n) );
}
```
