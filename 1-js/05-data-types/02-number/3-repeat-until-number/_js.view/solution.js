
function readNumber() {
  let num;

  do {
    num = prompt("Entre um número por favor?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}
