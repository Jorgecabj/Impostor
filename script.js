let jugadores = [];
let impostorIndex;
let categoriaActual;
let palabraActual;
let jugadorActual;
let tiempo = 0;
let intervalo;

const categorias = {
  Animales: [
    "Perro","Gato","León","Tigre","Elefante","Jirafa","Lobo","Zorro",
    "Oso","Caballo","Mono","Cocodrilo","Delfín","Tiburón","Águila"
  ],

  Comidas: [
    "Pizza","Hamburguesa","Asado","Empanada","Sushi","Milanesa",
    "Fideos","Ravioles","Tacos","Burrito","Paella","Ceviche"
  ],

  Países: [
    "Argentina","Brasil","España","México","Japón","Italia",
    "Francia","Alemania","Canadá","Chile","Perú","Colombia"
  ],

  Ciudades: [
    "Buenos Aires","Madrid","París","Roma","Tokio","Nueva York",
    "Barcelona","Londres","Berlín","Río de Janeiro","Lima"
  ],

  Objetos: [
    "Celular","Reloj","Televisor","Auriculares","Mochila","Libro",
    "Llaves","Botella","Silla","Mesa","Lámpara"
  ],

  Lugares: [
    "Playa","Bosque","Montaña","Desierto","Ciudad","Aeropuerto",
    "Estadio","Parque","Shopping","Cine","Museo"
  ],

  Profesiones: [
    "Doctor","Abogado","Profesor","Ingeniero","Arquitecto",
    "Programador","Diseñador","Cocinero","Mecánico","Piloto"
  ],

  Películas: [
    "Titanic","Avatar","Gladiador","Matrix","Inception",
    "Rocky","Interestelar","Joker","Batman","Star Wars"
  ],

  Series: [
    "Breaking Bad","Friends","Game of Thrones","Dark","The Office",
    "La Casa de Papel","Stranger Things","The Boys"
  ],

  Deportes: [
    "Fútbol","Basket","Tenis","Rugby","Vóley","Natación",
    "Ciclismo","Boxeo","Golf"
  ],

  Superhéroes: [
    "Batman","Superman","Spiderman","Iron Man","Thor",
    "Hulk","Capitán América","Flash","Wolverine"
  ],

  Videojuegos: [
    "Minecraft","GTA","FIFA","Fortnite","Among Us",
    "Call of Duty","Zelda","Mario Bros","Pokemon"
  ],
  
  Equipos_de_Fútbol: [
    "Boca Juniors","River Plate","Racing","Independiente","San Lorenzo",
    "Barcelona","Real Madrid","Manchester United","Manchester City",
    "Liverpool","Chelsea","Arsenal",
    "Juventus","Milan","Inter",
    "PSG","Bayern Munich","Borussia Dortmund"
  ]
};


const pistas = [
  "Común",
  "Popular",
  "Conocido",
  "Cotidiano",
  "General",
  "Famoso",
  "Normal",
  "Habitual",
  "Clásico",
  "Frecuente",
  "Reconocible",
  "Típico",
  "Actual",
  "Viejo",
  "Moderno",
  "Universal",
  "Simple",
  "Complejo",
  "Único",
  "Genérico"
];


function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla")
    .forEach(p => p.classList.add("oculto"));
  document.getElementById(id).classList.remove("oculto");
}

/* JUGADORES */
function agregarJugador() {
  const input = document.getElementById("nombre");
  if (!input.value.trim()) return;

  jugadores.push({ nombre: input.value, visto: false });
  input.value = "";
  renderJugadores();
}

function renderJugadores() {
  const grid = document.getElementById("gridJugadores");
  grid.innerHTML = "";

  jugadores.forEach((j, i) => {
    const card = document.createElement("div");
    card.className = "cardJugador" + (j.visto ? " confirmado" : "");
    card.textContent = j.nombre;
    card.onclick = () => abrirJugador(i);
    grid.appendChild(card);
  });
}

/* JUEGO */
function prepararJuego() {
  if (jugadores.length < 3) {
    alert("Mínimo 3 jugadores");
    return;
  }

  const keys = Object.keys(categorias);
  categoriaActual = keys[Math.floor(Math.random() * keys.length)];
  palabraActual =
    categorias[categoriaActual][
      Math.floor(Math.random() * categorias[categoriaActual].length)
    ];

  impostorIndex = Math.floor(Math.random() * jugadores.length);

  document.getElementById("bloqueAgregar").style.display = "none";
}

function abrirJugador(index) {
  jugadorActual = index;
  mostrarPantalla("pantallaRol");

  document.getElementById("nombreJugador").textContent =
    jugadores[index].nombre;

  if (index === impostorIndex) {
    const pista = pistas[Math.floor(Math.random() * pistas.length)];
    document.getElementById("textoRol").textContent =
      `😈 SOS EL IMPOSTOR\n\nPista: ${pista}`;
  } else {
    document.getElementById("textoRol").textContent =
      `Categoría: ${categoriaActual}\n\nPalabra: ${palabraActual}`;
  }
}

function confirmarJugador() {
  jugadores[jugadorActual].visto = true;
  renderJugadores();

  if (jugadores.every(j => j.visto)) {
    iniciarJuego();
  } else {
    mostrarPantalla("pantallaCarga");
  }
}

function iniciarJuego() {
  mostrarPantalla("pantallaJuego");

  const empieza =
    jugadores[Math.floor(Math.random() * jugadores.length)].nombre;

  document.getElementById("empieza").textContent =
    `Empieza: ${empieza}`;

  tiempo = 0;
  intervalo = setInterval(() => {
    tiempo++;
    document.getElementById("timer").textContent = tiempo;
  }, 1000);
}

function revelarImpostor() {
  clearInterval(intervalo);
  alert(`😈 El impostor era: ${jugadores[impostorIndex].nombre}`);
  document.getElementById("opcionesFinal").classList.remove("oculto");
}

function volverAJugar() {
  jugadores.forEach(j => j.visto = false);
  document.getElementById("opcionesFinal").classList.add("oculto");
  prepararJuego();
  renderJugadores();
  mostrarPantalla("pantallaCarga");
}

function reiniciarTodo() {
  location.reload();
}