function isEmpty(obj) {
  for (let key in obj) {
    // se o laço começou, existe uma propriedade
    return false;
  }
  return true;
}
