function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // memorizar os últimos argumentos a
      // chamar depois arrefecimento
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // caso contrário, passa ao estado
    // de arrefecimento
    func.apply(this, arguments);

    isThrottled = true;

    // planear reiniciar `isThrottled`
    // depois do atraso
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // se houve chamadas, `savedThis` ou
        // `savedArgs` tem a última
        // a chamada recursiva executa a função
        // e define novamente o arrefecimento
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}