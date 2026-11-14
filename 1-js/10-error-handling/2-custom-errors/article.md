# Erros personalizados, estendendo Error

Quando desenvolvemos algo, frequentemente precisamos das nossas próprias classes de erro, para refletir coisas específicas que podem dar errado nas nossas tarefas. Para erros em operações de rede, podemos precisar de `HttpError`, para operações de banco de dados, `DbError`, para operações de busca, `NotFoundError`, e assim por diante.

Nossos erros devem suportar propriedades básicas de erro, como `message`, `name` e, de preferência, `stack`. Mas eles também podem ter outras propriedades próprias, por exemplo, objetos `HttpError` podem ter uma propriedade `statusCode` com um valor como `404`, `403` ou `500`.

O JavaScript permite usar `throw` com qualquer argumento, então, tecnicamente, nossas classes de erro personalizadas não precisam herdar de `Error`. Mas se herdarmos, fica possível usar `obj instanceof Error` para identificar objetos de erro. Então é melhor herdar dele.

Conforme a aplicação cresce, nossos próprios erros naturalmente formam uma hierarquia. Por exemplo, `HttpTimeoutError` pode herdar de `HttpError`, e assim por diante.

## Estendendo Error

Como exemplo, vamos considerar uma função `readUser(json)` que deve ler um JSON com dados de usuário.

Aqui está um exemplo de como um `json` válido pode parecer:
```js
let json = `{ "name": "John", "age": 30 }`;
```

Internamente, vamos usar `JSON.parse`. Se ele receber um `json` malformado, então lança `SyntaxError`. Mas mesmo que o `json` seja sintaticamente correto, isso não significa que seja um usuário válido, certo? Pode faltar os dados necessários. Por exemplo, pode não ter as propriedades `name` e `age`, que são essenciais para nossos usuários.

Nossa função `readUser(json)` não vai só ler o JSON, mas também verificar ("validar") os dados. Se faltarem campos obrigatórios, ou o formato estiver errado, isso é um erro. E não é um `SyntaxError`, porque os dados são sintaticamente corretos, mas outro tipo de erro. Vamos chamá-lo de `ValidationError` e criar uma classe para ele. Um erro desse tipo também deve carregar a informação sobre o campo problemático.

Nossa classe `ValidationError` deve herdar da classe `Error`.

A classe `Error` é nativa, mas aqui está seu código aproximado, para que possamos entender o que estamos estendendo:

```js
// O "pseudocódigo" da classe Error nativa, definida pelo próprio JavaScript
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (nomes diferentes para diferentes classes de erro nativas)
    this.stack = <call stack>; // não padronizado, mas suportado pela maioria dos ambientes
  }
}
```

Agora vamos herdar `ValidationError` dela e testá-la em ação:

```js run
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Opa!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Opa!
  alert(err.name); // ValidationError
  alert(err.stack); // uma lista de chamadas aninhadas, com números de linha para cada uma
}
```

Repare: na linha `(1)` chamamos o construtor do pai. O JavaScript exige que chamemos `super` no construtor filho, então isso é obrigatório. O construtor do pai define a propriedade `message`.

O construtor do pai também define a propriedade `name` como `"Error"`, então na linha `(2)` nós a redefinimos para o valor certo.

Vamos tentar usá-la em `readUser(json)`:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Uso
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("Faltando o campo: age");
  }
  if (!user.name) {
    throw new ValidationError("Faltando o campo: name");
  }

  return user;
}

// Exemplo funcionando com try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Dados inválidos: " + err.message); // Dados inválidos: Faltando o campo: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("Erro de sintaxe no JSON: " + err.message);
  } else {
    throw err; // erro desconhecido, relança (**)
  }
}
```

O bloco `try..catch` no código acima trata tanto nosso `ValidationError` quanto o `SyntaxError` nativo, vindo do `JSON.parse`.

Dê uma olhada em como usamos `instanceof` para checar o tipo específico de erro na linha `(*)`.

Também poderíamos olhar para `err.name`, assim:

```js
// ...
// em vez de (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```

A versão com `instanceof` é bem melhor, porque no futuro vamos estender `ValidationError`, criando subtipos dela, como `PropertyRequiredError`. E a checagem com `instanceof` vai continuar funcionando para as novas classes que herdarem. Então isso é à prova de futuro.

Também é importante que, se o `catch` encontrar um erro desconhecido, ele o relance na linha `(**)`. O bloco `catch` só sabe tratar erros de validação e de sintaxe; outros tipos (causados por um erro de digitação no código ou outros motivos desconhecidos) devem passar adiante.

## Mais herança

A classe `ValidationError` é bem genérica. Muitas coisas podem dar errado. A propriedade pode estar ausente, ou pode estar em um formato errado (como um valor string para `age` em vez de um número). Vamos criar uma classe mais concreta, `PropertyRequiredError`, exatamente para propriedades ausentes. Ela vai carregar informações adicionais sobre a propriedade que está faltando.

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("Faltando a propriedade: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Uso
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Exemplo funcionando com try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Dados inválidos: " + err.message); // Dados inválidos: Faltando a propriedade: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("Erro de sintaxe no JSON: " + err.message);
  } else {
    throw err; // erro desconhecido, relança
  }
}
```

A nova classe `PropertyRequiredError` é fácil de usar: só precisamos passar o nome da propriedade: `new PropertyRequiredError(property)`. A `message` legível para humanos é gerada pelo construtor.

Repare que o `this.name` no construtor de `PropertyRequiredError` é, de novo, atribuído manualmente. Isso pode ficar meio repetitivo -- atribuir `this.name = <nome da classe>` em cada classe de erro personalizada. Podemos evitar isso criando nossa própria classe "básica de erro" que atribui `this.name = this.constructor.name`. E então herdar todos os nossos erros personalizados dela.

Vamos chamá-la de `MyError`.

Aqui está o código com `MyError` e outras classes de erro personalizadas, simplificado:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("Faltando a propriedade: " + property);
    this.property = property;
  }
}

// o nome está correto
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Agora os erros personalizados ficam bem mais curtos, especialmente `ValidationError`, já que nos livramos da linha `"this.name = ..."` no construtor.

## Empacotando exceções

O propósito da função `readUser` no código acima é "ler os dados do usuário". Diferentes tipos de erro podem ocorrer durante o processo. No momento, temos `SyntaxError` e `ValidationError`, mas no futuro a função `readUser` pode crescer e provavelmente gerar outros tipos de erros.

O código que chama `readUser` deve tratar esses erros. No momento, ele usa vários `if`s dentro do bloco `catch`, que checam a classe e tratam os erros conhecidos, relançando os desconhecidos.

O esquema é mais ou menos assim:

```js
try {
  ...
  readUser()  // a fonte potencial do erro
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // trata erros de validação
  } else if (err instanceof SyntaxError) {
    // trata erros de sintaxe
  } else {
    throw err; // erro desconhecido, relança
  }
}
```

No código acima, podemos ver dois tipos de erro, mas pode haver mais.

Se a função `readUser` gerar vários tipos de erro, então deveríamos nos perguntar: será que realmente queremos checar todos os tipos de erro um por um, toda vez?

Muitas vezes a resposta é "Não": gostaríamos de estar "um nível acima de tudo isso". Só queremos saber se houve um "erro de leitura de dados" -- o motivo exato pelo qual aconteceu, muitas vezes, é irrelevante (a mensagem de erro já descreve isso). Ou, melhor ainda, gostaríamos de ter uma forma de obter os detalhes do erro, mas só se precisarmos.

A técnica que descrevemos aqui é chamada de "empacotamento de exceções" (*wrapping exceptions*).

1. Vamos criar uma nova classe `ReadError` para representar um erro genérico de "leitura de dados".
2. A função `readUser` vai capturar os erros de leitura de dados que ocorrerem dentro dela, como `ValidationError` e `SyntaxError`, e gerar um `ReadError` no lugar.
3. O objeto `ReadError` vai manter a referência ao erro original na sua propriedade `cause`.

Então o código que chama `readUser` só vai precisar checar por `ReadError`, não por cada tipo de erro de leitura de dados. E, se precisar de mais detalhes de um erro, pode checar sua propriedade `cause`.

Aqui está o código que define `ReadError` e demonstra seu uso em `readUser` e `try..catch`:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Erro de sintaxe", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Erro de validação", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Erro original: SyntaxError: Unexpected token b in JSON at position 1
    alert("Erro original: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

No código acima, `readUser` funciona exatamente como descrito -- captura erros de sintaxe e de validação, e lança erros `ReadError` no lugar deles (erros desconhecidos são relançados normalmente).

Então o código externo checa `instanceof ReadError`, e só isso. Não precisa listar todos os tipos possíveis de erro.

A abordagem é chamada de "empacotamento de exceções", porque pegamos exceções de "baixo nível" e as "empacotamos" em um `ReadError`, que é mais abstrato. Isso é amplamente usado em programação orientada a objetos.

## Resumo

- Podemos herdar de `Error` e de outras classes de erro nativas normalmente. Só precisamos tomar cuidado com a propriedade `name` e não esquecer de chamar `super`.
- Podemos usar `instanceof` para checar erros específicos. Isso também funciona com herança. Mas às vezes temos um objeto de erro vindo de uma biblioteca de terceiros, e não há uma forma fácil de obter sua classe. Nesse caso, a propriedade `name` pode ser usada para essas checagens.
- Empacotar exceções é uma técnica bastante difundida: uma função trata exceções de baixo nível e cria erros de nível mais alto no lugar das várias de baixo nível. As exceções de baixo nível às vezes se tornam propriedades desse objeto, como `err.cause` nos exemplos acima, mas isso não é estritamente obrigatório.
