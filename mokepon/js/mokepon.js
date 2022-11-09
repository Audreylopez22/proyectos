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

let mokepones = [];
let ataqueEnemigo;
let opcionDeMokepones;
let a; //= document.getElementById("Tobias");
let b; //= document.getElementById("Marlito");
let c; //= document.getElementById("Cuchurrumi");
let masJugador;
let ataquesMokepon;
let btnFuego;
let btnAgua;
let btnTierra;
let botones = [];
let ataqueJugador = [];
let resultado;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let Tobias = new Mokepon("Tobias", "./img/Tobias.png", 5);
let Marlito = new Mokepon("Marlito", "./img/Marlito.png", 5);
let Cuchurrumi = new Mokepon("Cuchurrumi", "./img/Cuy.png", 5);

Tobias.ataques.push(
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

Cuchurrumi.ataques.push(
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
  sectionSeleccionarAtaque.style.display = "flex";

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

  mascotaEnemigo();
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
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("FUEGO");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
      } else if (e.target.textContent === "💧") {
        ataqueJugador.push("AGUA");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
      } else {
        ataqueJugador.push("TIERRA");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
      }
    });
  });
}

// ELECCION DE LA MASCOTA DEL ENEMIGO

function mascotaEnemigo() {
  let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

  mas_Enemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
  secuenciaAtaque();
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
  //let notificacion = document.createElement("p");
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  //let parrafo = document.createElement("p");
  sectionMensajes.innerHTML = resultadoFinal;

  // FINALMENTE REQUIERO DESHABILITAR LOS BOTONES CUANDO YA EL JUEGO TERMINE POR LO QUE USO EL COMANDO DISABLED

  btnFuego.disabled = true;
  btnAgua.disabled = true;
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
