Capitizalicion de palabras

//1- separa por espacios en array de palabras
//2- Recorro cada LETRA de cada palabra y la condicion y la retorno
get historialCapitalizado (){
    return this.historial.map(x=>{

        let palabras =  x.split(' ');
        palabras =  palabras.map( y => y[0].toUpperCase() + y.substring(1) );
        return palabras.join(' ');
    })
}