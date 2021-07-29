function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // memorizar os últimos argumentos para a chamada depois da espera
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // caso contrário vá para o estado de espera
    func.apply(this, arguments);

    isThrottled = true;

    // planeia reinicializar isThrottled depois do atraso
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // se houver chamadas, savedThis/saveArgs tem a última
        // a chamada recursiva executa a função e configura a espera novamente
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
