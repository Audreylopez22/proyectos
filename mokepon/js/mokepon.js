let ataqueJugador;
let ataqueEnemigo;
let resultado;
let vidasJugador = 3;
let vidasEnemigo = 3;

// INICIO DEL JUEGO

function iniciarJuego() {
  let sectionSeleccionarAtaque = document.getElementById("ataque");
  sectionSeleccionarAtaque.style.display = "none";

  let btnMascotaJ = document.getElementById("btnSeleccionar");
  btnMascotaJ.addEventListener("click", mascotaJugador);

  let btnFuego = document.getElementById("btnFuego");
  btnFuego.addEventListener("click", ataqueFuego);
  let btnAgua = document.getElementById("btnAgua");
  btnAgua.addEventListener("click", ataqueAgua);
  let btnTierra = document.getElementById("btnTierra");
  btnTierra.addEventListener("click", ataqueTierra);
  let btnReiniciar = document.getElementById("btnReiniciar");
  btnReiniciar.addEventListener("click", reiniciarJuego);
}

// ELECCION DE LA MASCOTA

function mascotaJugador() {
  let sectionSeleccionarMascota = document.getElementById("mascota");
  sectionSeleccionarMascota.style.display = "none";

  let sectionSeleccionarAtaque = document.getElementById("ataque");
  sectionSeleccionarAtaque.style.display = "flex";

  let a = document.getElementById("Tobias").checked;
  let b = document.getElementById("Marlito").checked;
  let c = document.getElementById("Cuchurrumi").checked;
  let mas_jugador = document.getElementById("mas_jugador");

  if (a) {
    mas_jugador.innerHTML = "Tobias";
  } else if (b) {
    mas_jugador.innerHTML = "Marlito";
  } else if (c) {
    mas_jugador.innerHTML = "Cuchurrumi";
  } else {
    alert("Selecciona una mascota ");
  }

  mascotaEnemigo();
}
// ELECCION DE LA MASCOTA DEL ENEMIGO

function mascotaEnemigo() {
  let mascotaAleatoria = aleatorio(1, 3);
  let mas_Enemigo = document.getElementById("mas_enemigo");

  if (mascotaAleatoria == 1) {
    mas_Enemigo.innerHTML = "Tobias";
  } else if (mascotaAleatoria == 2) {
    mas_Enemigo.innerHTML = "Marlito";
  } else {
    mas_Enemigo.innerHTML = "Cuchurrumi";
  }
}
function ataqueFuego() {
  ataqueJugador = "Fuego";
  ataqueAleatorioE();
}
function ataqueAgua() {
  ataqueJugador = "Agua";
  ataqueAleatorioE();
}
function ataqueTierra() {
  ataqueJugador = "Tierra";
  ataqueAleatorioE();
}
function ataqueAleatorioE() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "Fuego";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "Agua";
  } else {
    ataqueEnemigo = "Tierra";
  }
  respuesta();
}
// INICIO DEL CONVATE

function respuesta() {
  let vidas_jugador = document.getElementById("vidas_jugador");
  let vidas_enemigo = document.getElementById("vidas_enemigo");

  if (ataqueEnemigo == ataqueJugador) {
    resultado = "Empate";
  } else if (
    (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra") ||
    (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego") ||
    (ataqueJugador == "Tierra" && ataqueEnemigo == "Agua")
  ) {
    resultado = "¡GANASTE!";
    vidasEnemigo--;
    vidas_enemigo.innerHTML = vidasEnemigo;
  } else {
    resultado = "Perdiste";
    vidasJugador--;
    vidas_jugador.innerHTML = vidasJugador;
  }
  crearMensaje();

  ConteoVidas();
}

function ConteoVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("FELICITACIONES GANASTE 🎉🎊");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("LO SIENTO PERDISTE 😥");
  }
}
// MENSAJES PARA EL JUGADOR

function crearMensaje() {
  //let sectionMensajes = document.getElementById("mensajes");
  let sectionMensajes = document.getElementById("resultado");
  let ataquesDelJugador = document.getElementById("ataquesDelJugador");
  let ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo");

  //let notificacion = document.createElement("p");
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  //sectionMensajes.appendChild(notificacion);
  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);

  //let parrafo = document.createElement("p");
  //parrafo.innerHTML =
  //"Tu mascota ataco con " + ataqueJugador + " , la mascota del enemigo ataco con " + ataqueEnemigo + " " + resultado;
  //sectionMensajes.appendChild(parrafo);
}

function crearMensajeFinal(resultadoFinal) {
  let sectionMensajes = document.getElementById("resultado");

  //let parrafo = document.createElement("p");
  sectionMensajes.innerHTML = resultadoFinal;

  //sectionMensajes.appendChild(parrafo);

  // FINALMENTE REQUIERO DESHABILITAR LOS BOTONES CUANDO YA EL JUEGO TERMINE POR LO QUE USO EL COMANDO DISABLED
  let btnFuego = document.getElementById("btnFuego");
  btnFuego.disabled = true;
  let btnAgua = document.getElementById("btnAgua");
  btnAgua.disabled = true;
  let btnTierra = document.getElementById("btnTierra");
  btnTierra.disabled = true;
}
// REINICIAR JUEGO
function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Esta linea es la que inicia el juego
window.addEventListener("load", iniciarJuego);
