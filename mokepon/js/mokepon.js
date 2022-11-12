const sectionSeleccionarAtaque = document.getElementById("ataque");
const btnMascotaJ = document.getElementById("btnSeleccionar");

const btnReiniciar = document.getElementById("btnReiniciar");

const sectionSeleccionarMascota = document.getElementById("mascota");
const mas_jugador = document.getElementById("mas_jugador");

const mas_Enemigo = document.getElementById("mas_enemigo");

const vidas_jugador = document.getElementById("vidas_jugador");
const vidas_enemigo = document.getElementById("vidas_enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataquesDelJugador");
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let mokepones = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let a; //= document.getElementById("Tobias");
let b; //= document.getElementById("Marlito");
let c; //= document.getElementById("Cuchurrumi");
let masJugador;
let mascotaJugadorObjeto;
let ataquesMokepon;
let ataquesMokeponE;
let btnFuego;
let btnAgua;
let btnTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let ataqueJugador = [];
let resultado;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();

mapaBackground.src = "./img/mokemap.png";
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 480;

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = (anchoDelMapa * 600) / 800;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let Tobias = new Mokepon("Tobias", "./img/Tobias.png", 5, "../img/tobiascara.png");
let Marlito = new Mokepon("Marlito", "./img/Marlito.png", 5, "../img/marlitocara.png");
let Cuchurrumi = new Mokepon("Cuchurrumi", "./img/Cuy.png", 5, "../img/CuyCara.png");
let TobiasEnemigo = new Mokepon("Tobias", "./img/Tobias.png", 5, "../img/tobiascara.png");
let MarlitoEnemigo = new Mokepon("Marlito", "./img/Marlito.png", 5, "../img/marlitocara.png");
let CuchurrumiEnemigo = new Mokepon("Cuchurrumi", "./img/Cuy.png", 5, "../img/CuyCara.png");

Tobias.ataques.push(
  { nombre: "💧", id: "btnAgua" },
  { nombre: "💧", id: "btnAgua" },
  { nombre: "💧", id: "btnAgua" },
  { nombre: "🔥", id: "btnFuego" },
  { nombre: "🌱", id: "btnTierra" }
);

TobiasEnemigo.ataques.push(
  { nombre: "💧", id: "btnAgua" },
  { nombre: "💧", id: "btnAgua" },
  { nombre: "💧", id: "btnAgua" },
  { nombre: "🔥", id: "btnFuego" },
  { nombre: "🌱", id: "btnTierra" }
);

Marlito.ataques.push(
  { nombre: "🌱", id: "btnTierra" },
  { nombre: "🌱", id: "btnTierra" },
  { nombre: "🌱", id: "btnTierra" },
  { nombre: "💧", id: "btnAgua" },
  { nombre: "🔥", id: "btnFuego" }
);

MarlitoEnemigo.ataques.push(
  { nombre: "🌱", id: "btnTierra" },
  { nombre: "🌱", id: "btnTierra" },
  { nombre: "🌱", id: "btnTierra" },
  { nombre: "💧", id: "btnAgua" },
  { nombre: "🔥", id: "btnFuego" }
);

Cuchurrumi.ataques.push(
  { nombre: "🔥", id: "btnFuego" },
  { nombre: "🔥", id: "btnFuego" },
  { nombre: "🔥", id: "btnFuego" },
  { nombre: "🌱", id: "btnTierra" },
  { nombre: "💧", id: "btnAgua" }
);

CuchurrumiEnemigo.ataques.push(
  { nombre: "🔥", id: "btnFuego" },
  { nombre: "🔥", id: "btnFuego" },
  { nombre: "🔥", id: "btnFuego" },
  { nombre: "🌱", id: "btnTierra" },
  { nombre: "💧", id: "btnAgua" }
);

mokepones.push(Tobias, Marlito, Cuchurrumi);

// INICIO DEL JUEGO

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";
  // ForEach este metodo nos ayuda a irerar o a recorrer cada uno de nuestros objetos
  mokepones.forEach((mokepon) => {
    // hay que generar una estructura que se le llama templates literarios para ello se requiere la comilla invertida
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre} />
      <p>${mokepon.nombre}</p>
      <img src=${mokepon.foto} alt=${mokepon.nombre}/>
    </label>`;

    contenedorTarjetas.innerHTML += opcionDeMokepones;

    a = document.getElementById("Tobias");
    b = document.getElementById("Marlito");
    c = document.getElementById("Cuchurrumi");
  });

  btnMascotaJ.addEventListener("click", mascotaJugador);

  btnReiniciar.addEventListener("click", reiniciarJuego);
}

// ELECCION DE LA MASCOTA

function mascotaJugador() {
  sectionSeleccionarMascota.style.display = "none";
  //sectionSeleccionarAtaque.style.display = "flex";

  if (a.checked) {
    mas_jugador.innerHTML = a.id;
    masJugador = a.id;
  } else if (b.checked) {
    mas_jugador.innerHTML = b.id;
    masJugador = b.id;
  } else if (c.checked) {
    mas_jugador.innerHTML = c.id;
    masJugador = c.id;
  } else {
    alert("Selecciona una mascota ");
  }

  extraerAtaques(masJugador);
  sectionVerMapa.style.display = "flex";
  iniciarMapa();
}

function extraerAtaques(masJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (masJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `<button id=${ataque.id} class="btnAtaque BAtaque"> ${ataque.nombre}</button>`;

    contenedorAtaques.innerHTML += ataquesMokepon;
  });
  btnFuego = document.getElementById("btnFuego");
  btnAgua = document.getElementById("btnAgua");
  btnTierra = document.getElementById("btnTierra");

  botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === " 🔥") {
        ataqueJugador.push("FUEGO");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === " 💧") {
        ataqueJugador.push("AGUA");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("TIERRA");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      ataqueAleatorioE();
    });
  });
}

// ELECCION DE LA MASCOTA DEL ENEMIGO

function mascotaEnemigo(enemigo) {
  //let mascotaAleatoria = aleatorio(0, mokepones.length - 1);
  // mas_Enemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
  //ataquesMokeponE = mokepones[mascotaAleatoria].ataques;
  mas_Enemigo.innerHTML = enemigo.nombre;
  ataquesMokeponE = enemigo.ataques;

  secuenciaAtaque();
}

function ataqueAleatorioE() {
  console.log("ataque enemigo".ataquesMokeponE);
  let ataqueAleatorio = aleatorio(0, ataquesMokeponE.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("TIERRA");
  }
  console.log(ataqueEnemigo);
  iniciarPelea();
}
// INICIO DEL CONVATE

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    respuesta();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function respuesta() {
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje("EMPATE");
    } else if (
      (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA") ||
      (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") ||
      (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA")
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("¡GANASTE!");
      victoriasJugador++;
      vidas_jugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      vidas_enemigo.innerHTML = victoriasEnemigo;
    }
  }
  ConteoVidas();
}

function ConteoVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("ESTO FUE UN EMPATE!!");
  } else if (vidasJugador > victoriasEnemigo) {
    crearMensajeFinal("FELICITACIONES GANASTE 🎉🎊");
  } else {
    crearMensajeFinal("LO SIENTO PERDISTE 😥");
  }
}
// MENSAJES PARA EL JUGADOR

function crearMensaje(resultado) {
  //let notificacion = document.createElement("p");
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  //let parrafo = document.createElement("p");
  sectionMensajes.innerHTML = resultadoFinal;

  // FINALMENTE REQUIERO DESHABILITAR LOS BOTONES CUANDO YA EL JUEGO TERMINE POR LO QUE USO EL COMANDO DISABLED
}
// REINICIAR JUEGO
function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  mascotaJugadorObjeto.pintarMokepon();
  TobiasEnemigo.pintarMokepon();
  MarlitoEnemigo.pintarMokepon();
  CuchurrumiEnemigo.pintarMokepon();
  if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto !== 0) {
    revisarColision(TobiasEnemigo);
    revisarColision(MarlitoEnemigo);
    revisarColision(CuchurrumiEnemigo);
  }
}
function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
}
function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
}
function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowRight":
      moverDerecha();
      break;
    default:
      break;
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
  intervalo = setInterval(pintarCanvas, 50);

  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (masJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;
  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  detenerMovimiento();
  clearInterval(intervalo);
  console.log("se detecto una colision");
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
  mascotaEnemigo(enemigo);
  //alert("Hay colision con " + enemigo.nombre);
}

//Esta linea es la que inicia el juego
window.addEventListener("load", iniciarJuego);
