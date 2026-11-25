function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // função shooter
      alert( i ); // deveria mostrar seu número
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

/*
let army = makeArmy();

army[0](); // o shooter número 0 mostra 10
army[5](); // e o número 5 também exibe 10...
// ... todos os shooters mostram 10 em vez de 0, 1, 2, 3...
*/
