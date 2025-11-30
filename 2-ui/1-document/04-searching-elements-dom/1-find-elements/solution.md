
Existem muitas maneiras de fazer isso.

Aqui estão algumas delas:

```js
// 1. A tabela com `id="age-table"`.
let table = document.getElementById('age-table')

// 2. Todos os elementos label dentro dessa tabela
table.getElementsByTagName('label')
// ou
document.querySelectorAll('#age-table label')

// 3. O primeiro td nessa tabela (com a palavra "Idade")
table.rows[0].cells[0]
// ou
table.getElementsByTagName('td')[0]
// ou
table.querySelector('td')

// 4. O formulário com o nome "search"
// assumindo que existe apenas um elemento com name="search" no documento
let form = document.getElementsByName('search')[0]
// ou, especificamente, o formulário
document.querySelector('form[name="search"]')

// 5. O primeiro input nesse formulário.
form.getElementsByTagName('input')[0]
// ou
form.querySelector('input')

// 6. O último input nesse formulário
let inputs = form.querySelectorAll('input') // find all inputs
inputs[inputs.length-1] // take the last one
```
