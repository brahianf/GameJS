const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego{

  constructor() {
    this.inicializar()
    this.generarSecuencia()
    this.siguienteNivel()
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this)
    btnEmpezar.classList.add('hide')
    this.nivel=1
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  generarSecuencia(){
    this.secuencia= new Array(10).fill(0).map(n => Math.floor(Math.random() *4))
  }

  siguienteNivel(){
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

  elegirColor(ev){
    console.log(this)
  }
}


function empezarJuego() {
  window.juego = new Juego()
}