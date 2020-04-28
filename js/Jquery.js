
const API_URL = 'https://rickandmortyapi.com/api/'
const PEOPLE_URL = 'character/:id'
const opts = {crossDomain: true}

// url primer parametro metodo get, 
// opts segundo indicar que es un request externo con objeto
// const lukeUrl = `${API_URL}${PEOPLE_URL.replace(':id',1)}`
// const opts = {crossDomain: true}

// Metodo $get permite hacer request con parametros, 
// y CallBack es funct que se ejecuta en futuro y $get la fn
// arguments es var que tiene todas las funciones con un array con los parametros que recibe la funcion



function obtenerPersonaje(id) {

    return new Promise((resolve, reject) => {
        const url=`${API_URL}${PEOPLE_URL.replace(':id',id)}`
 
        $
            .get( url, opts, function (data){
                resolve(data)
            })
            .fail(() => reject(id))

    })

}

function onError(id) {
    console.log(`error personaje... ${id}`)
}

async function obtenerPersonajes(){
    
    var ids = [1,2,3,4,5,6,7]
    // var promesas = ids.map(function(id){
    //     return obtenerPersonaje(id)
    // })

    var promesas = ids.map(id => obtenerPersonaje(id))
    try {
        var personajes = await Promise.all(promesas)
        console.log(personajes)
    } catch (id){
        onError(id)
    }

  

}


obtenerPersonajes()


// obtenerPersonaje(2)
//     .then(personaje2 => {
//         console.log(`Hola soy 2 ${personaje2.name}`)
//         return obtenerPersonaje(3)
//     })
//     .then (personaje3 =>{
//         console.log(`Hola soy 3 ${personaje3.name}`)
//         return obtenerPersonaje(4)
//     })
//     .then (personaje4 =>{
//         console.log(`Hola soy 4 ${personaje4.name}`)
//         return obtenerPersonaje(5)
//     })
//     .then (personaje5 =>{
//         console.log(`Hola soy 5 ${personaje5.name}`)
//     })
//     .catch(onError)

// obtenerPersonaje(1, function (personaje) {
//     console.log(`Hola soy ${personaje.name}`)
// })


