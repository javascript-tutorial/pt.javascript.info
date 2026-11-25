function makeArmy() {

  let shooters = [];

  for(let i = 0; i < 10; i++) {
    let shooter = function() { // função shooter
      alert( i ); // deveria mostrar seu número
    };
    shooters.push(shooter);
  }

  return shooters;
}
