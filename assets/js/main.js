//Inicializar red neuronal
let network = new brain.NeuralNetwork();

//Entrenarla, darle ejemplos de cuando poner
//texto blanco, o texto negro segun el fondo
network.train([
    //Fondo negro (entrada en 0s) = texto blanco (salida = 1)
    {input: {rojo: 0, verde: 0, azul: 0}, output: {color: 1}},
    //Fondo blanco (entrada en 1s) = texto negro (salida = 0)
    {input: {rojo: 1, verde: 1, azul: 1}, output: {color: 0}},
    //Fondo verde, texto negro
    {input: {rojo: 0, verde: 1, azul: 0}, output: {color: 0}},
    //Fondo azul, texto blanco
    {input: {rojo: 0, verde: .43, azul: 1}, output: {color: 1}},
    //Fondo rojo, texto blanco
    {input: {rojo: 1, verde: 0, azul: 0}, output: {color: 1}},
]);

function update(color) {
    //Cuando hice el video, existia color.rgb
    //Ahora existe color.channels y dentro tiene varios componentes.
    //Aqui hacemos el objeto "rgb" para que sea similar al video
    let rgb = [color.channels.r, color.channels.g, color.channels.b];
    //console.log(rgb);

    let div = document.getElementById("color-text");
    div.style.background = color.toHEXString(); //Nueva forma para poner el color de fondo

    //Tomar el fondo actual elegido por el usuario,
    //para usarlo de entrada para que la red nos de su
    //prediccion del mejor color de texto a utilizar
    let entrada = {
        rojo: rgb[0]/255,
        verde: rgb[1]/255,
        azul: rgb[2]/255,
    };

    //Obtener la prediccion de la red
    let resultado = network.run(entrada);
    //console.log(resultado);

    //Si resultado > .5, se considera color de texto blanco
    if (resultado.color > .5) {
        div.style.color = "white";
    }  else {
        div.style.color = "black";
    }
}