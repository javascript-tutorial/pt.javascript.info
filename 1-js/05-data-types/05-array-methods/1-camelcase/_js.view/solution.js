function camelize(str) {
  return str
    .split('-') // separa 'my-long-word' em um array ['my', 'long', 'word']
    .map(
      // deixa as primeiras letras de todos os itens do array em maiúsculo exceto o primeiro item
      // converte ['my', 'long', 'word'] em ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // une ['my', 'Long', 'Word'] formando 'myLongWord'
}
