function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function eleccion(jugada) {
  let resultado = "";
  if (jugada == 1) {
    resultado = "Piedra 🥌";
  } else if (jugada == 2) {
    resultado = "Papel 🧾 ";
  } else if (jugada == 3) {
    resultado = "Tijera ✂ ";
  } else {
    resultado = "Hiciste una eleccion no valida";
  }
  return resultado;
}

// 1 es piedra, 2 es papel y 3 es tijera
let Jugador = 0;
let pc = 0;

let triunfos = 0;
let perdidas = 0;

while (triunfos < 3 && perdidas < 3) {
  pc = aleatorio(1, 3);
  Jugador = prompt("Elige: 1 para piedra, 2 para papel y 3 para tijera");
  //alert ("Elegiste "+ Jugador)
  alert("Pc elije: " + eleccion(pc));
  alert("Tu elijes: " + eleccion(Jugador));
  // combate
  if (pc == Jugador) {
    alert("Empate");
  } else if (
    (Jugador == 1 && pc == 3) ||
    (Jugador == 3 && pc == 2) ||
    (Jugador == 2 && pc == 1)
  ) {
    alert("Ganaste");
    triunfos += 1;
  } else {
    alert("perdiste");
    perdidas += 1;
  }
}
alert("Ganaste " + triunfos + " veces. Perdiste " + perdidas + " veces.");
