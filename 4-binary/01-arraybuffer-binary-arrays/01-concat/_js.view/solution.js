function concat(arrays) {
  // soma dos comprimentos individuais dos arrays
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  let result = new Uint8Array(totalLength);

  if (!arrays.length) return result;

  // para cada array - copie-o sobre o resultado
  // O próximo array é copiado imediatamente após o anterior.
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
