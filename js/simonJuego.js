const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 1

class Juego{

  constructor() {
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel(), 500)
    
  }

  inicializar() {
    // this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel=1
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggleBtnEmpezar(){
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    } else {
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia(){
    this.secuencia= new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() *4))
  }

  siguienteNivel(){
    this.subnivel=0
    this.iluminarSecuecia()
    this.agregarEventosClick()
  }

  transformarNumeroAcolor(numero){
    switch(numero){
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  transformarColoraNumero(color){
    switch(color){
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarSecuecia(){
    for(let i=0; i < this.nivel; i++){
      const color=this.transformarNumeroAcolor(i)
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout( () => this.apagarColor(color), 400)
  }

  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  // JavaScript le agrega evento clic a  los colores
  // le dice al navegador que funcion ejecutar asincronamente 
  // cuando  se realize evento click 
  // navegador le avisa a JS que ejecute la funcion 
  // cuando Js termine todas sus tareas la  va a ajecutar

  agregarEventosClick(){
    // var self = this  
    // para que javaScrip no pierda el contexto con el Listener, 
    // en este caso el this, esta referenciado al evento click
    // Luego del evento el this pasa a ser el elemento html <div>
    // y no  Juego {nivel: 1, colores: {…}, secuencia: Array(10)}
    // this.colores.celeste.addEventListener('click', this.elegirColor.bind(self))
    // o se amarra con .bind al this del juego 

    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev){
    // En las etiquetas div de cada color se agrego el atributo data-color="celeste"
    // el cual se incluye en el dataSet del target
    const nombreColor= ev.target.dataset.color
    const numeroColor =  this.transformarColoraNumero(nombreColor)
    this.iluminarColor(nombreColor)
    if (numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++
      if (this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL + 1)){
          // Win
          this.ganoJuego()
        } else {
          // Js con setTimeout encarga al Navegador de llamar ejecutar funcion y ahora el this es window
          // Se amarra el this del juego al contexto de nuevo
          setTimeout(this.siguienteNivel.bind(this),1500)
        }
      }
    } else {
      // Losser
      this.perdioJuego()
    }
  }

  ganoJuego(){
    swal('Simon Dice que', 'Ganaste el Juego', 'succes')
    .then(this.inicializar.bind(this))
  }

  perdioJuego(){
    swal('Simon Dice que', 'Losserrrr', 'error')
    .then(() => {
      this.eliminarEventosClick()
      this.inicializar()
    })
  }
}


function empezarJuego() {
  window.juego = new Juego()
}