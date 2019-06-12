function camelize(str) {
  return str
    .split('-') // divide 'my-long-word' no array ['my', 'long', 'word']
    .map(
      // capitaliza as primeiras letras de todos os itens da matriz, exceto a primeira
      // converte ['my', 'long', 'word'] em ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // junta ['my', 'Long', 'Word'] em 'myLongWord'
}
